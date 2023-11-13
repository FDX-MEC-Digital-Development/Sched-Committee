import { type CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.alpa.fdx',
  appName: 'FDX ALPA Scheduling Committee',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
