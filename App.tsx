
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Crosshair, 
  Bot, 
  Settings as SettingsIcon,
  Shield,
  Zap,
  Activity,
  Menu,
  X,
  Lock
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import SensitivityTool from './components/SensitivityTool';
import CrosshairTool from './components/CrosshairTool';
import AIAssistant from './components/AIAssistant';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authCode, setAuthCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode.toLowerCase() === 'ffh4x') {
      setIsAuthorized(true);
    } else {
      alert("Invalid Access Key. Hint: ffh4x");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500 rounded-full blur-[120px]"></div>
        </div>
        
        <form onSubmit={handleLogin} className="glass-morphism p-8 rounded-2xl w-full max-w-md relative z-10 border-cyan-500/30">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-cyan-500/10 rounded-full mb-4 border border-cyan-500/30">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold font-orbitron text-white tracking-tighter neon-text">FFH4X ULTRA</h1>
            <p className="text-slate-400 mt-2 text-center uppercase tracking-[0.2em] text-xs">Security Protocol Active</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/50" />
              <input 
                type="password" 
                placeholder="ENTER ACCESS KEY" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-orbitron text-sm tracking-widest placeholder:text-slate-600"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron py-3 rounded-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(8,145,178,0.3)]"
            >
              AUTHENTICATE
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Version 4.0.2 Stable | No Ban System Ready</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden text-slate-200">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass-morphism border-r border-slate-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 md:relative`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-cyan-400 w-6 h-6 fill-cyan-400/20" />
            <span className="font-orbitron font-bold text-lg tracking-tight">FFH4X <span className="text-cyan-400">ULTRA</span></span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Dashboard" 
            isActive={activeTab === AppTab.DASHBOARD} 
            onClick={() => { setActiveTab(AppTab.DASHBOARD); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<Target />} 
            label="Sensitivity" 
            isActive={activeTab === AppTab.SENSITIVITY} 
            onClick={() => { setActiveTab(AppTab.SENSITIVITY); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<Crosshair />} 
            label="Custom Crosshair" 
            isActive={activeTab === AppTab.CROSSHAIR} 
            onClick={() => { setActiveTab(AppTab.CROSSHAIR); setSidebarOpen(false); }} 
          />
          <NavItem 
            icon={<Bot />} 
            label="AI Game Coach" 
            isActive={activeTab === AppTab.AI_STRATEGY} 
            onClick={() => { setActiveTab(AppTab.AI_STRATEGY); setSidebarOpen(false); }} 
          />
          <div className="pt-4 mt-4 border-t border-slate-800">
             <NavItem 
              icon={<SettingsIcon />} 
              label="Device Settings" 
              isActive={activeTab === AppTab.SETTINGS} 
              onClick={() => { setActiveTab(AppTab.SETTINGS); setSidebarOpen(false); }} 
            />
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/40">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">System Status</p>
              <p className="text-sm font-bold text-cyan-400">OPTIMIZED</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-y-auto overflow-x-hidden">
        <header className="sticky top-0 z-40 p-4 md:p-6 glass-morphism flex items-center justify-between md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-900 rounded-lg border border-slate-700">
            <Menu className="w-6 h-6 text-cyan-400" />
          </button>
          <span className="font-orbitron font-bold text-cyan-400 tracking-wider text-sm">FFH4X CONTROL</span>
          <div className="w-10 h-10 rounded-full border border-cyan-500/20 overflow-hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="Profile" />
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {activeTab === AppTab.DASHBOARD && <Dashboard />}
          {activeTab === AppTab.SENSITIVITY && <SensitivityTool />}
          {activeTab === AppTab.CROSSHAIR && <CrosshairTool />}
          {activeTab === AppTab.AI_STRATEGY && <AIAssistant />}
          {activeTab === AppTab.SETTINGS && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 glass-morphism rounded-3xl border-slate-800">
               <SettingsIcon className="w-16 h-16 text-slate-700 mb-4 animate-spin-slow" />
               <h2 className="text-2xl font-orbitron mb-2">System Configurator</h2>
               <p className="text-slate-400 max-w-md">Device-specific optimization parameters are automatically applied. Adjusting low-level registry values is restricted in the preview version.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-cyan-600 text-white shadow-lg' : 'hover:bg-slate-900 text-slate-400 hover:text-cyan-400'}`}
  >
    <div className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-cyan-400'} transition-colors`}>
      {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    </div>
    <span className="font-medium">{label}</span>
    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>}
  </button>
);

export default App;
