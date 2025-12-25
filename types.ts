
export interface SensitivityProfile {
  id: string;
  name: string;
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
}

export interface CrosshairConfig {
  color: string;
  size: number;
  thickness: number;
  gap: number;
  dot: boolean;
  opacity: number;
}

export interface DeviceStats {
  ping: number;
  fps: number;
  ramUsage: number;
  cpuTemp: number;
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  SENSITIVITY = 'SENSITIVITY',
  CROSSHAIR = 'CROSSHAIR',
  AI_STRATEGY = 'AI_STRATEGY',
  SETTINGS = 'SETTINGS'
}
