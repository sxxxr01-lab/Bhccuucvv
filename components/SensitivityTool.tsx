
import React, { useState } from 'react';
import { Target, Save, RotateCcw, Monitor, Smartphone, Tablet } from 'lucide-react';
import { SensitivityProfile } from '../types';

const SensitivityTool: React.FC = () => {
  const [profile, setProfile] = useState<SensitivityProfile>({
    id: '1',
    name: 'Pro Default',
    general: 95,
    redDot: 80,
    scope2x: 75,
    scope4x: 70,
    sniper: 50,
    freeLook: 65
  });

  const updateVal = (key: keyof SensitivityProfile, val: number) => {
    setProfile(prev => ({ ...prev, [key]: val }));
  };

  const reset = () => {
    setProfile({
      id: '1',
      name: 'Pro Default',
      general: 95,
      redDot: 80,
      scope2x: 75,
      scope4x: 70,
      sniper: 50,
      freeLook: 65
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-orbitron font-bold text-white mb-1">SENSITIVITY <span className="text-cyan-400">CALIBRATION</span></h2>
          <p className="text-slate-400">Perfect your aim with precise value control for every optical scope.</p>
        </div>
        <div className="flex gap-2">
           <button onClick={reset} className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:text-cyan-400 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-cyan-600 px-6 py-3 rounded-xl font-bold font-orbitron text-sm hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20">
            <Save className="w-4 h-4" />
            APPLY TO ENGINE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sliders Area */}
        <div className="lg:col-span-2 space-y-6 glass-morphism p-8 rounded-[2rem] border-slate-800">
          <SensitivitySlider label="General" value={profile.general} onChange={(v) => updateVal('general', v)} />
          <SensitivitySlider label="Red Dot" value={profile.redDot} onChange={(v) => updateVal('redDot', v)} />
          <SensitivitySlider label="2x Scope" value={profile.scope2x} onChange={(v) => updateVal('scope2x', v)} />
          <SensitivitySlider label="4x Scope" value={profile.scope4x} onChange={(v) => updateVal('scope4x', v)} />
          <SensitivitySlider label="Sniper Scope" value={profile.sniper} onChange={(v) => updateVal('sniper', v)} />
          <SensitivitySlider label="Free Look" value={profile.freeLook} onChange={(v) => updateVal('freeLook', v)} />
        </div>

        {/* Device Recommendation */}
        <div className="space-y-6">
          <div className="glass-morphism p-6 rounded-3xl border-slate-800">
            <h3 className="text-lg font-orbitron font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-cyan-400" />
              AUTO-RECOMMEND
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">Select your device type to automatically adjust the DPI and Registry sensitivities for optimal performance.</p>
            <div className="grid grid-cols-1 gap-3">
              <DeviceButton icon={<Smartphone />} label="Smartphone (Android)" active={true} />
              <DeviceButton icon={<Smartphone />} label="iPhone / iOS" />
              <DeviceButton icon={<Tablet />} label="Tablet / iPad" />
              <DeviceButton icon={<Monitor />} label="PC / Emulator" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-8 rounded-3xl shadow-xl relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h4 className="font-orbitron font-bold text-white text-xl mb-2">CLOUD AUTO-HEADSHOT</h4>
              <p className="text-cyan-100 text-sm opacity-80 mb-4">Subscribe to VIP cloud injector for automated aim correction technology.</p>
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/30">
                PRO FEATURE
              </div>
            </div>
            <Target className="absolute right-[-20px] bottom-[-20px] w-40 h-40 text-white/5 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SensitivitySlider: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-orbitron font-black text-cyan-400 neon-text">{value}</span>
    </div>
    <div className="relative flex items-center group">
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none"
      />
      <div className="absolute -inset-1 bg-cyan-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  </div>
);

const DeviceButton: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${active ? 'bg-cyan-600/10 border-cyan-500/50 text-white' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}>
    <div className={active ? 'text-cyan-400' : 'text-slate-600'}>
      {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    </div>
    <span className="text-sm font-bold">{label}</span>
  </button>
);

export default SensitivityTool;
