// Environment configuration
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'AI Virtual Assistant',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Feature Flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  
  // External Services
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  
  // Development
  isDev: import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // Environment
  nodeEnv: import.meta.env.MODE,
} as const;

// Type-safe environment access
export type Config = typeof config;

// Validation function
export const validateConfig = (): void => {
  const requiredVars = ['VITE_API_URL'];
  
  for (const varName of requiredVars) {
    if (!import.meta.env[varName]) {
      console.warn(`Missing environment variable: ${varName}`);
    }
  }
};

// Initialize validation in development
if (config.isDev) {
  validateConfig();
} 