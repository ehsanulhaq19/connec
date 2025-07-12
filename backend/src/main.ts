import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for microservices architecture
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
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

      Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
      \`Authorization: Bearer <your-jwt-token>\`

      ## Rate Limiting

      API requests are rate-limited to ensure fair usage. Please implement appropriate retry logic in your applications.

      ## Error Handling

      The API returns standard HTTP status codes and detailed error messages in JSON format.

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
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for references
    )
    .addServer('http://localhost:3001', 'Development server')
    .addServer('https://api.example.com', 'Production server')
    .setContact(
      'Development Team',
      'https://github.com/your-org/ai-virtual-assistant',
      'dev@example.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Custom Swagger UI options
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activated: true,
        theme: 'monokai'
      }
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
      .swagger-ui .info .description { font-size: 14px; line-height: 1.5; }
    `,
    customSiteTitle: 'AI Virtual Assistant API Documentation'
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
