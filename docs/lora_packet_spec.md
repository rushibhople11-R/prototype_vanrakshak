# VanRakshak 16-Byte Compact Binary LoRa Packet Specification

**Document Version:** 1.0.0  
**Target Architecture:** Sub-GHz LPWAN (SX1262 / SX1276)  
**Standard Frequency:** 865.200 MHz (India ISM Band, SF9, BW 125 kHz, CR 4/5)

---

## 1. Frame Structure Overview

```
+------------+------------+-----------+--------------+------------+------------+---------------+--------------+----------------+------------+
| Byte 0 - 1 | Byte 2 - 3 |  Byte 4   |    Byte 5    |   Byte 6   |   Byte 7   |  Byte 8 - 9   |   Byte 10    |  Byte 11 - 14  |  Byte 15   |
|   Header   |  Node ID   | Pkt Type  | Threat Class | Confidence | Sound dB   | Batt Voltage  | Solar Status | Seq / Time Rel |   CRC-8    |
| (0x56 0x52)|  (uint16)  | (uint8)   |   (uint8)    |  (0-100)   | (0-120 dB) | (uint16 in mV)|  (Bitfield)  |    (uint32)    | (Checksum) |
+------------+------------+-----------+--------------+------------+------------+---------------+--------------+----------------+------------+
```

Total packet size: **16 Bytes (128 bits)**.  
At Spreading Factor SF9 and 125 kHz bandwidth, the physical time-on-air is only **52 milliseconds**, ensuring multi-year node autonomy.

---

## 2. Field Specifications

### Bytes 0–1: Synchronization Header (`magic`)
- **Byte 0:** `0x56` (ASCII `'V'`)
- **Byte 1:** `0x52` (ASCII `'R'`)
- Used by receiver to reject ambient RF interference and unsynchronized packets.

### Bytes 2–3: Node Identifier (`node_id`)
- `uint16_t` formatted in **Network Byte Order (Big-Endian)**.
- Range: `1` to `65,535`.
- Example: Node 2 is encoded as `0x00 0x02`.

### Byte 4: Packet Type (`packet_type`)
- `0x01`: **ALERT** — On-device TinyML acoustic trigger condition met.
- `0x02`: **HEARTBEAT** — Periodic health beacon with battery and RF metrics.
- `0x03`: **POWER_CRITICAL** — Battery voltage dropped below 3.10V cutoff.

### Byte 5: Threat Classification (`threat_class`)
- `0x01`: `CHAINSAW` (Mechanical 2-stroke whine 2.2 kHz - 2.8 kHz)
- `0x02`: `HEAVY_VEHICLE` (Diesel tractor/truck low rumble 80 Hz - 350 Hz)
- `0x03`: `AXE` (Acoustic impact shock transient 1.2 kHz - 1.8 kHz)
- `0x04`: `GUNSHOT` (High-amplitude impulse &gt;110 dB SPL)
- `0x05`: `ANOMALY` (Unclassified ambient anomaly)

### Byte 6: Model Confidence (`confidence`)
- Value range: `0` to `100` representing 0% to 100% softmax probability output.
- Default trigger threshold configured in edge firmware: **&ge; 82**.

### Byte 7: Sound Pressure Level (`sound_level_db`)
- Estimated dB SPL at edge microphone: `0` to `120` dB SPL.

### Bytes 8–9: Battery Voltage (`battery_mv`)
- `uint16_t` in millivolts (Big-Endian).
- Example: 3.32V LiFePO4 cell is encoded as `3320` mV &rarr; `0x0C 0xF8`.

### Byte 10: Solar & Power Bitfield (`solar_status`)
- **Bit 0:** Solar Harvesting State (`1` = Charging, `0` = Discharging)
- **Bit 1:** Battery Health State (`1` = Nominal, `0` = Depleted)
- **Bit 2:** Canopy Thermal Flag (`1` = Temperature &gt;55°C, `0` = Normal)
- **Bits 3–7:** Reserved for future sensor expansions.

### Bytes 11–14: Sequence Counter (`seq_number`)
- `uint32_t` (Big-Endian) rolling packet counter incremented by node RTC.

### Byte 15: CRC-8 Checksum (`crc8`)
- **Polynomial:** `0x31` ($x^8 + x^5 + x^4 + 1$, standard Dallas/Maxim 1-Wire).
- Calculated over Bytes 0 through 14.

---

## 3. Reference Test Vector

| Parameter | Value |
|---|---|
| Target Node | Node 2 (`0x0002`) |
| Packet Type | Alert (`0x01`) |
| Threat Type | Chainsaw (`0x01`) |
| Confidence | 94% (`0x5E`) |
| Sound Level | 88 dB SPL (`0x58`) |
| Battery | 3,300 mV (`0x0CE4`) |
| Solar State | Charging (`0x01`) |
| Sequence | 79 (`0x0000004F`) |
| **Complete Hex** | **`5652000201015e580ce4010000004f2c`** |
| Verified CRC-8 | `0x2C` |
