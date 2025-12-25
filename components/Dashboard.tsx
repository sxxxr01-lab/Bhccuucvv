
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Wifi, Smartphone, Thermometer, Zap, AlertTriangle } from 'lucide-react';
import { DeviceStats } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DeviceStats>({
    ping: 24,
    fps: 60,
    ramUsage: 45,
    cpuTemp: 38
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ping: Math.max(15, Math.min(60, prev.ping + (Math.random() - 0.5) * 4)),
        fps: Math.max(55, Math.min(60, prev.fps + (Math.random() - 0.5) * 2)),
        ramUsage: Math.max(30, Math.min(85, prev.ramUsage + (Math.random() - 0.5) * 1)),
        cpuTemp: Math.max(35, Math.min(45, prev.cpuTemp + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden p-8 rounded-[2rem] bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20">
        <div className="relative z-10">
          <h1 className="text-4xl font-orbitron font-black text-white mb-2">WELCOME TO <span className="text-cyan-400 neon-text">ULTRA v4</span></h1>
          <p className="text-slate-400 max-w-xl text-lg">Your hardware is currently synchronized with the cloud injector. Optimization algorithms are running at maximum efficiency.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold text-green-400 uppercase tracking-tighter">Anti-Detection Active</span>
            </div>
            <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-tighter">Turbo Boost Engine</span>
            </div>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[-20%] w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full"></div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Network Latency" value={`${Math.round(stats.ping)}ms`} icon={<Wifi />} color="text-cyan-400" />
        <StatCard label="Frame Stability" value={`${Math.round(stats.fps)} FPS`} icon={<Smartphone />} color="text-green-400" />
        <StatCard label="RAM Load" value={`${Math.round(stats.ramUsage)}%`} icon={<Cpu />} color="text-purple-400" />
        <StatCard label="Core Temp" value={`${stats.cpuTemp.toFixed(1)}°C`} icon={<Thermometer />} color="text-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 glass-morphism rounded-3xl border-slate-800 p-6">
          <h3 className="text-xl font-orbitron font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            CORE OPTIMIZATIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OptimizationToggle title="RAM Cleaner" description="Flush background processes for peak FPS." active={true} />
            <OptimizationToggle title="Ping Stabilizer" description="Prioritize game packets over OS updates." active={true} />
            <OptimizationToggle title="GPU Overclock" description="Enhance rendering pipeline performance." active={false} />
            <OptimizationToggle title="Auto Headshot Helper" description="AI-assisted crosshair positioning guide." active={true} />
          </div>
        </div>

        {/* Security Log */}
        <div className="glass-morphism rounded-3xl border-slate-800 p-6 flex flex-col">
          <h3 className="text-xl font-orbitron font-bold mb-6 flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            LIVE SECURITY FEED
          </h3>
          <div className="flex-1 space-y-4">
            <LogItem time="12:44" msg="Encryption Layer v4.1 Verified" status="ok" />
            <LogItem time="12:44" msg="Proxy Tunnel Established" status="ok" />
            <LogItem time="12:45" msg="Hardware ID Masking Enabled" status="ok" />
            <LogItem time="12:46" msg="Cloud Config Synchronized" status="ok" />
            <LogItem time="12:46" msg="Anticheat Bypass Ready" status="ok" />
          </div>
          <button className="mt-6 w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
            Clear Security Logs
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="glass-morphism p-6 rounded-3xl border-slate-800 flex items-center gap-4 group hover:border-cyan-500/30 transition-all cursor-default">
    <div className={`p-4 rounded-2xl bg-slate-900/50 ${color} group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
      <p className="text-xl font-orbitron font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const OptimizationToggle: React.FC<{ title: string; description: string; active: boolean }> = ({ title, description, active }) => (
  <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/20 transition-all flex items-center justify-between">
    <div>
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${active ? 'bg-cyan-600' : 'bg-slate-800'}`}>
      <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

const LogItem: React.FC<{ time: string; msg: string; status: 'ok' | 'err' }> = ({ time, msg, status }) => (
  <div className="flex items-start gap-3">
    <span className="text-[10px] font-mono text-slate-600 pt-0.5">{time}</span>
    <p className={`text-xs font-medium ${status === 'ok' ? 'text-slate-300' : 'text-red-400'}`}>
      {status === 'ok' ? '>' : '!'} {msg}
    </p>
  </div>
);

export default Dashboard;
