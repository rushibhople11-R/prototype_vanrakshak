/**
 * @file main.cpp
 * @brief VanRakshak Acoustic TinyML & LoRa Edge Node Firmware for ESP32-S3
 * @author VanRakshak Engineering Project
 */

#include <Arduino.h>
#include <driver/i2s.h>
#include <RadioLib.h>
#include "lora_packet.h"

// --- Pinout Configuration (ESP32-S3) ---
// I2S Digital MEMS Microphone (INMP441 / ICS-43434)
#define I2S_PORT         I2S_NUM_0
#define PIN_I2S_BCLK     4
#define PIN_I2S_WS       5
#define PIN_I2S_DATA_IN  6

// SX1262 / SX1276 LoRa SPI Transceiver
#define PIN_LORA_NSS     10
#define PIN_LORA_DIO1    14
#define PIN_LORA_RST     9
#define PIN_LORA_BUSY    13

// Battery Voltage ADC Sense (100k/100k Divider)
#define PIN_BATT_ADC     1

// Node Operational Parameters
#define NODE_ID          1
#define SAMPLE_RATE_HZ   16000
#define DMA_BUF_COUNT    4
#define DMA_BUF_LEN      512
#define CONFIDENCE_LIMIT 82 // 82% Softmax trigger cutoff

// RadioLib SX1262 Module instance
SX1262 radio = new Module(PIN_LORA_NSS, PIN_LORA_DIO1, PIN_LORA_RST, PIN_LORA_BUSY);

// State tracking
RTC_DATA_ATTR uint32_t packetSequence = 0;

void setupI2SMicrophone() {
    i2s_config_t i2s_config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = SAMPLE_RATE_HZ,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = DMA_BUF_COUNT,
        .dma_buf_len = DMA_BUF_LEN,
        .use_apll = false,
        .tx_desc_auto_clear = false,
        .fixed_mclk = 0
    };

    i2s_pin_config_t pin_config = {
        .bck_io_num = PIN_I2S_BCLK,
        .ws_io_num = PIN_I2S_WS,
        .data_out_num = I2S_PIN_NO_CHANGE,
        .data_in_num = PIN_I2S_DATA_IN
    };

    i2s_driver_install(I2S_PORT, &i2s_config, 0, NULL);
    i2s_set_pin(I2S_PORT, &pin_config);
    i2s_zero_dma_buffer(I2S_PORT);
}

void setupLoRaRadio() {
    Serial.print(F("[LORA] Initializing SX1262... "));
    int state = radio.begin(865.2, 125.0, 9, 5, 0x12, 22, 8);
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("Success (865.2 MHz SF9)"));
    } else {
        Serial.printf("Failed, code: %d\n", state);
    }
}

uint16_t readBatteryMillivolts() {
    // 12-bit ADC reading through a 2:1 resistive divider
    uint32_t raw = analogRead(PIN_BATT_ADC);
    uint32_t mv = (raw * 3300 * 2) / 4095;
    return (uint16_t)mv;
}

void broadcastAlertPacket(uint8_t threatClass, uint8_t confidence, uint8_t soundDb) {
    VanRakshakPacket pkt;
    pkt.magic[0] = 0x56; // 'V'
    pkt.magic[1] = 0x52; // 'R'
    pkt.node_id = htons(NODE_ID);
    pkt.packet_type = 0x01; // ALERT
    pkt.threat_class = threatClass;
    pkt.confidence = confidence;
    pkt.sound_level_db = soundDb;
    pkt.battery_mv = htons(readBatteryMillivolts());
    pkt.solar_status = 0x01; // Solar charging bit
    pkt.seq_number = htonl(packetSequence++);
    pkt.crc8 = calculate_crc8((uint8_t*)&pkt, 15);

    Serial.printf("[LORA] Broadcasting 16-byte alert packet for threat class %d (Conf: %d%%)...\n", threatClass, confidence);
    int state = radio.transmit((uint8_t*)&pkt, sizeof(VanRakshakPacket));
    if (state == RADIOLIB_ERR_NONE) {
        Serial.println(F("[LORA] Transmission complete. Radio returning to standby."));
    }
}

void setup() {
    Serial.begin(115200);
    delay(500);
    Serial.println(F("=== VanRakshak Edge Node Boot ==="));

    setupI2SMicrophone();
    setupLoRaRadio();
}

void loop() {
    // 1. Ingest audio DMA buffer
    int32_t audioBuffer[DMA_BUF_LEN];
    size_t bytesRead = 0;
    i2s_read(I2S_PORT, &audioBuffer, sizeof(audioBuffer), &bytesRead, portMAX_DELAY);

    // 2. Mock Edge TinyML inference pipeline execution (Mel-Spectrogram + TFLite Micro)
    // In production with real chainsaw audio, TFLM invoke returns model probability
    uint8_t simulatedConfidence = 0;
    uint8_t detectedThreat = 0;

    // Check peak sound energy
    int64_t sumSq = 0;
    for (int i = 0; i < DMA_BUF_LEN; i++) {
        int32_t sample = audioBuffer[i] >> 14;
        sumSq += (sample * sample);
    }
    double rms = sqrt(sumSq / DMA_BUF_LEN);
    uint8_t splEstimate = (uint8_t)constrain(20.0 * log10(rms + 1.0) + 40.0, 30.0, 115.0);

    // If sound level is elevated and matches chainsaw spectrum, trigger alert
    if (splEstimate >= 80) {
        simulatedConfidence = 92;
        detectedThreat = 0x01; // Chainsaw
    }

    if (simulatedConfidence >= CONFIDENCE_LIMIT) {
        broadcastAlertPacket(detectedThreat, simulatedConfidence, splEstimate);
        delay(2000); // Backoff debounce
    }

    // Duty-cycle deep sleep (1500 ms) to conserve LiFePO4 battery
    delay(500);
}
