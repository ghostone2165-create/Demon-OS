
import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { Terminal, ChevronRight } from 'lucide-react';

interface TerminalLogProps {
  logs: LogEntry[];
  isDemonMode?: boolean;
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs, isDemonMode = false }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={`border rounded-xl overflow-hidden flex flex-col h-full font-mono shadow-2xl relative transition-all duration-500 ${
        isDemonMode ? 'bg-[#1a0000] border-red-600/50' : 'bg-[#0c0c14] border-slate-800'
    }`}>
      <div className={`px-4 py-2 border-b flex justify-between items-center transition-colors ${
          isDemonMode ? 'bg-red-950/40 border-red-900/50' : 'bg-[#11111a] border-slate-800'
      }`}>
        <div className="flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${isDemonMode ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`} />
            <span className={`text-xs font-semibold uppercase tracking-widest ${isDemonMode ? 'text-red-400 font-black' : 'text-slate-400'}`}>
                {isDemonMode ? 'Demon Shell v9.9' : 'Root Shell'}
            </span>
        </div>
        <div className="flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isDemonMode ? 'bg-red-600 shadow-[0_0_5px_red]' : 'bg-red-500/20'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full ${isDemonMode ? 'bg-red-600 shadow-[0_0_5px_red]' : 'bg-yellow-500/20'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full ${isDemonMode ? 'bg-red-600 shadow-[0_0_5px_red]' : 'bg-green-500/20'}`}></div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide text-xs md:text-sm font-mono"
      >
        {logs.length === 0 && <div className={isDemonMode ? 'text-red-900 italic' : 'text-slate-600 italic'}>Authentication successful. Root access granted.</div>}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className={`shrink-0 select-none text-[10px] pt-0.5 ${isDemonMode ? 'text-red-900' : 'text-slate-700'}`}>
              {log.timestamp.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}
            </span>
            <div className="flex-1 break-words">
              {log.source === 'USER' && (
                <span className={`font-bold flex items-center gap-1 ${isDemonMode ? 'text-red-500 drop-shadow-[0_0_4px_rgba(220,38,38,0.5)]' : 'text-cyan-400'}`}>
                   {isDemonMode ? 'demon@nexus:~$' : 'root@nexus:~#'} {log.message}
                </span>
              )}
              {log.source === 'AI' && (
                <span className={isDemonMode ? 'text-red-200' : 'text-slate-300'}>{log.message}</span>
              )}
              {log.source === 'TOOL' && (
                <span className={isDemonMode ? 'text-red-500 font-bold' : 'text-emerald-500 opacity-90'}>
                   {'>'} {log.message}
                </span>
              )}
              {log.source === 'SYSTEM' && (
                 <span className={`${log.type === 'error' ? 'text-red-600 font-black uppercase' : isDemonMode ? 'text-red-800' : 'text-slate-500'} whitespace-pre-wrap`}>
                    {log.message}
                 </span>
              )}
            </div>
          </div>
        ))}
        {/* Blinking Cursor - Aggressive Red for Demon Mode */}
        <div className="flex items-center gap-2 mt-2 opacity-80">
             <span className={`shrink-0 text-[10px] ${isDemonMode ? 'text-red-900' : 'text-slate-700'}`}>
              {new Date().toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}
            </span>
            <span className={isDemonMode ? 'text-red-600 font-bold' : 'text-cyan-600'}>
                {isDemonMode ? 'demon@nexus:~$' : 'root@nexus:~#'}
            </span>
            <span className={`w-2 h-4 animate-pulse inline-block align-middle transition-all duration-75 ${
                isDemonMode ? 'bg-red-500 shadow-[0_0_15px_rgba(220,38,38,1)] scale-y-110' : 'bg-cyan-500'
            }`}></span>
        </div>
      </div>
    </div>
  );
};
