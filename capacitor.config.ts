import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'myapp',
  webDir: 'build',
  bundledWebRuntime: false, // Use this if you don't want to include Capacitor's runtime in the app bundle
  plugins: {
    // Enable plugins here
    'Capacitor': {
      iosScheme: 'capacitor',
      androidScheme: 'capacitor',
      // If you want to configure more options for plugins, you can do that here
    },
    'RazorpayCheckout': {
      // Add any additional Razorpay specific configurations if needed
    }
  },
  server: {
    // Allow the app to access localhost (for local testing)
    allowNavigation: ['http://localhost', 'https://your-backend-url.com'],
  },
};

export default config;
