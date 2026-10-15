#pragma once
#include <stdint.h>

/**
 * @file lora_packet.h
 * @brief Exact 16-byte packed binary packet frame for VanRakshak LoRa nodes.
 * @note Must strictly match the web application's packet-codec.ts layout.
 */

#pragma pack(push, 1)
struct VanRakshakPacket {
    uint8_t  magic[2];       // Bytes 0-1: 0x56, 0x52 ('V', 'R')
    uint16_t node_id;        // Bytes 2-3: Node ID (Big-Endian uint16)
    uint8_t  packet_type;    // Byte 4: 0x01=Alert, 0x02=Heartbeat, 0x03=Battery Critical
    uint8_t  threat_class;   // Byte 5: 0x01=Chainsaw, 0x02=Tractor, 0x03=Axe, 0x04=Gunshot, 0x05=Anomaly
    uint8_t  confidence;     // Byte 6: Model Softmax Probability (0 to 100%)
    uint8_t  sound_level_db; // Byte 7: Sound Pressure Level (0 to 120 dB SPL)
    uint16_t battery_mv;     // Bytes 8-9: LiFePO4 Voltage in mV (e.g. 3320 mV)
    uint8_t  solar_status;   // Byte 10: Bitfield (Bit 0: Solar Charging, Bit 1: Battery OK)
    uint32_t seq_number;     // Bytes 11-14: Rolling incremental sequence counter
    uint8_t  crc8;           // Byte 15: CRC-8 Checksum (Dallas/Maxim 0x31 polynomial)
};
#pragma pack(pop)

// Ensure compile-time assertion that struct is exactly 16 bytes
#if defined(__cplusplus)
static_assert(sizeof(VanRakshakPacket) == 16, "VanRakshakPacket struct must be exactly 16 bytes!");
#endif

// Fast CRC-8 Calculation with 0x31 polynomial
static inline uint8_t calculate_crc8(const uint8_t *data, uint8_t length) {
    uint8_t crc = 0x00;
    for (uint8_t i = 0; i < length; i++) {
        crc ^= data[i];
        for (uint8_t j = 0; j < 8; j++) {
            if (crc & 0x80) {
                crc = (crc << 1) ^ 0x31;
            } else {
                crc <<= 1;
            }
        }
    }
    return crc;
}
