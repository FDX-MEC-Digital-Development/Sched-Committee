import { type CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.alpa.fdx',
  appName: 'FDX ALPA Scheduling Committee',
  webDir: 'dist',
  ios: {
    contentInset: 'always', // this puts all content beneath the notch and status bar
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
