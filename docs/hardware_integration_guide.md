# VanRakshak Hardware Integration & Deployment Manual

This guide describes how to connect, flash, and test the physical VanRakshak acoustic edge node and gateway concentrator.

---

## 1. Edge Node Bill of Materials (BOM)

| Component | Part / Model | Purpose | Estimated Cost (INR) |
|---|---|---|---|
| Microcontroller | **ESP32-S3-WROOM-1 / DevKitC-1** | Dual-core 240MHz, 8MB PSRAM, Vector SIMD | ₹550 |
| Acoustic Sensor | **INMP441 MEMS Microphone** | Omnidirectional digital I2S, 24-bit PCM, SNR 61dB | ₹180 |
| LoRa Transceiver | **Semtech SX1262 / E22-900T22S** | Sub-GHz 865-867 MHz LoRa, +22 dBm PA output | ₹650 |
| Battery Storage | **32700 LiFePO4 Cell (3.2V, 6000mAh)** | Thermal safety (&gt;60°C canopy), 2500+ cycles | ₹450 |
| Solar Harvesting | **CN3791 MPPT Charge Controller** | Maximizes power from 5V/6V solar panel | ₹180 |
| Solar Panel | **5V/6V 2W Monocrystalline Panel** | Canopy diffused light harvesting | ₹320 |
| Enclosure | **IP67 Waterproof Junction Box** | Acoustic membrane vent + cable glands | ₹250 |

---

## 2. Wiring Pinout Diagram

### 2.1 ESP32-S3 to INMP441 I2S Microphone
```
INMP441 Pin       ESP32-S3 Pin     Description
--------------------------------------------------------------
VDD               3V3              3.3V Clean Regulated Power
GND               GND              Common Ground
SD (Serial Data)  GPIO 6           I2S Serial Audio Data Input
WS (Word Select)  GPIO 5           I2S Left/Right Clock (16 kHz)
SCK (Serial Clock)GPIO 4           I2S Bit Clock (BCLK)
L/R               GND              Tied to GND for Left Channel
```

### 2.2 ESP32-S3 to SX1262 LoRa Transceiver
```
SX1262 Pin        ESP32-S3 Pin     Description
--------------------------------------------------------------
VCC               3V3              3.3V Power
GND               GND              Common Ground
SCK               GPIO 12          SPI Clock
MISO              GPIO 11          SPI Master In Slave Out
MOSI              GPIO 13          SPI Master Out Slave In
NSS / CS          GPIO 10          SPI Chip Select
RST               GPIO 9           Hardware Reset
DIO1              GPIO 14          Packet TX/RX Done Interrupt
BUSY              GPIO 8           Transceiver Busy Flag
```

### 2.3 Battery Sensing (ADC Voltage Divider)
To measure the LiFePO4 cell voltage (3.0V - 3.65V) without exceeding the ESP32-S3 3.3V ADC pin rating, use two precision 100kΩ resistors in a 1:1 voltage divider:
- Connect Battery (+) &rarr; 100kΩ &rarr; **GPIO 1** &rarr; 100kΩ &rarr; GND.
- Add a 100nF ceramic capacitor across GPIO 1 and GND to filter switching noise.

---

## 3. Flashing Firmware via PlatformIO

1. Install **Visual Studio Code** and the **PlatformIO IDE extension**.
2. Open the directory `c:/Projects/prototype_vanrakshak/firmware/esp32s3_acoustic_node`.
3. Connect your ESP32-S3 via USB-C to your PC.
4. Open a terminal in the firmware folder and run:
   ```bash
   pio run --target upload
   pio device monitor
   ```
5. You should see the boot banner:
   ```
   === VanRakshak Edge Node Boot ===
   [LORA] Initializing SX1262... Success (865.2 MHz SF9)
   ```

---

## 4. Connecting the Hardware Gateway to the Web Dashboard

When an ESP32 LoRa Gateway receives a 16-byte packet over the air, it forwards it to the dashboard over USB Serial or WiFi.

### Option A: Local USB Serial Gateway Bridge (Python)
If your LoRa gateway is plugged into your PC via USB:
1. Ensure Python 3 is installed.
2. Run the provided serial bridge script:
   ```bash
   python scripts/gateway_serial_bridge.py --port COM3 --url http://localhost:3000/api/gateway/uplink
   ```

### Option B: Direct WiFi / Ethernet Gateway
In the gateway firmware, configure an HTTP client:
```cpp
HTTPClient http;
http.begin("http://192.168.1.100:3000/api/gateway/uplink");
http.addHeader("Content-Type", "application/json");
http.POST("{\"raw_payload_hex\":\"" + hexString + "\",\"rssi\":" + String(rssi) + "}");
```
The VanRakshak dashboard automatically receives the transmission, parses the 16-byte binary frame, records it in SQLite, and updates the threat map in real time.
