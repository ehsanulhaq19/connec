# AI Virtual Assistant API Documentation

## Overview

This document provides comprehensive information about the AI Virtual Assistant API, including authentication, endpoints, request/response formats, and usage examples.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Examples](#examples)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB
- JWT Secret (configured in environment variables)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see `.env.example`)
4. Start the server: `npm run start:dev`

### Accessing Swagger Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:3001/api
```

The Swagger UI provides:
- Interactive API testing
- Request/response examples
- Authentication token management
- Schema validation
- Code generation

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token

1. **Register a new user:**
   ```http
   POST /auth/register
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "password123",
     "name": "John Doe"
   }
   ```

2. **Login with existing credentials:**
   ```http
   POST /auth/login
   Content-Type: application/json

   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

### Using the Token

Include the JWT token in the Authorization header for protected endpoints:

```http
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login with credentials | No |

### User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes |
| GET | `/users/:id` | Get user by ID | Yes |
| POST | `/users` | Create new user | Yes |
| PATCH | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |

### Client Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/clients` | Get all clients | Yes |
| GET | `/clients/:id` | Get client by ID | Yes |
| POST | `/clients` | Create new client | Yes |
| PATCH | `/clients/:id` | Update client | Yes |
| DELETE | `/clients/:id` | Delete client | Yes |

### Virtual Assistant Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/assistants` | Get all assistants | Yes |
| GET | `/assistants/active` | Get active assistants | Yes |
| GET | `/assistants/:id` | Get assistant by ID | Yes |
| POST | `/assistants` | Create new assistant | Yes |
| PATCH | `/assistants/:id` | Update assistant | Yes |
| DELETE | `/assistants/:id` | Delete assistant | Yes |

### Call Scheduling

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/schedules` | Get all schedules | Yes |
| GET | `/schedules/upcoming` | Get upcoming schedules | Yes |
| GET | `/schedules/status/:status` | Get schedules by status | Yes |
| GET | `/schedules/:id` | Get schedule by ID | Yes |
| POST | `/schedules` | Create new schedule | Yes |
| PATCH | `/schedules/:id` | Update schedule | Yes |
| PATCH | `/schedules/:id/cancel` | Cancel schedule | Yes |
| DELETE | `/schedules/:id` | Delete schedule | Yes |

### Call Analytics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/calls` | Get all calls | Yes |
| GET | `/calls/completed` | Get completed calls | Yes |
| GET | `/calls/recent` | Get recent calls | Yes |
| GET | `/calls/analytics` | Get call analytics | Yes |
| GET | `/calls/client/:clientId` | Get calls by client | Yes |
| GET | `/calls/:id` | Get call by ID | Yes |

## Data Models

### User Model

```typescript
{
  _id: string;
  email: string;
  password: string; // hashed
  name: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Client Model

```typescript
{
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferences: Record<string, any>;
  isActive: boolean;
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Assistant Model

```typescript
{
  _id: string;
  name: string;
  description: string;
  voiceType: string;
  language: string;
  isActive: boolean;
  aiConfig: Record<string, any>;
  specializations: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Schedule Model

```typescript
{
  _id: string;
  assistantId: string;
  clientId: string;
  scheduledDate: Date;
  duration: number; // minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  callSettings: Record<string, any>;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Call Model

```typescript
{
  _id: string;
  scheduleId: string;
  assistantId: string;
  clientId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // seconds
  status: 'in-progress' | 'completed' | 'failed';
  conversationLogs: Array<{
    timestamp: Date;
    speaker: 'assistant' | 'client';
    message: string;
    type: 'text' | 'voice' | 'action';
  }>;
  callMetrics: {
    totalMessages: number;
    assistantMessages: number;
    clientMessages: number;
    averageResponseTime: number;
  };
  summary?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Handling

The API returns standard HTTP status codes and detailed error messages:

### Common Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "email must be an email"
    }
  ]
}
```

## Rate Limiting

API requests are rate-limited to ensure fair usage:
- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

## Examples

### Creating a New Client

```bash
curl -X POST http://localhost:3001/clients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane.smith@company.com",
    "phone": "+1-555-123-4567",
    "company": "Acme Corporation",
    "preferences": {
      "timezone": "EST",
      "language": "en"
    },
    "notes": ["Prefers morning calls", "Technical background"]
  }'
```

### Scheduling a Call

```bash
curl -X POST http://localhost:3001/schedules \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "assistantId": "507f1f77bcf86cd799439011",
    "clientId": "507f1f77bcf86cd799439012",
    "scheduledDate": "2024-01-15T10:00:00.000Z",
    "duration": 30,
    "notes": "Follow up on previous conversation about pricing",
    "callSettings": {
      "recording": true,
      "transcription": true,
      "language": "en-US"
    }
  }'
```

### Getting Call Analytics

```bash
curl -X GET http://localhost:3001/calls/analytics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Development

### Running Tests

```bash
npm run test
npm run test:e2e
```

### Code Quality

```bash
npm run lint
npm run format
```

### Building for Production

```bash
npm run build
npm run start:prod
```

## Support

For technical support or questions:
- Email: dev@example.com
- GitHub: https://github.com/your-org/ai-virtual-assistant
- Documentation: http://localhost:3001/api

## License

This project is licensed under the MIT License - see the LICENSE file for details. 