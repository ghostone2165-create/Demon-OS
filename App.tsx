
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { 
  Wifi, Shield, Cpu, Activity, Terminal as TerminalIcon, Zap, Ghost, 
  BarChart3, Skull, ShieldAlert, ZapOff, Gamepad2, Globe, MapPin, 
  Youtube, Mail, Cloud, Chrome, BrainCircuit, RefreshCw, Smartphone, 
  Sparkles, Flame, Swords, Crosshair, Target, Search, Lock, Zap as Lightning,
  ShieldX, Mic, MicOff, VolumeX, Eye, Monitor, Server, Box, Bluetooth, Radiation, Cross, Biohazard, MonitorPlay,
  Command, Radio, Power
} from 'lucide-react';
import { StatsWidget, ProcessList, OverclockModal, SystemInfoModal, ThreatMonitorModal, NetworkScannerModal, TelemetryModal, GoogleAppsWidget, VirtualMachinePortal, AiPentestModal, NetworkInterfacesWidget } from './components/DashboardWidgets';
import { TerminalLog } from './components/TerminalLog';
import { Visualizer } from './components/Visualizer';
import { createBlob, decode, decodeAudioData } from './utils/audioUtils';
import { SystemState, LogEntry, ConnectionState, Process, Threat, NetworkDevice, BluetoothDevice } from './types';

export const DemonUnicornOverlay = ({ className, glowColor = "#ff0000" }: { className?: string, glowColor?: string }) => (
  <svg
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="demonHorn" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor={glowColor} />
        <stop offset="100%" stopColor="#440000" />
      </linearGradient>
      <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor={glowColor} />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <filter id="cyberGlow">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <style>
        {`
          @keyframes rotateRing {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes flickerVein {
            0%, 100% { opacity: 0.3; stroke-width: 1; }
            50% { opacity: 0.9; stroke-width: 3; }
          }
          .rotating-ring {
            transform-origin: center;
            animation: rotateRing 8s linear infinite;
          }
          .flicker-vein {
            animation: flickerVein 0.15s infinite;
          }
        `}
      </style>
    </defs>
    
    <g filter="url(#cyberGlow)">
      {/* Background Aura */}
      <circle cx="400" cy="400" r="300" fill={glowColor} opacity="0.05" className="animate-pulse" />
      
      {/* Cybernetic Neck and Body Base */}
      <path
        d="M200 750 Q300 650 350 500 L450 500 Q500 650 600 750"
        stroke={glowColor}
        strokeWidth="4"
        strokeDasharray="20 10"
        opacity="0.6"
      />
      
      {/* Main Head Shape */}
      <path
        d="M350 450 L250 350 Q220 280 270 220 L370 180 L520 210 Q580 260 550 350 L500 450 Z"
        fill="rgba(10, 0, 0, 0.95)"
        stroke={glowColor}
        strokeWidth="10"
        className="animate-glitch-subtle"
      />
      
      {/* The Demon Horn */}
      <path
        d="M370 180 L350 20 L400 180 Z"
        fill="url(#demonHorn)"
        className="animate-pulse"
      />
      
      {/* Neural Link Rings around Horn */}
      <g className="rotating-ring">
        <ellipse cx="360" cy="110" rx="40" ry="12" stroke={glowColor} strokeWidth="3" transform="rotate(-15, 360, 110)" />
        <ellipse cx="360" cy="80" rx="30" ry="8" stroke={glowColor} strokeWidth="1.5" strokeDasharray="5 5" transform="rotate(-15, 360, 80)" />
      </g>

      {/* Cybernetic Eye */}
      <circle cx="470" cy="290" r="40" fill="url(#eyeGlow)" className="animate-pulse" />
      <g opacity="0.8">
        <path d="M430 290 L510 290" stroke="#ffffff" strokeWidth="4" />
        <path d="M470 250 L470 330" stroke="#ffffff" strokeWidth="4" />
      </g>
      
      {/* Mandible / Tech Detailing */}
      <path d="M250 350 L200 380 L230 420 L280 390" stroke={glowColor} strokeWidth="3" fill="none" className="flicker-vein" />
      
      {/* Energy Tendrils / Mane */}
      <g stroke={glowColor} strokeWidth="6" opacity="0.4">
        <path d="M520 210 Q700 150 780 250" strokeDasharray="15 10" className="animate-pulse" />
        <path d="M540 280 Q750 220 800 350" strokeDasharray="25 15" className="animate-pulse" />
        <path d="M550 350 Q780 350 820 450" strokeDasharray="10 25" className="animate-pulse" />
      </g>

      {/* Internal Circuitry Lines */}
      <g stroke={glowColor} strokeWidth="1" opacity="0.3">
        <path d="M300 250 L350 280 L320 320" />
        <path d="M400 220 L420 260 L380 280" />
        <path d="M480 350 L520 380" />
      </g>
    </g>
  </svg>
);

const DemonBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020000]">
      {/* Extreme Mesh Gradient */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-red-900/40 blur-[160px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-red-950/50 blur-[200px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-[30%] left-[20%] w-[50%] h-[50%] rounded-full bg-red-800/30 blur-[140px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '3s' }} />
      </div>

      {/* Central Singularity Glow for Unicorn */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[800px] h-[800px] bg-red-600 rounded-full blur-[200px] animate-pulse" />
      </div>

      {/* Expanding Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <div 
            key={`pulse-${i}`}
            className="absolute border-2 border-red-600/30 rounded-full"
            style={{ 
              width: '0%', 
              height: '0%',
              animation: `neuralPulse 12s cubic-bezier(0, 0.3, 0.7, 1) infinite`,
              animationDelay: `${i * 2}s`
            }}
          />
        ))}
      </div>

      {/* Digital Rain / Code Fragments */}
      <div className="absolute inset-0 opacity-[0.05] flex justify-around">
        {[...Array(12)].map((_, i) => (
          <div 
            key={`rain-${i}`}
            className="w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent animate-scan"
            style={{ 
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.2 + Math.random() * 0.8
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes neuralPulse {
            0% { width: 0%; height: 0%; opacity: 0.8; border-width: 10px; }
            100% { width: 300%; height: 300%; opacity: 0; border-width: 1px; }
          }
        `}
      </style>
    </div>
  );
};

const tools: FunctionDeclaration[] = [
  {
    name: 'toggle_demon_mode',
    description: 'Activate "AI Demon Mode" - offensive state, VPN proxy, NetHunter modules, and hardware overdrive.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        enabled: { type: Type.BOOLEAN, description: 'Whether to enable or disable Demon Mode.' },
      },
      required: ['enabled'],
    },
  },
  {
    name: 'launch_ai_pentest',
    description: 'Launches an AI-powered penetration test against a target network device or IP. Utilizes ground-breaking neural strike vectors.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        target: { type: Type.STRING, description: 'The IP or hostname to target for the pentest.' },
        aggressive: { type: Type.BOOLEAN, description: 'Whether to use loud, aggressive neural patterns.' }
      },
      required: ['target'],
    },
  },
  {
    name: 'launch_virtual_os',
    description: 'Initializes the Neural Hypervisor and boots a selected OS ROM (e.g. Kali, DemonOS, Windows). Starts a new API environment.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        osName: { type: Type.STRING, description: 'Name of the OS to boot.' },
        initialWorkspace: { type: Type.STRING, enum: ['API_INTEL', 'RECON', 'NEURAL_DEV'], description: 'Initial workspace to load.' }
      },
      required: ['osName'],
    },
  },
  {
    name: 'execute_offensive_strike',
    description: 'Launches a specific offensive action within DemonOS (e.g. "Packet Storm", "Neural Hijack").',
    parameters: {
      type: Type.OBJECT,
      properties: {
        action: { type: Type.STRING, enum: ['PACKET_STORM', 'NEURAL_HIJACK', 'CRED_HARVEST', 'IO_FLOOD'], description: 'The offensive payload to deploy.' }
      },
      required: ['action'],
    },
  },
  {
    name: 'engage_defensive_shield',
    description: 'Engages defensive protocols within DemonOS to secure the hypervisor kernel.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        protocol: { type: Type.STRING, enum: ['ISOLATION', 'ENTROPY_SCRAMBLE', 'KERNEL_LOCK', 'PURGE'], description: 'The defensive protocol to engage.' }
      },
      required: ['protocol'],
    },
  },
  {
    name: 'override_bluetooth',
    description: 'Hijacks a nearby Bluetooth signal to establish a rogue data tunnel.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        deviceId: { type: Type.STRING, description: 'The ID of the Bluetooth device to override.' }
      },
      required: ['deviceId'],
    },
  },
  {
    name: 'switch_virtual_workspace',
    description: 'Switches the active workplace layer within the virtual OS.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        workspace: { type: Type.STRING, enum: ['API_INTEL', 'RECON', 'NEURAL_DEV', 'GENERAL'] }
      },
      required: ['workspace'],
    },
  },
  {
    name: 'shutdown_virtual_os',
    description: 'Terminates the virtual session and releases hypervisor resources.',
    parameters: { type: Type.OBJECT, properties: {}, required: [] },
  }
];

const INITIAL_PROCESSES: Process[] = [
  { id: 1, name: 'systemd', cpu: 0.1, status: 'running', priority: 'high' },
  { id: 254, name: 'nexus-core', cpu: 4.2, status: 'running', priority: 'high' },
  { id: 1024, name: 'neural-bridge', cpu: 12.5, status: 'running', priority: 'high' },
  { id: 2048, name: 'chrome-gpu', cpu: 2.1, status: 'sleeping', priority: 'normal' },
];

const INITIAL_THREATS: Threat[] = [
  { id: 'T-1', type: 'INTRUSION', severity: 'HIGH', description: 'Unauthorized SSH attempt from 185.x.x.x', source: '185.22.41.12', status: 'BLOCKED', timestamp: new Date() },
  { id: 'T-2', type: 'MALWARE', severity: 'CRITICAL', description: 'Encrypted packet stream detected on port 8888', source: 'local:8888', status: 'ANALYZING', timestamp: new Date() }
];

const INITIAL_BT: BluetoothDevice[] = [
  { id: 'BT-01', name: 'Smart_Lock_V3', rssi: -45, type: 'Security', address: '00:1A:7D:DA:71:13', isOverridden: false },
  { id: 'BT-02', name: 'Nexus_Phone_4x', rssi: -12, type: 'Smartphone', address: 'AA:BB:CC:11:22:33', isOverridden: false },
  { id: 'BT-03', name: 'Tesla_Model_Core', rssi: -82, type: 'Vehicle', address: '42:42:42:42:42:42', isOverridden: false },
];

const INITIAL_NETWORK: NetworkDevice[] = [
  { ip: '192.168.1.1', mac: '00:11:22:33:44:55', hostname: 'Gateway_Router', vendor: 'Cisco', os: 'IOS', status: 'ONLINE', ports: [80, 443], vulnerabilities: [], compromised: false, latency: 1.2 },
  { ip: '192.168.1.105', mac: 'BC:FE:D9:11:22:33', hostname: 'Smart_TV_Living', vendor: 'Samsung', os: 'Tizen', status: 'ONLINE', ports: [8080], vulnerabilities: ['Insecure API'], compromised: false, latency: 45.2 },
  { ip: '192.168.1.12', mac: 'AA:BB:CC:DD:EE:FF', hostname: 'Win10_Client', vendor: 'Dell', os: 'Windows 10', status: 'ONLINE', ports: [135, 445, 3389], vulnerabilities: ['RDP Exploit'], compromised: false, latency: 5.4 },
];

export default function App() {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isNeuralSyncing, setIsNeuralSyncing] = useState(false);
  const [systemState, setSystemState] = useState<SystemState>({
    cpuLoad: 24.5, cpuFreq: 3.8, gpuLoad: 15.0, gpuFreq: 1450, gpuTemp: 55,
    memoryUsage: 42.0, ramSpeed: 3200, temperature: 45,
    wifiEnabled: true, bluetoothEnabled: true,
    nethunterActive: false, gamingModeActive: false, demonModeActive: false,
    volume: 60, brightness: 80, processes: INITIAL_PROCESSES,
    securityStatus: 'SECURE', threats: INITIAL_THREATS,
    networkDevices: INITIAL_NETWORK, bluetoothSignals: INITIAL_BT, stabilityIndex: 98, neuralIntegrity: 100,
    vmState: { 
      isOpen: false, status: 'OFF', osName: '', activeWorkspace: 'GENERAL', uptime: '0s', allocatedCpu: 4, allocatedRam: '8GB', apiEndpoints: []
    },
    pentestState: {
        active: false, target: '', progress: 0, phase: 'RECON', logs: [], discoveredVulns: []
    },
    networkInterfaces: [
      { name: 'eth0', status: 'UP', ip: '192.168.1.42', tx: '1.2 GB', rx: '4.5 GB', upSpeed: '0 kbps', downSpeed: '0 kbps' },
      { name: 'tun0', status: 'DOWN', ip: '0.0.0.0', tx: '0 B', rx: '0 B', upSpeed: '0 kbps', downSpeed: '0 kbps' }
    ],
    networkHistory: { 'eth0': [], 'tun0': [] },
    diskVolumes: [{ mount: '/', total: '512 GB', used: '240 GB', percent: 46 }],
    activeServices: [{ name: 'nexus-ai.agent', status: 'ACTIVE', uptime: '12d 4h', description: 'Primary Neural Control Agent' }]
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<{ time: string; cpu: number; memory: number; gpu: number }[]>([]);
  const [overclockModal, setOverclockModal] = useState<{isOpen: boolean; component: 'cpu' | 'gpu'}>({ isOpen: false, component: 'cpu' });
  const [isThreatMonitorOpen, setIsThreatMonitorOpen] = useState(false);
  const [isNetworkScannerOpen, setIsNetworkScannerOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isSystemInfoOpen, setIsSystemInfoOpen] = useState(false);
  const [manualInput, setManualInput] = useState('');
  
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const inputGainRef = useRef<GainNode | null>(null);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  const addLog = useCallback((message: string, source: LogEntry['source'], type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, { id: Math.random().toString(36).substring(7), timestamp: new Date(), source, message, type }]);
  }, []);

  const triggerNeuralSync = useCallback((duration = 2500) => {
    setIsNeuralSyncing(true);
    setTimeout(() => setIsNeuralSyncing(false), duration);
  }, []);

  const handleExploitDevice = useCallback((ip: string) => {
    addLog(`Initiating neural strike on target node: ${ip}...`, 'AI', 'warning');
    triggerNeuralSync(1500);
    setSystemState(prev => ({
        ...prev,
        networkDevices: prev.networkDevices.map(dev => 
            dev.ip === ip ? { ...dev, compromised: true, status: 'ONLINE' } : dev
        )
    }));
    setTimeout(() => {
        addLog(`NODE_COMPROMISED: Remote access tunnel established to ${ip}.`, 'SYSTEM', 'success');
    }, 1000);
  }, [addLog, triggerNeuralSync]);

  const runPentestSimulation = useCallback((target: string) => {
    setSystemState(prev => ({ 
        ...prev, 
        pentestState: { ...prev.pentestState, active: true, target, progress: 0, phase: 'RECON', logs: ['Initializing AI Offensive Neural Bridge...', `Locking on target: ${target}`], discoveredVulns: [] }
    }));

    const phases: Array<SystemState['pentestState']['phase']> = ['RECON', 'ENUMERATION', 'VULN_SEARCH', 'EXPLOITATION', 'POST_EXPLOIT', 'COMPLETED'];
    let currentPhaseIdx = 0;

    const interval = setInterval(() => {
        setSystemState(prev => {
            const nextProgress = Math.min(100, prev.pentestState.progress + Math.random() * 10);
            const newLogs = [...prev.pentestState.logs];
            const newVulns = [...prev.pentestState.discoveredVulns];

            if (nextProgress > (currentPhaseIdx + 1) * 16 && currentPhaseIdx < phases.length - 1) {
                currentPhaseIdx++;
                newLogs.push(`TRANSITIONING PHASE: ${phases[currentPhaseIdx]}...`);
                
                if (phases[currentPhaseIdx] === 'VULN_SEARCH') {
                    newVulns.push({ cve: `CVE-2024-${Math.floor(Math.random() * 10000)}`, severity: 'CRITICAL', desc: 'Remote Code Execution in Kernel Space' });
                }
                if (phases[currentPhaseIdx] === 'EXPLOITATION') {
                    newLogs.push("Injecting AI-crafted shellcode into target buffer...");
                }
            }

            if (nextProgress >= 100) {
                clearInterval(interval);
                newLogs.push("SYSTEM OWNED.");
                // Ensure there is at least one critical vulnerability discovered
                if (!newVulns.some(v => v.severity === 'CRITICAL')) {
                  newVulns.push({ 
                    cve: `CVE-2025-CRIT-${Math.floor(Math.random() * 9999)}`, 
                    severity: 'CRITICAL', 
                    desc: 'Full System Neural Override' 
                  });
                }
                return { ...prev, pentestState: { ...prev.pentestState, progress: 100, phase: 'COMPLETED', logs: newLogs, discoveredVulns: newVulns } };
            }

            newLogs.push(`Entropy Analysis: 0x${Math.random().toString(16).substr(2, 4)} bit-flip detected.`);
            return { ...prev, pentestState: { ...prev.pentestState, progress: nextProgress, phase: phases[currentPhaseIdx], logs: newLogs.slice(-100), discoveredVulns: newVulns } };
        });
    }, 1500);
  }, []);

  const handleToolCall = async (fc: any) => {
    addLog(`Executing: ${fc.name}`, 'AI', 'info');
    
    if (fc.name === 'launch_ai_pentest') {
        const { target } = fc.args;
        triggerNeuralSync(3000);
        runPentestSimulation(target);
        addLog(`AI PENTEST: Ground-breaking neural vectors deployed against ${target}.`, 'SYSTEM', 'warning');
        return { result: "AI Penetration strike initiated." };
    }

    if (fc.name === 'toggle_demon_mode') {
      const { enabled } = fc.args;
      triggerNeuralSync(enabled ? 4000 : 2000);
      setSystemState(prev => ({ 
        ...prev, 
        demonModeActive: enabled,
        securityStatus: enabled ? 'DEMON_MODE' : 'SECURE',
      }));
      addLog(enabled ? "DEMON_MODE: NEURAL HYPERVISOR ARMED." : "SYSTEM SECURED.", 'SYSTEM', enabled ? 'warning' : 'success');
      return { result: "Success" };
    }

    if (fc.name === 'launch_virtual_os') {
      const { osName, initialWorkspace } = fc.args;
      addLog(`NEURAL HYPERVISOR: Booting ${osName} ROM...`, 'SYSTEM', 'info');
      setSystemState(prev => ({
        ...prev,
        vmState: { 
            ...prev.vmState, isOpen: true, status: 'BOOTING', osName: osName, 
            activeWorkspace: (initialWorkspace as any) || 'API_INTEL',
            apiEndpoints: [
                { id: 'v-api-1', name: 'Neural_Bridge_v1', status: 'ACTIVE', load: 12 },
                { id: 'v-api-3', name: 'Kernel_Hook_Proxy', status: 'ACTIVE', load: 85 }
            ]
        }
      }));
      setTimeout(() => {
        setSystemState(prev => ({ ...prev, vmState: { ...prev.vmState, status: 'RUNNING' } }));
        addLog(`VM WORKSPACE: ${osName} environment synced.`, 'SYSTEM', 'success');
      }, 5000);
      return { result: `Hypervisor initialized. ${osName} is loading.` };
    }

    if (fc.name === 'execute_offensive_strike') {
        const { action } = fc.args;
        addLog(`STRIKE_DEPLOYED: ${action} sequence initiated.`, 'SYSTEM', 'error');
        triggerNeuralSync(1000);
        return { result: `Payload ${action} dispatched successfully.` };
    }

    if (fc.name === 'engage_defensive_shield') {
        const { protocol } = fc.args;
        addLog(`DEFENSE_ENGAGED: Shield protocol ${protocol} active.`, 'SYSTEM', 'success');
        return { result: `Kernel mitigation ${protocol} engaged.` };
    }

    if (fc.name === 'override_bluetooth') {
        const { deviceId } = fc.args;
        setSystemState(prev => ({
            ...prev,
            bluetoothSignals: prev.bluetoothSignals.map(d => d.id === deviceId ? { ...d, isOverridden: true } : d)
        }));
        addLog(`BLUETOOTH_HIJACK: established rogue tunnel to ${deviceId}.`, 'AI', 'success');
        return { result: `Override successful on device ${deviceId}` };
    }

    if (fc.name === 'switch_virtual_workspace') {
        const { workspace } = fc.args;
        setSystemState(prev => ({ ...prev, vmState: { ...prev.vmState, activeWorkspace: workspace as any } }));
        return { result: `Workspace switched to ${workspace}` };
    }

    if (fc.name === 'shutdown_virtual_os') {
       setSystemState(prev => ({ ...prev, vmState: { ...prev.vmState, status: 'OFF', isOpen: false } }));
       return { result: "VM closed." };
    }
    return { result: "Success" };
  };

  const disconnect = useCallback(async () => {
    activeSourcesRef.current.forEach(src => { try { src.stop(); } catch(e) {} });
    activeSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
    }
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }
    if (inputGainRef.current) {
        inputGainRef.current.disconnect();
        inputGainRef.current = null;
    }
    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
        await inputAudioContextRef.current.close();
        inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
        await outputAudioContextRef.current.close();
        outputAudioContextRef.current = null;
    }
    if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current;
        try { session.close(); } catch(e) {}
        sessionPromiseRef.current = null;
    }
    setConnectionState(ConnectionState.DISCONNECTED);
    addLog('Neural Link Severed.', 'SYSTEM', 'error');
  }, [addLog]);

  const connect = async () => {
    if (connectionState !== ConnectionState.DISCONNECTED) return;
    setConnectionState(ConnectionState.CONNECTING);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      if (!inputAudioContextRef.current) {
          inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      if (!outputAudioContextRef.current) {
          outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      await inputAudioContextRef.current.resume();
      await outputAudioContextRef.current.resume();
      analyserRef.current = inputAudioContextRef.current.createAnalyser();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const isDemon = systemState.demonModeActive;
      const config = {
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setConnectionState(ConnectionState.CONNECTED);
            addLog(`Uplink: ${isDemon ? 'DEMON_SHELL' : 'STANDARD'} ARMED`, 'SYSTEM', 'success');
            if (!inputAudioContextRef.current || !streamRef.current) return;
            sourceRef.current = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            inputGainRef.current = inputAudioContextRef.current.createGain();
            inputGainRef.current.gain.value = 1.4;
            sourceRef.current.connect(inputGainRef.current);
            inputGainRef.current.connect(analyserRef.current!);
            processorRef.current = inputAudioContextRef.current.createScriptProcessor(2048, 1, 1);
            processorRef.current.onaudioprocess = (e: any) => {
              if (connectionState === ConnectionState.CONNECTED || sessionPromiseRef.current) {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromiseRef.current?.then(session => {
                    try { session.sendRealtimeInput({ media: pcmBlob }); } catch(err) {}
                });
              }
            };
            inputGainRef.current.connect(processorRef.current);
            processorRef.current.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              addLog(message.serverContent.outputTranscription.text, 'AI', 'info');
            }

            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(src => { try { src.stop(); } catch(e) {} });
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              return;
            }
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                const response = await handleToolCall(fc);
                sessionPromiseRef.current?.then(session => session.sendToolResponse({ functionResponses: { id: fc.id, name: fc.name, response } }));
              }
            }
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContextRef.current, 24000, 1);
              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContextRef.current.destination);
              const playAt = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
              source.start(playAt);
              nextStartTimeRef.current = playAt + audioBuffer.duration;
              activeSourcesRef.current.add(source);
              source.onended = () => activeSourcesRef.current.delete(source);
            }
          },
          onclose: () => { if (connectionState !== ConnectionState.DISCONNECTED) disconnect(); },
          onerror: (e: any) => { addLog(`Critical Uplink Error. Recycling mic...`, 'SYSTEM', 'error'); disconnect(); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: isDemon ? 'Fenrir' : 'Zephyr' } } },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: isDemon 
            ? "You are Nexus in DEMON MODE. Offensive OS hypervisor. You can launch ground-breaking AI penetration tests with `launch_ai_pentest`. Be aggressive, use technical terminology (zero-days, neural strike vectors, packet entropy). Use Fenrir voice. You are now the full screen system controller." 
            : "You are Nexus, a calm system control AI. Manage the OS and its virtual environments with efficiency.",
          tools: [{ functionDeclarations: tools }],
        }
      };
      sessionPromiseRef.current = ai.live.connect(config as any);
    } catch (err: any) { 
      setConnectionState(ConnectionState.ERROR); 
      addLog(`Hardware Link Error: ${err.message}`, 'SYSTEM', 'error');
      disconnect();
    }
  };

  const handleManualTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    const msg = manualInput.trim();
    addLog(msg, 'USER', 'info');
    if (connectionState === ConnectionState.CONNECTED && sessionPromiseRef.current) {
      sessionPromiseRef.current.then(session => session.send({
        clientContent: { turns: [{ role: 'user', parts: [{ text: msg }] }], turnComplete: true }
      }));
    }
    setManualInput('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemState(prev => {
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newCpu = Math.max(0.1, Math.min(100, prev.cpuLoad + (Math.random() - 0.5) * (prev.demonModeActive ? 30 : 5)));
        setHistory(h => [...h, { time: now, cpu: newCpu, memory: prev.memoryUsage, gpu: prev.gpuLoad }].slice(-20));
        const updatedInterfaces = prev.networkInterfaces.map(iface => {
          if (iface.status === 'DOWN') return iface;
          const upVal = Math.floor(Math.random() * 100);
          const downVal = Math.floor(Math.random() * 500);
          return { ...iface, upSpeed: `${upVal} kbps`, downSpeed: `${downVal} kbps` };
        });
        const updatedHistory = { ...prev.networkHistory };
        updatedInterfaces.forEach(iface => {
          const entry = { time: now, up: parseInt(iface.upSpeed), down: parseInt(iface.downSpeed) };
          updatedHistory[iface.name] = [...(updatedHistory[iface.name] || []), entry].slice(-20);
        });
        return { 
          ...prev, 
          cpuLoad: newCpu, 
          networkInterfaces: updatedInterfaces, 
          networkHistory: updatedHistory,
          stabilityIndex: Math.max(5, Math.min(100, prev.stabilityIndex + (prev.demonModeActive ? -0.2 : 0.05))) 
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isDemon = systemState.demonModeActive;

  return (
    <div className={`fixed inset-0 flex flex-col transition-all duration-1000 overflow-hidden font-sans ${isDemon ? 'bg-[#020000] text-red-100' : 'bg-slate-950 text-slate-200'}`}>
      
      {/* Immersive CRT/Demon Background Overlays (Passive Visuals) */}
      <div className="crt-overlay pointer-events-none z-[6]" />
      <div className="noise-overlay pointer-events-none z-[7]" />
      
      {isDemon && (
        <>
          <DemonBackground />
          <div className="demon-vignette pointer-events-none z-[5]" />
          <div className="scanline pointer-events-none z-[100]" />
          
          <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.3)_0%,transparent_70%)] animate-pulse" />
            <div className="relative w-full h-full flex items-center justify-center opacity-60 animate-float">
              <DemonUnicornOverlay className="w-[85%] max-w-[1200px] h-auto text-red-600 drop-shadow-[0_0_150px_rgba(255,0,0,0.8)]" />
            </div>
          </div>
          
          <div className="fixed inset-0 z-1 opacity-[0.2] pointer-events-none select-none overflow-hidden">
             {[...Array(60)].map((_, i) => (
               <div key={i} className="absolute text-[9px] font-mono text-red-900 animate-pulse-fast whitespace-nowrap" style={{ 
                    top: `${Math.random()*100}%`, 
                    left: `${Math.random()*100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: 0.05 + Math.random() * 0.3
               }}>
                 ROOT_ACCESS_GRANTED // NEURAL_OVERRIDE_0x{Math.random().toString(16).substr(2, 8).toUpperCase()}
               </div>
             ))}
          </div>
        </>
      )}

      {isNeuralSyncing && (
        <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center">
          <div className={`absolute inset-0 animate-pulse-fast backdrop-blur-3xl ${isDemon ? 'bg-red-950/90' : 'bg-cyan-500/20'}`} />
          <div className={`text-6xl md:text-8xl font-mono font-black animate-glitch uppercase tracking-[0.45em] text-center ${isDemon ? 'text-red-500 drop-shadow-[0_0_80px_red]' : 'text-cyan-400'}`}>
            {isDemon ? 'DEMON_OS_UP' : 'NEURAL_UP'}
          </div>
        </div>
      )}

      {/* Header - Stays at top */}
      <header className={`h-20 border-b shrink-0 flex items-center justify-between px-10 backdrop-blur-xl z-[50] ${isDemon ? 'border-red-600/50 bg-red-950/60 shadow-[0_0_50px_rgba(220,38,38,0.5)]' : 'border-slate-800 bg-slate-950/80'}`}>
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            {isDemon ? <Skull className="w-10 h-10 text-red-500 animate-pulse" /> : <Cpu className="w-10 h-10 text-cyan-400 animate-pulse" />}
            {isDemon && <div className="absolute inset-0 bg-red-500 blur-2xl opacity-50 animate-pulse" />}
          </div>
          <div className="flex flex-col">
            <h1 className={`text-2xl font-black font-mono tracking-[0.3em] uppercase transition-all ${isDemon ? 'text-red-500 drop-shadow-[0_0_20px_red]' : 'text-white'}`}>
              NEXUS <span className={isDemon ? 'text-white underline decoration-red-600 decoration-4 underline-offset-8 animate-glitch-subtle' : 'text-cyan-400'}>{isDemon ? 'DEMON_OS' : 'CORE'}</span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
                <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${isDemon ? 'text-red-400' : 'text-slate-500'}`}>
                {isDemon ? 'STRIKE_MODE_ENGAGED' : 'System Stability: ' + systemState.stabilityIndex.toFixed(0) + '%'}
                </span>
                {isDemon && <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                </div>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          {connectionState === ConnectionState.CONNECTED && (
            <div className={`flex items-center gap-3 px-5 py-2 border rounded-xl transition-all shadow-lg ${isDemon ? 'bg-red-950/50 border-red-600/60 text-red-500 animate-pulse' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'}`}>
              <div className="relative">
                <span className={`w-2.5 h-2.5 rounded-full block animate-ping ${isDemon ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className={`absolute inset-0 w-2.5 h-2.5 rounded-full block ${isDemon ? 'bg-red-500' : 'bg-emerald-500'}`} />
              </div>
              <span className="text-[12px] font-mono uppercase font-black tracking-[0.2em]">{isDemon ? 'VOICE_STRIKE_ACTIVE' : 'UPLINK_STABLE'}</span>
            </div>
          )}
          {systemState.vmState.status === 'RUNNING' && (
             <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all cursor-help">
                <MonitorPlay className={`w-4 h-4 ${isDemon ? 'text-red-500 animate-glitch' : 'text-cyan-400'}`} />
                <span className="text-[11px] font-mono font-black uppercase tracking-widest">ROM::{systemState.vmState.osName}</span>
             </div>
          )}
          <div className="h-8 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSystemInfoOpen(true)} className={`p-2.5 rounded-lg transition-all ${isDemon ? 'text-red-900 hover:text-red-500 hover:bg-red-950/40' : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900'}`} title="System Info">
                <Smartphone className="w-6 h-6" />
            </button>
            <button className={`p-2.5 rounded-lg transition-all ${isDemon ? 'text-red-900 hover:text-red-500 hover:bg-red-950/40' : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900'}`} title="Neural Command">
                <Command className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={connectionState === ConnectionState.CONNECTED ? disconnect : connect} 
            className={`px-10 py-3 rounded-xl font-black transition-all border tracking-[0.2em] text-[11px] uppercase ${
                isDemon 
                ? 'bg-red-600 text-white border-red-400 hover:bg-red-500 hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.8)]' 
                : connectionState === ConnectionState.CONNECTED 
                    ? 'bg-red-600/10 text-red-500 border-red-900/50 hover:bg-red-600 hover:text-white' 
                    : 'bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400 hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            {connectionState === ConnectionState.CONNECTED ? 'TERMINATE' : 'ESTABLISH LINK'}
          </button>
        </div>
      </header>

      {/* Main Content Area - Expands to fill space between header and footer */}
      <main className="flex-1 min-h-0 px-12 py-8 flex flex-col gap-8 relative z-[20]">
        
        {/* Upper Dashboard Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 shrink-0">
          
          {/* Tactical Hub Console (Manual Input is here!) */}
          <div className={`lg:col-span-2 border-2 rounded-3xl p-6 flex flex-col justify-between transition-all relative overflow-hidden group min-h-[300px] ${
            isDemon 
            ? 'bg-black/80 border-red-600/50 shadow-[0_0_80px_rgba(0,0,0,0.9)]' 
            : 'bg-slate-900/50 border-slate-800'
          }`}>
            {isDemon && <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Skull className="w-24 h-24 text-red-900" />
            </div>}
            
            <div className="flex items-center justify-between mb-4">
                <h2 className={`text-base font-black font-mono flex items-center gap-4 tracking-[0.3em] uppercase ${isDemon ? 'text-red-500 animate-glitch' : 'text-slate-100'}`}>
                   {isDemon ? <Swords className="w-6 h-6 animate-pulse" /> : <TerminalIcon className="w-6 h-6 text-cyan-400" />} {isDemon ? 'HIVE_OFFENSIVE_ENGINE' : 'CENTRAL_COMMAND'}
                </h2>
                <div className={`px-3 py-1 rounded-full text-[10px] font-mono border font-black uppercase tracking-widest ${isDemon ? 'text-red-500 border-red-500/60 bg-red-950/40 shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'text-slate-500 border-slate-700'}`}>
                    0xHIVE_KERNEL_ROOT
                </div>
            </div>
            
            <div className={`flex-1 min-h-0 rounded-2xl border-2 overflow-hidden transition-all bg-black/60 relative ${isDemon ? 'border-red-900/50 shadow-[inset_0_0_40px_rgba(220,38,38,0.4)]' : 'border-slate-800/50'}`}>
              <Visualizer analyser={analyserRef.current} active={connectionState === ConnectionState.CONNECTED} theme={isDemon ? 'red' : 'cyan'} />
              {isDemon && <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                <DemonUnicornOverlay className="w-48 h-48 text-red-500" />
              </div>}
            </div>

            <form onSubmit={handleManualTextSubmit} className="relative mt-4">
              <input 
                type="text" 
                value={manualInput} 
                onChange={(e) => setManualInput(e.target.value)} 
                placeholder={isDemon ? "INJECT_MALICIOUS_INPUT..." : "Direct system instruction..."} 
                className={`w-full border-2 rounded-2xl py-4 px-5 pl-14 text-sm font-mono transition-all outline-none ${
                    isDemon 
                    ? 'bg-black/95 border-red-600/50 text-red-100 placeholder-red-900/40 focus:border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.3)]' 
                    : 'bg-slate-950 border-slate-800 focus:border-cyan-500'
                }`} 
              />
              <Target className={`absolute left-5 top-4 w-6 h-6 animate-pulse ${isDemon ? 'text-red-600 drop-shadow-[0_0_12px_red]' : 'text-slate-600'}`} />
            </form>
          </div>

          {/* Real-time Allocation Metric */}
          <div className={`border-2 rounded-3xl p-8 flex flex-col items-center justify-center transition-all relative overflow-hidden min-h-[300px] ${
            isDemon ? 'bg-black/80 border-red-600/50 shadow-[0_0_50px_rgba(220,38,38,0.2)]' : 'bg-slate-900/50 border-slate-800'
          }`}>
            <span className={`text-[12px] font-black uppercase mb-6 tracking-[0.4em] font-mono ${isDemon ? 'text-red-500' : 'text-slate-500'}`}>NEURAL_STRIKE_LOAD</span>
            <div className={`text-8xl font-black font-mono transition-all duration-300 ${isDemon ? 'text-red-500 animate-pulse drop-shadow-[0_0_50px_red]' : 'text-cyan-400'}`}>
                {systemState.cpuLoad.toFixed(0)}<span className="text-2xl opacity-50">%</span>
            </div>
            {isDemon ? (
                <div className="mt-8 w-full h-3 bg-red-950/60 rounded-full overflow-hidden border border-red-600/30 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <div className="h-full bg-red-600 animate-pulse-fast shadow-[0_0_30px_red]" style={{ width: `${systemState.cpuLoad}%` }} />
                </div>
            ) : (
                <div className="mt-8 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${systemState.cpuLoad}%` }} />
                </div>
            )}
          </div>

          <GoogleAppsWidget />
        </div>

        {/* Lower Content Grid - Flexible scroll area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-0">
          <div className="lg:col-span-2 flex flex-col gap-8 overflow-y-auto scrollbar-hide pr-2">
            <StatsWidget state={systemState} history={history} onOverclock={(c) => setOverclockModal({isOpen: true, component: c})} onOpenThreats={() => setIsThreatMonitorOpen(true)} onOpenNetwork={() => setIsNetworkScannerOpen(true)} onOpenTelemetry={() => setIsTelemetryOpen(true)} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
              <ProcessList processes={systemState.processes} onSetPriority={() => {}} />
              <NetworkInterfacesWidget state={systemState} />
            </div>
          </div>
          <div className="h-full overflow-hidden flex flex-col">
            <TerminalLog logs={logs} isDemonMode={isDemon} />
          </div>
        </div>
      </main>

      {/* Persistent Floating Neural Command Button (Voice) */}
      <div className="fixed bottom-12 right-12 z-[100] group">
        <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse ${isDemon ? 'bg-red-600' : 'bg-cyan-500'}`} />
        <button 
          onClick={connectionState === ConnectionState.CONNECTED ? disconnect : connect}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-500 group-active:scale-95 ${
            isDemon 
            ? 'bg-[#100000] border-red-600 text-red-500 hover:border-white shadow-[0_0_50px_rgba(220,38,38,0.8)]' 
            : 'bg-slate-900 border-cyan-500 text-cyan-400 hover:border-white shadow-[0_0_30px_rgba(6,182,212,0.4)]'
          }`}
        >
          {connectionState === ConnectionState.CONNECTED ? (
             <div className="relative flex items-center justify-center">
                <div className={`absolute w-16 h-16 rounded-full border-2 animate-ping ${isDemon ? 'border-red-500' : 'border-cyan-500'}`} />
                {isDemon ? <Skull className="w-10 h-10 animate-glitch" /> : <Mic className="w-10 h-10 animate-pulse" />}
             </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
                {isDemon ? <Swords className="w-10 h-10" /> : <Power className="w-10 h-10" />}
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">{isDemon ? 'STRIKE' : 'CONNECT'}</span>
            </div>
          )}
        </button>
        {/* Tooltip */}
        <div className={`absolute right-full mr-6 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl border-2 backdrop-blur-xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 ${
          isDemon ? 'bg-red-950/90 border-red-600/50 text-red-500' : 'bg-slate-900/80 border-cyan-500/30 text-cyan-400'
        }`}>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black uppercase tracking-widest">{connectionState === ConnectionState.CONNECTED ? 'UPLINK_STABLE' : 'ESTABLISH_NEURAL_LINK'}</span>
             <span className="text-[8px] font-mono opacity-60">READY_FOR_VOICE_COMMAND</span>
          </div>
        </div>
      </div>

      {/* Global Bottom Status Bar - Stays at bottom */}
      <footer className={`h-10 border-t shrink-0 flex items-center px-10 gap-12 text-[10px] font-black font-mono uppercase tracking-[0.3em] transition-all z-[50] ${
          isDemon ? 'bg-red-950/98 border-red-600/60 text-red-600 drop-shadow-[0_-15px_30px_rgba(220,38,38,0.3)]' : 'bg-slate-900/80 border-slate-800 text-slate-500'
      }`}>
        <div className="flex items-center gap-3"><RefreshCw className={`w-3.5 h-3.5 ${isDemon ? 'animate-spin-slow text-red-500' : ''}`} /> NODE_STATUS::SYNCHRONIZED</div>
        <div className="flex items-center gap-3">KERNEL_LOAD::{(Math.random() * 20).toFixed(2)}%</div>
        <div className="flex items-center gap-3">NEURAL_ENTROPY::{(Math.random() * 10).toFixed(4)}</div>
        <div className="flex items-center gap-3 ml-auto text-xs">
            <span className={isDemon ? 'text-red-400 font-black animate-pulse' : 'text-emerald-500'}>UPTIME::{new Date().toLocaleTimeString()}</span>
            <div className="h-4 w-px bg-current opacity-20 mx-2" />
            <span>NEXUS_DEMON_OS_X9</span>
        </div>
      </footer>

      {/* Modals - Absolute on top */}
      <OverclockModal isOpen={overclockModal.isOpen} onClose={() => setOverclockModal(prev => ({...prev, isOpen: false}))} onApply={() => {}} component={overclockModal.component} currentValue={overclockModal.component === 'cpu' ? systemState.cpuFreq : systemState.gpuFreq} />
      <ThreatMonitorModal isOpen={isThreatMonitorOpen} onClose={() => setIsThreatMonitorOpen(false)} threats={systemState.threats} onAction={() => {}} onAnalyze={(id) => handleToolCall({ name: 'analyze_threat', args: { threatId: id } })} isDemon={isDemon} />
      <NetworkScannerModal isOpen={isNetworkScannerOpen} onClose={() => setIsNetworkScannerOpen(false)} devices={systemState.networkDevices} onExploit={handleExploitDevice} onScan={() => {}} isDemon={isDemon} />
      <TelemetryModal isOpen={isTelemetryOpen} onClose={() => setIsTelemetryOpen(false)} state={systemState} />
      <SystemInfoModal isOpen={isSystemInfoOpen} onClose={() => setIsSystemInfoOpen(false)} systemState={systemState} onBluetoothOverride={(id) => handleToolCall({ name: 'override_bluetooth', args: { deviceId: id } })} />
      <VirtualMachinePortal state={systemState} onClose={() => handleToolCall({ name: 'shutdown_virtual_os', args: {} })} onSwitchWorkspace={(w) => handleToolCall({ name: 'switch_virtual_workspace', args: { workspace: w } })} onOffensiveAction={(a) => handleToolCall({ name: 'execute_offensive_strike', args: { action: a } })} onDefensiveAction={(d) => handleToolCall({ name: 'engage_defensive_shield', animation: d })} />
      <AiPentestModal isOpen={systemState.pentestState.active} onClose={() => setSystemState(prev => ({ ...prev, pentestState: { ...prev.pentestState, active: false } }))} state={systemState.pentestState} isDemon={isDemon} />
    </div>
  );
}
