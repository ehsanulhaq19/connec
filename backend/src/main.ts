import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { getCorsConfig, corsOriginCallback } from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enhanced CORS configuration using centralized config
  const corsConfig = getCorsConfig();
  
  app.enableCors({
    origin: corsOriginCallback(corsConfig.allowedOrigins),
    credentials: corsConfig.credentials,
    methods: corsConfig.methods,
    allowedHeaders: corsConfig.allowedHeaders,
    exposedHeaders: corsConfig.exposedHeaders,
    maxAge: corsConfig.maxAge,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enhanced Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('AI Virtual Assistant API')
    .setDescription(`
      # AI Virtual Assistant API Documentation

      This API provides comprehensive functionality for managing AI-powered virtual assistants, clients, call scheduling, and call analytics.

      ## Features

      - **User Management**: Create, update, and manage user accounts with role-based access
      - **Client Management**: Manage client information and preferences
      - **Virtual Assistants**: Configure and manage AI assistants with different voices and specializations
      - **Call Scheduling**: Schedule, manage, and track calls between assistants and clients
      - **Call Analytics**: Get detailed analytics and insights from completed calls
      - **Authentication**: Secure JWT-based authentication system

      ## Authentication

      This API uses **JWT (JSON Web Token)** authentication for secure access to protected endpoints.

      ### How to Authenticate

      1. **Register or Login**: Use the \`/auth/register\` or \`/auth/login\` endpoints to get a JWT token
      2. **Include Token**: Add the token to your requests in the Authorization header:
         \`Authorization: Bearer <your-jwt-token>\`
      3. **Token Format**: The token should be included as: \`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\`

      ### Example Authentication Flow

      \`\`\`bash
      # 1. Login to get token
      curl -X POST http://localhost:3005/auth/login \\
        -H "Content-Type: application/json" \\
        -d '{"email": "user@example.com", "password": "password123"}'

      # Response:
      {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
          "id": "507f1f77bcf86cd799439011",
          "email": "user@example.com",
          "name": "John Doe",
          "role": "user"
        }
      }

      # 2. Use token for protected endpoints
      curl -X GET http://localhost:3005/users \\
        -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      \`\`\`

      ### Token Expiration

      - JWT tokens expire after **24 hours**
      - You'll need to login again to get a new token
      - The API will return \`401 Unauthorized\` for expired tokens

      ### Security Notes

      - Keep your JWT tokens secure and don't share them
      - Tokens are automatically persisted in Swagger UI for testing
      - Use HTTPS in production environments
      - Tokens contain user information and should be treated as sensitive data

      ## Rate Limiting

      API requests are rate-limited to ensure fair usage. Please implement appropriate retry logic in your applications.

      ## Error Handling

      The API returns standard HTTP status codes and detailed error messages in JSON format.

      ### Common Error Codes

      - \`401 Unauthorized\`: Invalid or missing JWT token
      - \`403 Forbidden\`: Valid token but insufficient permissions
      - \`400 Bad Request\`: Invalid request data
      - \`404 Not Found\`: Resource not found
      - \`500 Internal Server Error\`: Server error

      ## Support

      For technical support or questions, please contact the development team.
    `)
    .setVersion('1.0.0')
    .addTag('Authentication', 'User authentication and registration endpoints')
    .addTag('Users', 'User management operations')
    .addTag('Clients', 'Client management operations')
    .addTag('Virtual Assistants', 'AI assistant configuration and management')
    .addTag('Call Scheduler', 'Call scheduling and management')
    .addTag('Completed Calls', 'Call history and analytics')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT token in the format: Bearer <token>',
        in: 'header',
      },
      'JWT-auth', // This name here is important for references
    )
    .addServer('http://localhost:3005', 'Development server')
    .addServer('https://api.example.com', 'Production server')
    .setContact(
      'Development Team',
      'https://github.com/your-org/ai-virtual-assistant',
      'dev@example.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Enhanced Swagger UI options with better JWT support
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activated: true,
        theme: 'monokai'
      },
      // Enhanced JWT authentication UI
      authAction: {
        JWT: {
          name: 'JWT',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Enter your JWT token in the format: Bearer <token>'
          },
          value: 'Bearer <JWT>'
        }
      },
      // Custom request interceptor for better JWT handling
      requestInterceptor: (req: any) => {
        if (req.headers.Authorization && !req.headers.Authorization.startsWith('Bearer ')) {
          req.headers.Authorization = `Bearer ${req.headers.Authorization}`;
        }
        return req;
      }
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
      .swagger-ui .info .description { font-size: 14px; line-height: 1.5; }
      .swagger-ui .auth-wrapper { margin: 20px 0; }
      .swagger-ui .auth-container { background: #f8f9fa; padding: 15px; border-radius: 5px; }
      .swagger-ui .auth-container h4 { color: #3b4151; margin-bottom: 10px; }
      .swagger-ui .auth-container p { margin: 5px 0; }
      .swagger-ui .btn.authorize { background: #4990e2; border-color: #4990e2; }
      .swagger-ui .btn.authorize:hover { background: #357abd; border-color: #357abd; }
    `,
    customSiteTitle: 'AI Virtual Assistant API Documentation',
    customfavIcon: '/favicon.ico'
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
