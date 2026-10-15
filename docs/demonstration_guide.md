# VanRakshak Project Demonstration & Defense Guide
**Student Presentation Script & Step-by-Step Defense Walkthrough**

---

## 1. Executive Summary (The 60-Second Pitch)

> *"Good morning, esteemed committee members. Today I am presenting **VanRakshak**, an acoustic TinyML and Sub-GHz LoRa-based cyber-physical forest monitoring system.*
>
> *Forest reserves face severe threats from illegal timber poaching and chainsaws. However, remote forests lack electrical grids and cellular coverage. Streaming raw audio over cellular or satellite requires massive bandwidth and drains batteries within days.*
>
> *VanRakshak solves this by performing AI inference directly at the forest canopy on an ultra-low-power ESP32-S3 microcontroller. The node listens continuously, extracts 32-band Mel frequency spectrograms, and evaluates an on-chip INT8 quantized neural network. Instead of streaming audio, it broadcasts only a **compact 16-byte binary alert packet over LoRa** when a chainsaw is detected.*
>
> *At the ranger outpost, our centralized dashboard maps the threat in real time, provides acoustic spectral confirmation, and guides rangers through a structured verification workflow to dispatch rapid response teams."*

---

## 2. Live Demonstration Flow (6 Steps)

### Step 1: The Situation Room (`/overview`)
- **Action:** Open the Overview Dashboard.
- **Points to highlight:**
  - Active situation banner showing **Critical Chainsaw Detection at Node VN-NODE-02 (Canopy Watch Deep Teak)**.
  - Active status indicators showing 5 online nodes, 1 sleeping node in duty cycle.
  - Data integrity badge: Point out the explicit `[SIMULATED DEMO DATA]` indicator, adhering to strict engineering data integrity rules.

### Step 2: Tactical GIS Map (`/map`)
- **Action:** Click "Open Tactical Map".
- **Points to highlight:**
  - Satellite topology of the reserve with customized sensor pins.
  - The pulsing red detection pin at Node 02 surrounded by a **350-meter acoustic detection blast radius**.
  - The elevated LoRa gateway base station with its **4.0 km line-of-sight coverage circle**.
  - Click on any node to view real-time telemetry (Battery voltage, elevation, RSSI/SNR).

### Step 3: AI Sound Detection & TinyML Workbench (`/audio-detection`)
- **Action:** Navigate to AI Sound Detection.
- **Points to highlight:**
  - Hardware benchmark metrics: **68.4 KB INT8 quantized model**, **42 ms inference latency** on ESP32-S3 vector SIMD.
  - Click on **"2-Stroke Stihl 070 Chainsaw"**: Watch the 32-band Mel Spectrogram display the prominent 2.4 kHz mechanical harmonic peaks and a **94% softmax confidence** exceeding the 82% threshold.
  - Click on **"Dawn Forest Chorus"** or **"Monsoon Downpour"**: Show how natural biophony stays far below the threshold (4% - 8%), ensuring the node remains in deep sleep without wasting radio battery.

### Step 4: LoRa Gateway Concentrator & Frame Dissector (`/gateway`)
- **Action:** Navigate to LoRa Gateway.
- **Points to highlight:**
  - Live inbound packet stream showing raw 16-byte hex packets (e.g. `5652000201015e580ce4010000004f2c`).
  - Demonstrate the **16-Byte Frame Dissector**: Show how the 16 bytes unpack into Node ID, Threat Class, Confidence, Sound SPL, Battery mV, Solar state, Sequence number, and CRC-8.
  - Emphasize the bandwidth savings: 16 bytes takes only **52 ms airtime**, consuming 88% less energy than transmitting JSON.

### Step 5: Ranger Event Verification SOP Desk (`/verification`)
- **Action:** Open the Verification Desk.
- **Points to highlight:**
  - This is a human-in-the-loop decision-support tool, not an unmonitored automated system.
  - Walk through the SOP checklist (Acoustic confirmation, Harmonic peak match, Forestry permit registry cross-check).
  - Click **"Confirm Illegal Logging Threat & Dispatch Patrol"**: Show how the alert is updated with the officer callsign and logged into the permanent audit trail.

### Step 6: Hardware Readiness & Settings (`/settings`)
- **Action:** Open System Settings.
- **Points to highlight:**
  - Show the demonstration scenario injector: Click **"Scenario A: Chainsaw at Node 03"** to demonstrate live synthetic injection.
  - Show the physical hardware bridge configuration: The application provides a live `/api/gateway/uplink` endpoint and Python USB serial bridge ready to receive telemetry from real ESP32-S3 boards.

---

## 3. Anticipated Viva / Examiner Questions

### Q1: "Why did you choose LoRa instead of 4G or WiFi for the forest nodes?"
> **Answer:** *"Dense forest canopies and remote national parks have zero cellular reception. Cellular modems consume 1–2 Amperes during transmission, draining batteries in days. Sub-GHz LoRa (865 MHz) penetrates dense tree foliage over 3 to 5 kilometers line-of-sight and consumes only ~118 mA for 52 milliseconds per alert. The gateway at the ranger outpost is the only component that needs backhaul internet."*

### Q2: "How does the ESP32-S3 run machine learning with such limited RAM?"
> **Answer:** *"We use TensorFlow Lite for Microcontrollers (TFLM). The model is a 2D convolutional network quantized from 32-bit floating point to 8-bit integers (INT8). This shrinks the model footprint from ~280 KB down to 68.4 KB, fitting completely in the ESP32-S3's internal SRAM. Furthermore, the ESP32-S3 features Xtensa LX7 Vector Instructions, accelerating matrix multiplication and achieving inference in just 42 milliseconds."*

### Q3: "What prevents false alarms caused by thunder or falling branches?"
> **Answer:** *"Chainsaw sounds feature distinctive continuous periodic mechanical harmonics (2.2 kHz to 2.8 kHz) from two-stroke engines and blade teeth. Thunder and falling branches are low-frequency or short-duration impulse shocks (&lt;100 ms). Our model evaluates both frequency distribution and temporal continuity over a 500 ms window, effectively filtering out transient forest sounds."*

### Q4: "How long can a node operate without sunlight during monsoon season?"
> **Answer:** *"A node uses a 3.2V 6000 mAh LiFePO4 battery. In standard 500ms listening / 1500ms sleep duty cycles, average daily consumption is ~146 mAh. Under total darkness with zero solar generation, the node operates autonomously for over 41 continuous days."*
