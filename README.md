# VanRakshak (वनरक्षक)
### Acoustic TinyML & LoRa-Based Forest Monitoring System

VanRakshak is an engineering prototype of an autonomous, cyber-physical forest intelligence network designed to detect illegal logging and chainsaw poaching in remote, canopy-dense national parks with zero cellular or electrical grid infrastructure.

---

## 🌲 Key Innovations

1. **On-Device Acoustic Edge Intelligence**: Runs a quantized INT8 2D-Convolutional Neural Network on an **ESP32-S3** microcontroller with vector SIMD acceleration (42 ms inference latency, 68 KB model size).
2. **Ultra-Low Bandwidth LoRa Telemetry**: Never streams battery-draining raw audio. Transmits only a **compact 16-byte binary alert packet** over Sub-GHz LoRa (865.2 MHz in India), achieving **52 ms airtime** and over 180 days of solar-battery autonomy.
3. **Strict Data Integrity Standards**: Clearly demarcates between live IoT hardware transmissions (`[LIVE HARDWARE]`) and calibrated benchmark demonstration data (`[SIMULATED DATA]`).
4. **Human-in-the-Loop Ranger SOP**: Provides a standard verification protocol allowing wildlife officers to review acoustic confidence, check forestry permits, and dispatch rapid patrol units.

---

## 🧭 Dashboard Modules

The platform features 11 dedicated operational modules:

| # | Module | Route | Functionality |
|---|---|---|---|
| 1 | **Overview Dashboard** | `/overview` | Situation room showing active chainsaw threats, fleet health, and diurnal solar curves. |
| 2 | **Forest Monitoring Map** | `/map` | Satellite GIS map with node pins, 350m acoustic detection radiuses, and 4km gateway RF perimeter. |
| 3 | **Threat Alerts** | `/alerts` | Full tabular ledger with filters (Chainsaw, Axe, Tractor, Gunshot) and alert inspection modal. |
| 4 | **AI Sound Detection** | `/audio-detection` | Interactive 32-band Mel Spectrogram visualizer and TinyML model benchmark workbench. |
| 5 | **Sensor Nodes** | `/nodes` | Fleet inventory, battery voltage status, and downlink parameter reconfiguration modal. |
| 6 | **LoRa Gateway** | `/gateway` | Live inbound radio packet stream and interactive 16-byte binary frame dissector. |
| 7 | **Event Verification** | `/verification` | Human-in-the-loop ranger verification desk with standard operating procedure (SOP) checklist. |
| 8 | **Biodiversity Intelligence** | `/biodiversity` | Soundscape health tracking (Acoustic Complexity Index and indicator bird call census). |
| 9 | **Solar & Battery Health** | `/solar-battery` | LiFePO4 chemistry analytics, MPPT solar harvesting curves, and 5-tier power budget breakdown. |
| 10 | **Reports & Analytics** | `/analytics` | Nocturnal threat histograms, spatial vulnerability rankings, and CSV/JSON export. |
| 11 | **System Settings** | `/settings` | Mode switcher, scenario injector (Chainsaw at Node 03), and hardware API credentials. |

---

## 🚀 Quickstart Guide

### 1. Installation & Local Execution
```bash
# Clone and enter workspace
cd prototype_vanrakshak

# Install dependencies
npm install

# Build production bundle
npm run build

# Start local server on port 3005 (or default 3000)
npx next start -p 3005
```
Open **[http://localhost:3005](http://localhost:3005)** in your browser.

---

## 📡 Hardware Gateway Integration

To connect real ESP32 / LoRa gateway hardware:

### Endpoint:
```
POST /api/gateway/uplink
Content-Type: application/json
```

### JSON Ingest Payload:
```json
{
  "raw_payload_hex": "5652000201015e580ce4010000004f2c",
  "gateway_id": "GW-SATPURA-01",
  "rssi": -104,
  "snr": 7.2,
  "frequency_mhz": 865.2,
  "is_simulated": false
}
```

### USB Serial Bridge:
If your LoRa gateway receiver is connected via USB:
```bash
python scripts/gateway_serial_bridge.py --port COM3 --url http://localhost:3005/api/gateway/uplink
```

---

## 📁 Repository Structure

```
prototype_vanrakshak/
├── src/
│   ├── app/                 # Next.js App Router (11 pages + REST route handlers)
│   ├── components/          # Reusable UI components, GIS map, and Recharts charts
│   ├── lib/
│   │   ├── db/              # SQLite database client & schema DDL
│   │   ├── lora/            # 16-byte binary packet encoder/decoder & CRC-8
│   │   └── demo-data.ts     # Initial calibrated baseline datasets
│   └── types/               # Strict TypeScript definitions
├── firmware/
│   └── esp32s3_acoustic_node/ # PlatformIO C++ firmware for ESP32-S3 + INMP441 + SX1262
├── docs/
│   ├── hardware_integration_guide.md # Pinout schematics, BOM, and wiring
│   ├── lora_packet_spec.md           # 16-byte binary packet specification
│   └── demonstration_guide.md        # Student presentation script & defense Q&A
└── scripts/
    └── gateway_serial_bridge.py      # USB Serial to HTTP gateway forwarder
```
