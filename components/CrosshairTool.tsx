
import React, { useState } from 'react';
import { Crosshair, Palette, Maximize, Minus, Grid, Settings } from 'lucide-react';
import { CrosshairConfig } from '../types';

const CrosshairTool: React.FC = () => {
  const [config, setConfig] = useState<CrosshairConfig>({
    color: '#00ffff',
    size: 20,
    thickness: 2,
    gap: 4,
    dot: true,
    opacity: 1
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-orbitron font-bold text-white mb-1">VISUAL <span className="text-cyan-400">INTERFACE</span></h2>
          <p className="text-slate-400">Overlay custom aiming reticles on top of any application.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-bold font-orbitron text-sm transition-all shadow-lg shadow-red-900/20">
          ENABLE OVERLAY
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Area */}
        <div className="relative aspect-square md:aspect-auto md:h-[500px] glass-morphism rounded-[2rem] border-slate-800 flex items-center justify-center overflow-hidden bg-[url('https://picsum.photos/seed/game/1200/800')] bg-cover bg-center">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-grayscale"></div>
          
          {/* Static Center UI */}
          <div className="absolute inset-0 border border-cyan-500/10 pointer-events-none">
             <div className="absolute top-1/2 left-0 right-0 border-t border-cyan-500/10"></div>
             <div className="absolute left-1/2 top-0 bottom-0 border-l border-cyan-500/10"></div>
          </div>

          {/* Dynamic Crosshair Rendering */}
          <div className="relative z-20 flex items-center justify-center pointer-events-none">
            {config.dot && (
              <div 
                className="absolute rounded-full" 
                style={{ 
                  width: `${config.thickness + 1}px`, 
                  height: `${config.thickness + 1}px`, 
                  backgroundColor: config.color,
                  opacity: config.opacity,
                  boxShadow: `0 0 5px ${config.color}`
                }}
              />
            )}
            {/* Top */}
            <div 
              className="absolute" 
              style={{ 
                width: `${config.thickness}px`, 
                height: `${config.size}px`, 
                backgroundColor: config.color, 
                bottom: `${config.gap}px`,
                opacity: config.opacity,
                boxShadow: `0 0 5px ${config.color}`
              }}
            />
            {/* Bottom */}
            <div 
              className="absolute" 
              style={{ 
                width: `${config.thickness}px`, 
                height: `${config.size}px`, 
                backgroundColor: config.color, 
                top: `${config.gap}px`,
                opacity: config.opacity,
                boxShadow: `0 0 5px ${config.color}`
              }}
            />
            {/* Left */}
            <div 
              className="absolute" 
              style={{ 
                height: `${config.thickness}px`, 
                width: `${config.size}px`, 
                right: `${config.gap}px`, 
                backgroundColor: config.color,
                opacity: config.opacity,
                boxShadow: `0 0 5px ${config.color}`
              }}
            />
            {/* Right */}
            <div 
              className="absolute" 
              style={{ 
                height: `${config.thickness}px`, 
                width: `${config.size}px`, 
                left: `${config.gap}px`, 
                backgroundColor: config.color,
                opacity: config.opacity,
                boxShadow: `0 0 5px ${config.color}`
              }}
            />
          </div>
          
          <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-700 text-xs font-bold text-slate-400">
            <Maximize className="w-3 h-3" />
            LIVE PREVIEW V1.4
          </div>
        </div>

        {/* Controls Area */}
        <div className="glass-morphism p-8 rounded-[2rem] border-slate-800 space-y-6">
          <h3 className="text-xl font-orbitron font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            RETICLE PARAMETERS
          </h3>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color</label>
               <input 
                type="color" 
                value={config.color} 
                onChange={(e) => setConfig(prev => ({ ...prev, color: e.target.value }))}
                className="w-full h-12 rounded-xl bg-slate-900 border border-slate-800 p-1 cursor-pointer"
               />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type</label>
               <select className="w-full h-12 rounded-xl bg-slate-900 border border-slate-800 px-4 text-xs font-bold uppercase tracking-widest text-slate-400 outline-none focus:ring-1 focus:ring-cyan-500">
                  <option>CLASSIC CROSS</option>
                  <option>DYNAMIC CIRCLE</option>
                  <option>SQUARE RETICLE</option>
               </select>
             </div>
          </div>

          <ConfigSlider 
            label="Line Length" 
            value={config.size} 
            min={2} 
            max={100} 
            onChange={(v) => setConfig(prev => ({ ...prev, size: v }))} 
          />
          <ConfigSlider 
            label="Thickness" 
            value={config.thickness} 
            min={1} 
            max={10} 
            onChange={(v) => setConfig(prev => ({ ...prev, thickness: v }))} 
          />
          <ConfigSlider 
            label="Gap" 
            value={config.gap} 
            min={0} 
            max={50} 
            onChange={(v) => setConfig(prev => ({ ...prev, gap: v }))} 
          />
          <ConfigSlider 
            label="Opacity" 
            value={Math.round(config.opacity * 100)} 
            min={10} 
            max={100} 
            onChange={(v) => setConfig(prev => ({ ...prev, opacity: v / 100 }))} 
          />

          <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
             <span className="text-sm font-bold text-slate-300">CENTER DOT</span>
             <button 
              onClick={() => setConfig(prev => ({ ...prev, dot: !prev.dot }))}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${config.dot ? 'bg-cyan-600' : 'bg-slate-800'}`}
             >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${config.dot ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigSlider: React.FC<{ label: string; value: number; min: number; max: number; onChange: (v: number) => void }> = ({ label, value, min, max, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <span className="text-sm font-orbitron font-bold text-cyan-400">{value}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
    />
  </div>
);

export default CrosshairTool;
