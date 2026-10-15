export type NodeStatus = 'ONLINE' | 'SLEEP' | 'OFFLINE' | 'ALERT';
export type SolarStatus = 'CHARGING' | 'DISCHARGING' | 'STANDBY' | 'NIGHT';
export type ThreatType = 'CHAINSAW' | 'AXE' | 'HEAVY_VEHICLE' | 'GUNSHOT' | 'ANOMALY';
export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'INFO';
export type VerificationStatus = 'PENDING' | 'VERIFIED_THREAT' | 'FALSE_POSITIVE' | 'RESOLVED';
export type HardwareConnectionState =
  | 'CONNECTED_STREAMING'
  | 'CONFIGURED_DISCONNECTED'
  | 'SIMULATED_DEMO'
  | 'ERROR_UNAVAILABLE';

export interface ForestNode {
  id: string; // e.g. "VN-NODE-01"
  name: string; // e.g. "Sector 4 Ridge North"
  latitude: number;
  longitude: number;
  zone: string; // e.g. "Core Sanctuary Zone A"
  firmwareVersion: string;
  batteryPct: number;
  batteryVoltage: number; // Volts, e.g. 3.32
  solarStatus: SolarStatus;
  status: NodeStatus;
  lastSeenAt: string; // ISO 8601
  signalRssi: number; // dBm e.g. -104
  signalSnr: number; // dB e.g. 7.5
  isSimulated: boolean;
  elevationMeters: number;
  detectionCount: number;
}

export interface ThreatAlert {
  id: string; // UUID
  nodeId: string;
  nodeName: string;
  threatType: ThreatType;
  severity: AlertSeverity;
  confidence: number; // 0.00 to 1.00
  soundLevelDb: number; // Estimated SPL
  detectedAt: string; // ISO timestamp
  receivedAt: string; // Gateway receive timestamp
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  audioSampleKey?: string;
  frequencyPeakHz: number;
  durationSeconds: number;
  isSimulated: boolean;
  latitude: number;
  longitude: number;
}

export interface LoRaPacket {
  id: number;
  rawHex: string;
  nodeId: string;
  packetType: 'ALERT' | 'HEARTBEAT' | 'POWER_CRITICAL';
  rssi: number;
  snr: number;
  frequencyMhz: number;
  spreadingFactor: number;
  crcValid: boolean;
  receivedAt: string;
  isSimulated: boolean;
  decodedPayload?: {
    batteryMv: number;
    solarFlag: number;
    threatClass?: string;
    confidence?: number;
    soundLevelDb?: number;
    seqNumber: number;
  };
}

export interface BatteryTelemetryPoint {
  time: string;
  voltage: number;
  percentage: number;
  solarMw: number;
  tempC: number;
}

export interface SystemOverviewStats {
  totalNodes: number;
  onlineNodes: number;
  activeThreats: number;
  pendingVerifications: number;
  gatewayStatus: HardwareConnectionState;
  avgBatteryPct: number;
  lastPacketReceivedAt: string;
  systemMode: 'SIMULATED_DEMO' | 'LIVE_HARDWARE';
}

export interface AudioBenchmarkSample {
  id: string;
  name: string;
  category: ThreatType | 'AMBIENT';
  description: string;
  durationSec: number;
  peakFrequencyHz: number;
  splDb: number;
  benchmarkConfidence: number;
  isThreat: boolean;
  audioFileUrl: string;
  melBands: number[]; // 32 normalized frequency energy bins for visualization
}
