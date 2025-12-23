
export interface SystemState {
  cpuLoad: number;
  cpuFreq: number; // GHz
  gpuLoad: number;
  gpuFreq: number; // MHz
  gpuTemp: number; // Celsius
  memoryUsage: number;
  ramSpeed: number; // MHz
  temperature: number; // CPU Temp
  wifiEnabled: boolean;
  bluetoothEnabled: boolean;
  nethunterActive: boolean;
  gamingModeActive: boolean;
  demonModeActive: boolean; // Offensive/Defensive Overdrive
  volume: number;
  brightness: number;
  processes: Process[];
  securityStatus: 'SECURE' | 'VULNERABLE' | 'SCANNING' | 'DEMON_MODE';
  threats: Threat[];
  networkDevices: NetworkDevice[];
  bluetoothSignals: BluetoothDevice[];
  stabilityIndex: number;
  neuralIntegrity: number;
  // VM State
  vmState: {
    isOpen: boolean;
    status: 'OFF' | 'BOOTING' | 'RUNNING' | 'HALTED';
    osName: string;
    activeWorkspace: 'GENERAL' | 'API_INTEL' | 'RECON' | 'NEURAL_DEV';
    uptime: string;
    allocatedCpu: number;
    allocatedRam: string;
    apiEndpoints: { id: string; name: string; status: 'ACTIVE' | 'IDLE'; load: number }[];
  };
  // Pentest State
  pentestState: {
    active: boolean;
    target: string;
    progress: number;
    phase: 'RECON' | 'ENUMERATION' | 'VULN_SEARCH' | 'EXPLOITATION' | 'POST_EXPLOIT' | 'COMPLETED';
    logs: string[];
    discoveredVulns: { cve: string; severity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL'; desc: string }[];
  };
  // New Granular Details
  networkInterfaces: {
    name: string;
    status: 'UP' | 'DOWN';
    ip: string;
    tx: string;
    rx: string;
    upSpeed: string;   // Real-time upload speed
    downSpeed: string; // Real-time download speed
  }[];
  networkHistory: Record<string, { time: string; up: number; down: number }[]>;
  diskVolumes: {
    mount: string;
    total: string;
    used: string;
    percent: number;
  }[];
  activeServices: {
    name: string;
    status: 'ACTIVE' | 'INACTIVE' | 'FAILED';
    uptime: string;
    description: string;
  }[];
}

export interface BluetoothDevice {
  id: string;
  name: string;
  rssi: number;
  type: string;
  isOverridden: boolean;
  address: string;
}

export interface NetworkDevice {
  ip: string;
  mac: string;
  hostname: string;
  vendor: string;
  os: string;
  status: 'ONLINE' | 'OFFLINE';
  ports: number[];
  vulnerabilities: string[];
  compromised: boolean;
  latency: number;
}

export interface ThreatAnalysis {
  infectionDepth: number;
  obfuscation: number;
  propagation: number;
  exfiltrationRisk: number;
  cpuImpact: number;
  origin: string;
  intent: string;
  signature: string;
}

export interface Threat {
  id: string;
  type: 'NETWORK' | 'MALWARE' | 'INTRUSION' | 'VULNERABILITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  source: string;
  status: 'ACTIVE' | 'BLOCKED' | 'MITIGATED' | 'QUARANTINED' | 'ANALYZING';
  timestamp: Date;
  analysis?: ThreatAnalysis;
}

export interface Process {
  id: number;
  name: string;
  cpu: number;
  status: 'running' | 'sleeping' | 'terminated';
  priority?: 'low' | 'normal' | 'high';
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  source: 'SYSTEM' | 'AI' | 'USER' | 'TOOL';
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export enum ConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}
