
import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ZAxis, LineChart, Line } from 'recharts';
import { Wifi, WifiOff, Bluetooth, BluetoothOff, Volume2, ShieldCheck, ShieldAlert, Activity, Cpu, HardDrive, Monitor, Zap, ZapOff, Thermometer, Lock, Globe, X, Terminal, Ghost, Radio, Keyboard, Settings, AlertTriangle, Smartphone, Hash, Layout, Server, Network, Disc, FolderOpen, Database, Eye, FileWarning, Bug, Scan, Target, Skull, Play, TerminalSquare, Gauge, Waves, Microchip, MoreVertical, FastForward, ChevronRight, Youtube, Mail, Cloud, Chrome, MapPin, Search, ExternalLink, Trash2, BrainCircuit, RefreshCw, Layers, Shield, ArrowUp, ArrowDown, Flame, Swords, Crosshair, Fingerprint, Info, Box, Cpu as CpuIcon, Maximize2, Power, Code, Database as DBIcon, Shield as SecurityIcon, Network as NetIcon, Signal, Radiation, Cross, Bomb, Shovel, Hammer, ShieldX, LifeBuoy, Radar as RadarIcon, Navigation, ScanEye, Biohazard, Binoculars, Wand2, Terminal as TermIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { SystemState, Process, Threat, NetworkDevice, ThreatAnalysis, BluetoothDevice } from '../types';
import { DemonUnicornOverlay } from '../App';

interface WidgetProps {
  state: SystemState;
  history: { time: string; cpu: number; memory: number; gpu?: number }[];
  onOverclock: (component: 'cpu' | 'gpu') => void;
  onOpenThreats: () => void;
  onOpenNetwork: () => void;
  onOpenTelemetry: () => void;
}

export const StatsWidget: React.FC<WidgetProps> = ({ state, history, onOverclock, onOpenThreats, onOpenNetwork, onOpenTelemetry }) => {
  const isDemon = state.demonModeActive;
  const isNethunter = state.nethunterActive;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
      <div className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg backdrop-blur-md relative overflow-hidden group transition-all duration-700 ${isDemon ? 'border-red-600/40 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : state.stabilityIndex < 80 ? 'border-red-900/50' : 'border-slate-800'}`}>
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${isDemon ? 'bg-red-600 animate-pulse' : state.stabilityIndex < 80 ? 'bg-red-600 animate-pulse' : 'bg-emerald-500'}`} />
        <div className="flex justify-between items-start mb-3">
          <div className={isDemon ? 'animate-glitch-subtle' : ''}>
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] block ${isDemon ? 'text-red-500 font-black' : 'text-slate-500'}`}>
                  {isDemon ? 'NEURAL_INTEGRITY' : 'Core Integrity'}
              </span>
              <div className="flex items-center gap-1 mt-1">
                {isDemon ? <Flame className="w-3 h-3 text-red-500 animate-bounce" /> : <BrainCircuit className={`w-3 h-3 ${state.stabilityIndex < 80 ? 'text-red-500' : 'text-emerald-500'}`} />}
                <span className={`text-[9px] font-mono ${isDemon ? 'text-red-300' : state.stabilityIndex < 80 ? 'text-red-400' : 'text-slate-500'}`}>
                    {isDemon ? 'OVERDRIVE_ENGAGED' : 'OS Autonomic Level'}
                </span>
              </div>
          </div>
          <RefreshCw className={`w-5 h-5 ${isDemon ? 'text-red-600 animate-spin-slow' : state.stabilityIndex < 90 ? 'text-emerald-400 animate-spin' : 'text-slate-800'}`} />
        </div>
        <div className={`text-3xl font-black font-mono mt-2 ${isDemon ? 'text-red-500 drop-shadow-[0_0_10px_red] animate-glitch-subtle' : state.stabilityIndex < 80 ? 'text-red-500' : 'text-white'}`}>
            {state.stabilityIndex.toFixed(0)}%
        </div>
        <div className="w-full bg-slate-800/30 h-1.5 rounded-full mt-5 overflow-hidden border border-white/5">
            <div 
                className={`h-full transition-all duration-1000 ${isDemon ? 'bg-red-600 shadow-[0_0_10px_red]' : state.stabilityIndex < 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                style={{ width: `${state.stabilityIndex}%` }}
            />
        </div>
      </div>

      <div className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg backdrop-blur-md relative overflow-hidden group transition-all duration-700 ${isDemon ? 'border-red-600/40' : isNethunter ? 'border-red-900/30' : 'border-slate-800'}`}>
        <div className="flex justify-between items-start mb-3">
          <div className={isDemon ? 'animate-glitch-subtle' : ''}>
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] block ${isDemon ? 'text-red-500' : 'text-slate-500'}`}>CPU_CORE_FREQ</span>
              <div className="flex items-center gap-1 mt-1">
                <Zap className={`w-3 h-3 ${isDemon ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className={`text-[9px] font-mono ${isDemon ? 'text-red-300 font-bold' : 'text-cyan-300'}`}>{state.cpuFreq.toFixed(2)} GHz</span>
              </div>
          </div>
          <div className={`flex gap-2`}>
             <button onClick={() => onOverclock('cpu')} className={`transition-colors z-10 ${isDemon ? 'text-red-900 hover:text-red-500' : 'text-slate-600 hover:text-cyan-400'}`}>
                <Settings className="w-4 h-4" />
             </button>
             {isDemon ? <Skull className="w-5 h-5 text-red-600" /> : <Cpu className="w-5 h-5 text-cyan-400" />}
          </div>
        </div>
        <div className={`text-3xl font-black mb-1 font-mono mt-2 ${isDemon ? 'text-red-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' : 'text-white'}`}>{state.cpuLoad.toFixed(1)}%</div>
        <div className="h-14 w-full mt-3 cursor-pointer" onClick={onOpenTelemetry}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <Area type="monotone" dataKey="cpu" stroke={isDemon ? "#dc2626" : "#22d3ee"} strokeWidth={3} fillOpacity={0} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg backdrop-blur-md relative overflow-hidden group transition-all duration-700 ${isDemon ? 'border-red-600/40' : 'border-slate-800'}`}>
        <div className="flex justify-between items-start mb-3">
          <div className={isDemon ? 'animate-glitch-subtle' : ''}>
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] block ${isDemon ? 'text-red-500' : 'text-slate-500'}`}>GPU_THRUPUT</span>
              <div className="flex items-center gap-1 mt-1">
                <Zap className={`w-3 h-3 ${isDemon ? 'text-red-500' : 'text-yellow-500'}`} />
                <span className={`text-[9px] font-mono ${isDemon ? 'text-red-300 font-bold' : 'text-pink-300'}`}>{state.gpuFreq} MHz</span>
              </div>
          </div>
           <div className={`flex gap-2`}>
             <button onClick={() => onOverclock('gpu')} className={`transition-colors z-10 ${isDemon ? 'text-red-900 hover:text-red-500' : 'text-slate-600 hover:text-pink-400'}`}>
                <Settings className="w-4 h-4" />
             </button>
             {isDemon ? <Swords className="w-5 h-5 text-red-600" /> : <Monitor className="w-5 h-5 text-pink-400" />}
          </div>
        </div>
        <div className={`text-3xl font-black font-mono mt-2 ${isDemon ? 'text-red-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' : 'text-white'}`}>{state.gpuLoad.toFixed(1)}%</div>
        <div className="h-14 w-full mt-3 cursor-pointer" onClick={onOpenTelemetry}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <Area type="monotone" dataKey="gpu" stroke={isDemon ? "#991b1b" : "#f472b6"} strokeWidth={3} fillOpacity={0} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg backdrop-blur-md relative overflow-hidden group transition-all duration-700 ${isDemon ? 'border-red-600/40 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'border-slate-800'}`}>
        <div className="flex justify-between items-start mb-3" onClick={onOpenNetwork}>
          <div className={isDemon ? 'animate-glitch-subtle' : ''}>
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] block ${isDemon ? 'text-red-500 font-black' : 'text-slate-500'}`}>NODE_RECON</span>
              <div className="flex items-center gap-1 mt-1">
                <Activity className={`w-3 h-3 ${isDemon ? 'text-red-500' : 'text-purple-400'}`} />
                <span className={`text-[9px] font-mono ${isDemon ? 'text-red-300 font-bold' : 'text-purple-300'}`}>{state.networkDevices.length} Targets Found</span>
              </div>
          </div>
          {isDemon ? <Radiation className={`w-5 h-5 text-red-600 animate-pulse`} /> : <Network className="w-5 h-5 text-purple-400" />}
        </div>
        <div className={`text-3xl font-black mb-1 font-mono mt-2 ${isDemon ? 'text-red-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' : 'text-white'}`}>{state.memoryUsage.toFixed(1)}%</div>
        <div className="h-14 w-full mt-3 cursor-pointer" onClick={onOpenNetwork}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <Area type="monotone" dataKey="memory" stroke={isDemon ? "#7f1d1d" : "#c084fc"} strokeWidth={3} fillOpacity={0} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const NetworkInterfacesWidget: React.FC<{ state: SystemState }> = ({ state }) => {
  const isDemon = state.demonModeActive;
  const [expandedIface, setExpandedIface] = useState<string | null>(state.networkInterfaces[0]?.name || null);
  
  return (
    <div className={`bg-slate-900/60 border border-slate-800 rounded-3xl p-6 overflow-hidden flex flex-col h-full transition-all duration-500 ${isDemon ? 'border-red-600/30' : ''}`}>
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <NetIcon className={`w-4 h-4 ${isDemon ? 'text-red-500 animate-pulse' : 'text-cyan-500'}`} /> INTERFACE_TRAFFIC_LIVE
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
        {state.networkInterfaces.map(iface => {
          const isExpanded = expandedIface === iface.name;
          return (
            <div key={iface.name} 
              onClick={() => setExpandedIface(isExpanded ? null : iface.name)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                isDemon 
                  ? `${isExpanded ? 'bg-red-950/20 border-red-500/50' : 'bg-red-950/10 border-red-900/20'} hover:border-red-500/40 hover:scale-[1.01]` 
                  : `${isExpanded ? 'bg-slate-900/60 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-slate-950/40 border-slate-800/50'} hover:border-slate-700 hover:scale-[1.01]`
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    {iface.status === 'UP' && (
                      <div className={`absolute inset-0 rounded-full animate-ping-slow opacity-60 ${isDemon ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    )}
                    <div className={`relative w-2 h-2 rounded-full transition-all duration-500 ${
                      iface.status === 'UP' 
                        ? `${isDemon ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]` 
                        : 'bg-slate-800 opacity-30'
                    }`} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-black uppercase transition-colors ${isExpanded ? 'text-white' : 'text-slate-400'}`}>{iface.name}</span>
                    <span className="text-[8px] font-mono text-slate-500">{iface.ip}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <ArrowDown className={`w-2.5 h-2.5 ${isDemon ? 'text-red-500' : 'text-emerald-500'} ${parseInt(iface.downSpeed) > 0 ? 'animate-bounce' : ''}`} />
                      <span className={`text-[10px] font-mono font-bold ${isDemon ? 'text-red-400' : 'text-emerald-400'}`}>{iface.downSpeed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUp className={`w-2.5 h-2.5 ${isDemon ? 'text-red-400' : 'text-cyan-400'} ${parseInt(iface.upSpeed) > 0 ? 'animate-bounce' : ''}`} />
                      <span className={`text-[10px] font-mono font-bold ${isDemon ? 'text-red-300' : 'text-cyan-300'}`}>{iface.upSpeed}</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-600" /> : <ChevronDown className="w-4 h-4 text-slate-800" />}
                </div>
              </div>
              
              <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                {iface.status === 'UP' && state.networkHistory[iface.name] && (
                  <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={state.networkHistory[iface.name]}>
                        <Line 
                          type="monotone" 
                          dataKey="down" 
                          stroke={isDemon ? "#dc2626" : "#10b981"} 
                          strokeWidth={2} 
                          dot={false} 
                          isAnimationActive={false} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="up" 
                          stroke={isDemon ? "#991b1b" : "#06b6d4"} 
                          strokeWidth={2} 
                          dot={false} 
                          isAnimationActive={false} 
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> TX_TOTAL: {iface.tx}</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> RX_TOTAL: {iface.rx}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const GoogleAppsWidget: React.FC = () => {
    const apps = [
        { name: 'Search', icon: Search, color: 'text-blue-400', url: 'https://www.google.com' },
        { name: 'Maps', icon: MapPin, color: 'text-green-400', url: 'https://maps.google.com' },
        { name: 'YouTube', icon: Youtube, color: 'text-red-500', url: 'https://www.youtube.com' },
        { name: 'Gmail', icon: Mail, color: 'text-slate-200', url: 'https://mail.google.com' },
        { name: 'Drive', icon: Cloud, color: 'text-amber-400', url: 'https://drive.google.com' },
        { name: 'Chrome', icon: Chrome, color: 'text-blue-500', url: 'https://www.google.com/chrome' },
    ];

    return (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl backdrop-blur-xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" /> NEURAL_SERVICES_HUB
            </h3>
            <div className="grid grid-cols-3 gap-4 flex-1">
                {apps.map((app) => (
                    <button 
                        key={app.name}
                        onClick={() => window.open(app.url, '_blank')}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-500 hover:bg-slate-800/60 transition-all group shadow-inner"
                    >
                        <app.icon className={`w-8 h-8 ${app.color} group-hover:scale-125 transition-transform mb-2.5 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
                        <span className="text-[10px] font-bold font-mono text-slate-600 group-hover:text-slate-200 tracking-tighter">{app.name.toUpperCase()}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export const VirtualMachinePortal: React.FC<{ 
    state: SystemState; 
    onClose: () => void; 
    onSwitchWorkspace: (w: any) => void;
    onOffensiveAction?: (action: string) => void;
    onDefensiveAction?: (protocol: string) => void;
}> = ({ state, onClose, onSwitchWorkspace, onOffensiveAction, onDefensiveAction }) => {
    if (!state.vmState.isOpen) return null;
    const isDemon = state.demonModeActive;
    const isBooting = state.vmState.status === 'BOOTING';
    const workspace = state.vmState.activeWorkspace;
    const isDemonOS = state.vmState.osName === 'DemonOS' || isDemon;

    const guestApps = [
        { id: 'GENERAL', icon: Monitor, label: 'Desktop' },
        { id: 'API_INTEL', icon: NetIcon, label: 'API Intel' },
        { id: 'RECON', icon: Target, label: 'Recon' },
        { id: 'NEURAL_DEV', icon: BrainCircuit, label: 'Neural' },
    ];

    const offensiveActions = [
        { id: 'PACKET_STORM', label: 'Packet Storm', icon: Radiation },
        { id: 'NEURAL_HIJACK', label: 'Neural Hijack', icon: Skull },
        { id: 'CRED_HARVEST', label: 'Cred Harvest', icon: Target },
        { id: 'IO_FLOOD', label: 'I/O Flood', icon: Bomb },
    ];

    const defensiveActions = [
        { id: 'ISOLATION', label: 'Isolation', icon: Lock },
        { id: 'ENTROPY_SCRAMBLE', label: 'Scramble', icon: Zap },
        { id: 'KERNEL_LOCK', label: 'Lockdown', icon: Shield },
        { id: 'PURGE', label: 'Full Purge', icon: Shovel },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-3xl animate-in zoom-in-95 duration-500">
             <div className={`relative w-full max-w-7xl h-full flex flex-col rounded-3xl border shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 ${
                 isDemonOS ? 'bg-[#050000] border-red-600 shadow-[0_0_80px_rgba(220,38,38,0.5)]' : 'bg-slate-950 border-cyan-500/30'
             }`}>
                {/* Hypervisor Header */}
                <div className={`p-5 border-b flex justify-between items-center ${isDemonOS ? 'bg-red-950/40 border-red-900/50' : 'bg-slate-900/50 border-slate-800'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl ${isDemonOS ? 'bg-red-600 text-white animate-glitch shadow-[0_0_20px_rgba(255,0,0,0.5)]' : 'bg-cyan-500 text-slate-950'}`}>
                            <Box className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className={`text-base font-black font-mono tracking-tighter uppercase ${isDemonOS ? 'text-red-500 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]' : 'text-cyan-400'}`}>
                                {isDemonOS ? 'DemonOS Tactical Core' : state.vmState.osName || 'HYPERVISOR_PRIMARY'}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${isDemonOS ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-emerald-500'}`} />
                                <p className={`text-[11px] font-mono uppercase tracking-[0.2em] ${isDemonOS ? 'text-red-700 font-black' : 'text-slate-500'}`}>HIVE_CORE: SYNCED</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {isDemonOS && <div className="px-4 py-1.5 rounded-lg bg-red-950/50 border border-red-800 text-[10px] font-black text-red-500 animate-pulse uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(220,38,38,0.2)]">Full Offensive Overlay</div>}
                        <button onClick={onClose} className={`p-3 rounded-2xl transition-all ${isDemonOS ? 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(255,0,0,0.3)]' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                            <Power className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden relative">
                    {/* Watermark for Demon Mode Background */}
                    {isDemonOS && !isBooting && (
                        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.05] animate-float">
                            <DemonUnicornOverlay className="w-[1100px] h-auto text-red-600" />
                        </div>
                    )}

                    {/* Guest OS Sidebar */}
                    {!isBooting && (
                        <div className={`w-24 md:w-28 border-r flex flex-col items-center py-8 gap-8 transition-all relative z-10 ${isDemonOS ? 'bg-red-950/20 border-red-900/30' : 'bg-slate-900/20 border-slate-800/50'}`}>
                            {guestApps.map((app) => (
                                <button 
                                    key={app.id} 
                                    onClick={() => onSwitchWorkspace(app.id)}
                                    className={`flex flex-col items-center gap-2 group transition-all ${workspace === app.id ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
                                >
                                    <div className={`p-4 rounded-3xl border transition-all ${
                                        workspace === app.id 
                                            ? isDemonOS ? 'bg-red-600 border-red-400 shadow-[0_0_25px_rgba(220,38,38,0.6)]' : 'bg-cyan-500 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                                            : isDemonOS ? 'bg-red-950/50 border-red-900/50' : 'bg-slate-950 border-slate-800'
                                    }`}>
                                        <app.icon className={`w-6 h-6 ${workspace === app.id ? 'text-white' : isDemonOS ? 'text-red-900' : 'text-slate-500'}`} />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">{app.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* VM Main Viewport */}
                    <div className="flex-1 relative bg-black overflow-hidden group z-10">
                        <div className={`absolute inset-0 pointer-events-none z-10 scanline ${isDemonOS ? 'opacity-40' : 'opacity-10'}`} />
                        {isBooting ? (
                            <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
                                {isDemonOS && (
                                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none animate-in zoom-in-50 duration-1000 opacity-20">
                                        <DemonUnicornOverlay className="w-[650px] h-auto text-red-600 animate-pulse" />
                                    </div>
                                )}
                                <div className={`relative z-10 flex flex-col p-10 font-mono text-xs space-y-1 w-full max-w-2xl ${isDemonOS ? 'text-red-500' : 'text-white'}`}>
                                    <p className="opacity-50">NexusTactical v9.0.1_DEMON_CORE</p>
                                    <p>Mounting offensive ROM...</p>
                                    <p className="text-emerald-500 animate-pulse">[ OK ] RF_HIVE_INIT</p>
                                    <p className="text-emerald-500 animate-pulse">[ OK ] GHOST_VPN_READY</p>
                                    <p className="text-emerald-500 animate-pulse">[ OK ] NEURAL_BRIDGE_STABLE</p>
                                    <p className="animate-pulse pt-4">Engaging DemonOS Hypervisor...</p>
                                    {isDemonOS && (
                                        <div className="mt-10 p-8 border-2 border-red-600 bg-red-950/60 rounded-2xl animate-glitch backdrop-blur-xl shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                                            <Skull className="w-16 h-16 text-red-500 mb-6 animate-bounce" />
                                            <p className="font-black text-red-500 text-2xl uppercase tracking-tighter">Demon Mode Active</p>
                                            <p className="text-sm text-red-300 mt-3 leading-relaxed opacity-80 font-mono">Offensive hypervisor is running with root access. Neural strike modules primed. All safety protocols bypassed by kernel command.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={`h-full w-full flex flex-col p-6 animate-in fade-in duration-1000 ${isDemonOS ? 'text-red-500' : 'text-cyan-400'}`}>
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
                                    {/* Left Tactical Map */}
                                    <div className={`lg:col-span-4 rounded-3xl border p-6 flex flex-col transition-all relative overflow-hidden ${isDemonOS ? 'bg-red-950/20 border-red-600/50 shadow-[inset_0_0_40px_rgba(220,38,38,0.2)]' : 'bg-slate-900/40 border-slate-800'}`}>
                                        <div className="flex items-center justify-between mb-6 font-mono text-[11px] uppercase tracking-[0.2em] font-black opacity-80 border-b border-white/5 pb-3">
                                            <div className="flex items-center gap-2"><Target className="w-4 h-4" /> Tactical Recon Map</div>
                                            <div className="flex gap-3">
                                                <span className="flex items-center gap-1.5 text-emerald-500"><Wifi className="w-3 h-3" /> {state.networkDevices.length}</span>
                                                <span className="flex items-center gap-1.5 text-blue-500"><Bluetooth className="w-3 h-3" /> {state.bluetoothSignals.length}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Visual Radar Decor for Demon Mode */}
                                        {isDemonOS && (
                                            <div className="relative aspect-square w-full rounded-full border-2 border-red-900/30 mb-6 flex items-center justify-center overflow-hidden bg-black/40">
                                                <div className="absolute inset-0 radar-line opacity-40 animate-radar-sweep origin-center" style={{ left: '50%', width: '50%' }} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-[85%] h-[85%] rounded-full border border-red-900/20" />
                                                    <div className="w-[65%] h-[65%] rounded-full border border-red-900/20" />
                                                    <div className="w-[45%] h-[45%] rounded-full border border-red-900/20" />
                                                    <div className="w-[25%] h-[25%] rounded-full border border-red-900/30" />
                                                </div>
                                                <Crosshair className="w-12 h-12 text-red-600/40 animate-pulse" />
                                                
                                                {/* Simulated active nodes on radar */}
                                                <div className="absolute top-[20%] left-[30%] w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_15px_red] animate-ping" />
                                                <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-red-400 rounded-full shadow-[0_0_10px_red] animate-pulse" />
                                                <div className="absolute bottom-[25%] left-[45%] w-2.5 h-2.5 bg-emerald-500/60 rounded-full" />
                                            </div>
                                        )}

                                        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                                            {state.networkDevices.map(dev => (
                                                <div key={dev.ip} className={`p-3.5 rounded-2xl border transition-all cursor-pointer group ${isDemonOS ? 'border-red-900/30 bg-red-950/50 hover:border-red-500 shadow-sm' : 'border-slate-800 bg-slate-900/40 hover:border-cyan-500'}`}>
                                                    <div className="flex justify-between items-start mb-1.5">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-xl ${isDemonOS ? 'bg-red-950/20 text-red-500' : 'bg-slate-800 text-slate-400'}`}><Globe className="w-4 h-4" /></div>
                                                            <span className="text-[11px] font-black tracking-tight">{dev.hostname}</span>
                                                        </div>
                                                        <span className={`text-[9px] font-mono font-bold ${isDemonOS ? 'text-red-900' : 'text-slate-600'}`}>{dev.ip}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Middle & Right Main Workspace */}
                                    <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                                            {/* Tactical Terminal */}
                                            <div className={`rounded-3xl border p-6 flex flex-col transition-all relative overflow-hidden ${isDemonOS ? 'bg-red-950/20 border-red-600/50 shadow-[0_0_30px_rgba(0,0,0,0.6)]' : 'bg-slate-900/40 border-slate-800'}`}>
                                                <div className="flex items-center gap-3 mb-4 font-mono text-[11px] uppercase tracking-[0.2em] font-black opacity-80 border-b border-white/5 pb-3">
                                                    <TerminalSquare className="w-4 h-4" /> Tactical Shell // demon@os
                                                </div>
                                                <div className={`flex-1 font-mono text-[11px] space-y-1.5 overflow-y-auto scrollbar-hide ${isDemonOS ? 'text-red-400/80' : 'text-cyan-400/80'}`}>
                                                    <p className="text-emerald-500/60">> iana_recon --aggressive --neural</p>
                                                    <p className={isDemonOS ? 'text-red-500 font-bold' : 'text-cyan-500'}>[!] STAGE_1: NODE_MAP_ACQUIRED</p>
                                                    <p className={isDemonOS ? 'text-red-600' : 'text-cyan-600'}>[!] STAGE_2: TARGET_LOCK_ESTABLISHED</p>
                                                    <p className="opacity-40 text-[10px]">0x{Math.random().toString(16).substr(2, 6).toUpperCase()} intercept_kernel_sys_calls</p>
                                                    <p className="opacity-40 text-[10px]">0x{Math.random().toString(16).substr(2, 6).toUpperCase()} bypass_auth_v3_gate</p>
                                                    <p className="opacity-40 text-[10px]">0x{Math.random().toString(16).substr(2, 6).toUpperCase()} route_traffic_encrypted_tunnel</p>
                                                    <div className="mt-4 p-3 rounded-xl bg-red-900/10 border border-red-900/30 animate-pulse">
                                                        <p className="text-red-600 font-black uppercase tracking-[0.3em] text-[9px]">Incoming API Intel Stream...</p>
                                                        <p className="text-red-400/50 text-[10px] mt-1">HASH: 2F41_AC9D_B742_FF10_X99</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Command Modules */}
                                            <div className="flex flex-col gap-6">
                                                <div className={`p-6 rounded-3xl border flex-1 flex flex-col transition-all duration-500 ${isDemonOS ? 'bg-red-950/30 border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.1)]' : 'bg-slate-900/40 border-slate-800'}`}>
                                                    <h4 className={`text-[10px] font-black uppercase mb-4 flex items-center gap-2 tracking-[0.3em] ${isDemonOS ? 'text-red-600' : 'text-cyan-600'}`}>
                                                        <Swords className="w-4 h-4" /> Strike Command
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-3 flex-1">
                                                        {offensiveActions.map(action => (
                                                            <button 
                                                                key={action.id}
                                                                onClick={() => onOffensiveAction?.(action.id)}
                                                                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all group shadow-sm ${
                                                                    isDemonOS 
                                                                        ? 'border-red-900/40 bg-red-950/50 hover:bg-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                                                                        : 'border-slate-800 bg-slate-900 hover:bg-cyan-500 hover:text-slate-950'
                                                                }`}
                                                            >
                                                                <action.icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                                                                <span className="text-[10px] font-black uppercase tracking-tighter">{action.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className={`p-6 rounded-3xl border flex-1 flex flex-col transition-all duration-500 ${isDemonOS ? 'bg-red-950/30 border-blue-900/40 shadow-[0_0_30px_rgba(30,58,138,0.1)]' : 'bg-slate-900/40 border-slate-800'}`}>
                                                    <h4 className={`text-[10px] font-black uppercase mb-4 flex items-center gap-2 tracking-[0.3em] ${isDemonOS ? 'text-blue-600' : 'text-purple-600'}`}>
                                                        <ShieldX className="w-4 h-4" /> Shield Protocol
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-3 flex-1">
                                                        {defensiveActions.map(action => (
                                                            <button 
                                                                key={action.id}
                                                                onClick={() => onDefensiveAction?.(action.id)}
                                                                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all group shadow-sm ${
                                                                    isDemonOS 
                                                                        ? 'border-blue-900/40 bg-blue-950/30 hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(30,58,138,0.5)]' 
                                                                        : 'border-slate-800 bg-slate-900 hover:bg-purple-500 hover:text-white'
                                                                }`}
                                                            >
                                                                <action.icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                                                                <span className="text-[10px] font-black uppercase tracking-tighter">{action.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`h-12 border-t flex items-center px-6 gap-10 text-[10px] font-mono uppercase tracking-[0.3em] font-black transition-colors ${isDemonOS ? 'bg-red-950/80 border-red-900/50 text-red-900' : 'bg-slate-900/40 border-slate-800 text-slate-500'}`}>
                    <div className="flex items-center gap-2"><RefreshCw className={`w-4 h-4 ${isDemonOS ? 'animate-spin-slow' : ''}`} /> TACTICAL_SHELL_V9</div>
                    <div className="flex items-center gap-2">KERNEL_LOAD: {(Math.random() * 15).toFixed(2)}%</div>
                    <div className="flex items-center gap-2 ml-auto">HYPERVISOR_STATUS: <span className={isBooting ? 'text-yellow-600' : 'text-emerald-600'}>{isBooting ? 'BOOTING' : 'SYNCED'}</span></div>
                </div>
             </div>
        </div>
    );
};

// Generic Modal Wrapper used across dashboard features
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; isDemon?: boolean }> = ({ isOpen, onClose, title, children, isDemon }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className={`relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
                isDemon ? 'bg-[#0a0000] border-red-600/50 shadow-[0_0_50px_rgba(220,38,38,0.3)]' : 'bg-slate-950 border-slate-800'
            }`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDemon ? 'bg-red-950/20 border-red-900/50' : 'bg-slate-900/40 border-slate-800'}`}>
                    <h3 className={`text-sm font-black font-mono tracking-widest uppercase ${isDemon ? 'text-red-500' : 'text-slate-300'}`}>{title}</h3>
                    <button onClick={onClose} className={`p-2 rounded-xl transition-all ${isDemon ? 'hover:bg-red-600 text-red-500 hover:text-white' : 'hover:bg-slate-800 text-slate-500'}`}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Component to list active system processes
export const ProcessList: React.FC<{ processes: Process[]; onSetPriority: (id: number, p: any) => void }> = ({ processes }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 overflow-hidden flex flex-col h-full">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-500" /> ACTIVE_PROCESSES
        </h3>
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {processes.map(proc => (
                <div key={proc.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/50 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-slate-600 w-12">PID {proc.id}</span>
                        <span className="text-[11px] font-black uppercase text-slate-300">{proc.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{proc.status}</span>
                        <span className="text-[11px] font-mono text-cyan-400 w-16 text-right">{proc.cpu.toFixed(1)}% CPU</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

// Modal for adjusting CPU/GPU clock speeds
export const OverclockModal: React.FC<{ isOpen: boolean; onClose: () => void; onApply: () => void; component: 'cpu' | 'gpu'; currentValue: number }> = ({ isOpen, onClose, onApply, component, currentValue }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`${component.toUpperCase()} OVERCLOCKING`}>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-slate-500 uppercase mb-1">Target Frequency</p>
                        <p className="text-4xl font-black font-mono text-white">{currentValue} <span className="text-sm opacity-50">{component === 'cpu' ? 'GHz' : 'MHz'}</span></p>
                    </div>
                    <div className="text-emerald-500 flex items-center gap-1 font-mono text-xs">
                        <Zap className="w-4 h-4" /> STABLE
                    </div>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">Warning: Manual frequency adjustment may lead to system instability, thermal throttling, or hardware damage. Kernel safeguards are currently active.</p>
                <button onClick={onApply} className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    Apply Profile
                </button>
            </div>
        </Modal>
    );
};

// Modal for visualizing and acting on active security threats
export const ThreatMonitorModal: React.FC<{ isOpen: boolean; onClose: () => void; threats: Threat[]; onAction: () => void; onAnalyze: (id: string) => void; isDemon: boolean }> = ({ isOpen, onClose, threats, onAnalyze, isDemon }) => {
    const getSeverityStyles = (severity: Threat['severity']) => {
        switch (severity) {
            case 'CRITICAL': return 'bg-red-600/10 border-red-600/50 text-red-500';
            case 'HIGH': return 'bg-orange-600/10 border-orange-600/50 text-orange-500';
            case 'MEDIUM': return 'bg-yellow-600/10 border-yellow-600/50 text-yellow-500';
            case 'LOW': return 'bg-blue-600/10 border-blue-600/50 text-blue-500';
            default: return 'bg-slate-900/40 border-slate-800 text-slate-400';
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Active Threat Matrix" isDemon={isDemon}>
            <div className="space-y-4">
                {threats.map(threat => {
                    const sevStyles = getSeverityStyles(threat.severity);
                    return (
                        <div key={threat.id} className={`p-4 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${sevStyles} ${
                            isDemon ? 'hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'hover:shadow-lg'
                        }`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-black/40 ${threat.severity === 'CRITICAL' ? 'animate-pulse' : ''}`}>
                                    {threat.severity === 'CRITICAL' ? <Radiation className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className={`text-xs font-black uppercase tracking-tight flex items-center gap-2`}>
                                        {threat.type} :: {threat.id}
                                        <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-current font-bold uppercase tracking-widest">{threat.severity}</span>
                                    </p>
                                    <p className="text-[10px] opacity-70 mt-1">{threat.description}</p>
                                </div>
                            </div>
                            <button onClick={() => onAnalyze(threat.id)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                isDemon ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'bg-slate-800 text-slate-300 hover:text-white'
                            }`}>Analyze</button>
                        </div>
                    );
                })}
            </div>
        </Modal>
    );
};

// Modal for scanning and interacting with network nodes
export const NetworkScannerModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    devices: NetworkDevice[]; 
    onExploit: (ip: string) => void; 
    onScan: () => void; 
    isDemon: boolean 
}> = ({ isOpen, onClose, devices, onExploit, isDemon }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Network Topology Scan" isDemon={isDemon}>
            <div className="space-y-4">
                <div className="flex gap-4 mb-4">
                    <button className="flex-1 py-3 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Full Rescan</button>
                    <button className="flex-1 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-500/30 transition-all">Neural Mapping</button>
                </div>
                {devices.map(dev => (
                    <div key={dev.ip} className={`p-4 rounded-2xl border flex items-center justify-between group transition-all duration-300 ${
                        isDemon 
                          ? dev.compromised ? 'bg-red-950/60 border-red-500/80 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'bg-red-950/20 border-red-900/30 hover:border-red-500' 
                          : dev.compromised ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/30'
                    }`}>
                        <div className="flex items-center gap-4">
                            {dev.compromised ? <Skull className="w-5 h-5 text-red-500 animate-pulse" /> : <Globe className={`w-5 h-5 ${isDemon ? 'text-red-500' : 'text-cyan-400'}`} />}
                            <div>
                                <p className={`text-xs font-black ${dev.compromised ? 'text-red-400' : 'text-slate-200'}`}>{dev.hostname}</p>
                                <p className="text-[10px] font-mono text-slate-500">{dev.ip} // {dev.os}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            {dev.compromised ? (
                                <div className="flex flex-col items-end">
                                  <span className="bg-red-500/20 text-red-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse border border-red-500/30">Compromised</span>
                                  <span className="text-[9px] font-mono text-red-900 mt-1 uppercase">Node Controlled</span>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => onExploit(dev.ip)}
                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                        isDemon 
                                            ? 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                                            : 'bg-slate-800 text-slate-400 hover:text-cyan-400'
                                    }`}
                                >
                                    Exploit
                                </button>
                            )}
                            <div className="flex flex-col items-end border-l border-white/5 pl-3">
                                {dev.vulnerabilities.length > 0 && !dev.compromised && <span className="bg-red-500/20 text-red-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase mb-1">Vuln</span>}
                                <span className={`${dev.compromised ? 'text-red-900' : 'text-emerald-500'} text-[10px] font-mono`}>{dev.latency}ms</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

// Modal for deep neural and hardware telemetry charts
export const TelemetryModal: React.FC<{ isOpen: boolean; onClose: () => void; state: SystemState }> = ({ isOpen, onClose, state }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Advanced Neural Telemetry">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4">Memory Allocation Efficiency</h4>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[{v: state.memoryUsage}]}>
                                <Bar dataKey="v" fill="#c084fc" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4">Core Thermal Distribution</h4>
                    <div className="flex items-center justify-center h-40">
                         <div className="text-4xl font-black font-mono text-white">{state.temperature}°C</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

// Modal for general system information and radio signal overrides
export const SystemInfoModal: React.FC<{ isOpen: boolean; onClose: () => void; systemState: SystemState; onBluetoothOverride: (id: string) => void }> = ({ isOpen, onClose, systemState, onBluetoothOverride }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="System Configuration Intel">
            <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Architecture</p>
                        <p className="text-sm font-bold text-slate-300">ARMv9-A Neural Core</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Hypervisor</p>
                        <p className="text-sm font-bold text-slate-300">Nexus-v9_X</p>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase mb-4 flex items-center gap-2">
                        <Bluetooth className="w-4 h-4" /> Nearby Signals
                    </h4>
                    <div className="space-y-2">
                        {systemState.bluetoothSignals.map(sig => (
                            <div key={sig.id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Radio className={`w-4 h-4 ${sig.isOverridden ? 'text-red-500' : 'text-slate-500'}`} />
                                    <span className="text-[11px] font-bold text-slate-300">{sig.name}</span>
                                </div>
                                <button 
                                    onClick={() => onBluetoothOverride(sig.id)}
                                    className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                                        sig.isOverridden ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {sig.isOverridden ? 'HIJACKED' : 'OVERRIDE'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

// Modal for tracking AI-powered penetration testing progress
export const AiPentestModal: React.FC<{ isOpen: boolean; onClose: () => void; state: any; isDemon: boolean }> = ({ isOpen, onClose, state, isDemon }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Neural Strike Operation" isDemon={isDemon}>
            <div className="space-y-6">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <p className="text-xs text-slate-500 uppercase mb-1">Target Identity</p>
                        <p className={`text-xl font-black font-mono ${isDemon ? 'text-red-500' : 'text-white'}`}>{state.target}</p>
                    </div>
                    <div className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isDemon ? 'bg-red-600/20 text-red-500 border border-red-600/40' : 'bg-cyan-500/20 text-cyan-400'}`}>
                        Phase: {state.phase}
                    </div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                        <span>Propagation Efficiency</span>
                        <span>{state.progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${isDemon ? 'bg-red-600 shadow-[0_0_15px_red]' : 'bg-cyan-500'}`} style={{ width: `${state.progress}%` }} />
                    </div>
                </div>

                <div className={`p-4 rounded-2xl border font-mono text-[10px] h-48 overflow-y-auto scrollbar-hide ${
                    isDemon ? 'bg-black/60 border-red-900/30 text-red-400/80' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                    {state.logs.map((log: string, i: number) => (
                        <div key={i} className="mb-1">{'>'} {log}</div>
                    ))}
                </div>

                {state.discoveredVulns.length > 0 && (
                    <div className="space-y-3">
                        <h5 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Discovered Vulnerabilities</h5>
                        {state.discoveredVulns.map((v: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 flex justify-between items-center">
                                <span className="text-[10px] font-black text-red-400">{v.cve}</span>
                                <span className="text-[8px] font-black uppercase text-red-600 bg-red-600/10 px-2 py-0.5 rounded-full">{v.severity}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};
