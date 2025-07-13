export interface CorsConfig {
  allowedOrigins: string[];
  credentials: boolean;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge: number;
}

export const getCorsConfig = (): CorsConfig => {
  // Default allowed origins for development
  const defaultOrigins: string[] = [];

  // Add domains from environment variable (comma-separated)
  let allowedOrigins = [...defaultOrigins];
  
  if (process.env.ALLOWED_ORIGINS) {
    const envOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
    allowedOrigins.push(...envOrigins);
  }

  // Add legacy FRONTEND_URL if it exists
  if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }
  
  // Remove duplicates
  const uniqueOrigins = [...new Set(allowedOrigins)];

  return {
    allowedOrigins: uniqueOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400, // 24 hours
  };
};

export const corsOriginCallback = (allowedOrigins: string[]) => {
  return (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  };
}; 