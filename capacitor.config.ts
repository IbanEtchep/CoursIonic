import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.ibanetchep',
  appName: 'CoursIonic',
  webDir: 'public',
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_notification",
      iconColor: "#FF4081",
      sound: "beep.wav",
    },
  },
};

export default config;
