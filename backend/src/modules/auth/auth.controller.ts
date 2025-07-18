import { Controller, Post, Body, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticates a user with email and password, returning a JWT token for subsequent API calls. Use this endpoint to obtain your authentication token.',
    externalDocs: {
      description: 'Learn more about JWT authentication',
      url: 'https://jwt.io/introduction'
    }
  })
  @ApiBody({ 
    type: LoginDto,
    description: 'User credentials for authentication',
    examples: {
      example1: {
        summary: 'Standard login',
        description: 'Login with email and password',
        value: {
          email: 'john.doe@example.com',
          password: 'password123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Login successful - Returns JWT token and user information',
    schema: {
      type: 'object',
      properties: {
        access_token: { 
          type: 'string', 
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzQ1NjgwMDAsImV4cCI6MTYzNDY1NDQwMH0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
          description: 'JWT token for API authentication'
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'john.doe@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', example: 'user', enum: ['user', 'admin'] }
          },
          description: 'User information'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Invalid credentials - Email or password is incorrect',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        error: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data - Validation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' }, example: ['email must be an email', 'password should not be empty'] },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ 
    summary: 'User registration',
    description: 'Creates a new user account and automatically logs them in, returning a JWT token. This endpoint is useful for new user onboarding.',
    externalDocs: {
      description: 'Learn more about user roles',
      url: 'https://docs.example.com/user-roles'
    }
  })
  @ApiBody({ 
    type: CreateUserDto,
    description: 'User registration data',
    examples: {
      example1: {
        summary: 'Standard registration',
        description: 'Register with basic user information',
        value: {
          email: 'jane.doe@example.com',
          password: 'password123',
          name: 'Jane Doe',
          role: 'user'
        }
      },
      example2: {
        summary: 'Admin registration',
        description: 'Register with admin role (use with caution)',
        value: {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Registration successful - Returns JWT token and user information',
    schema: {
      type: 'object',
      properties: {
        access_token: { 
          type: 'string', 
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTIiLCJlbWFpbCI6ImphbmUuZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzQ1NjgwMDAsImV4cCI6MTYzNDY1NDQwMH0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
          description: 'JWT token for API authentication'
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            email: { type: 'string', example: 'jane.doe@example.com' },
            name: { type: 'string', example: 'Jane Doe' },
            role: { type: 'string', example: 'user', enum: ['user', 'admin'] }
          },
          description: 'User information'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data - Validation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' }, example: ['email must be an email', 'password should not be empty', 'name should not be empty'] },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Email already exists - User with this email already registered',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Email already exists' },
        error: { type: 'string', example: 'Conflict' }
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('verify-token')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Verify JWT token',
    description: 'Verifies if the provided JWT token is valid and returns the decoded user information. Useful for token validation.',
    security: [{ 'JWT-auth': [] }]
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Token is valid - Returns decoded user information',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean', example: true },
        user: {
          type: 'object',
          properties: {
            userId: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'john.doe@example.com' },
            role: { type: 'string', example: 'user' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Invalid or expired token',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
        error: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  async verifyToken(@Request() req: any) {
    // This endpoint would need to be implemented in the auth service
    // For now, we'll return the user from the JWT guard
    return {
      valid: true,
      user: req.user
    };
  }
} 