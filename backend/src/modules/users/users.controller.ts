import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new user',
    description: 'Creates a new user account with the provided information. Password will be hashed before storage.'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'User created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'john.doe@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', example: 'user' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Email already exists' 
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the system. Requires authentication.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Users retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Users retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              email: { type: 'string', example: 'john.doe@example.com' },
              name: { type: 'string', example: 'John Doe' },
              role: { type: 'string', example: 'user' },
              isActive: { type: 'boolean', example: true },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Unauthorized - Invalid or missing token' 
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their unique ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'User ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'User retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'john.doe@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', example: 'user' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'User not found' 
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update user',
    description: 'Updates an existing user with the provided information. Only provided fields will be updated.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'User ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User updated successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'User updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'john.doe@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', example: 'user' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'User not found' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data' 
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete user',
    description: 'Permanently deletes a user from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'User ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'User deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'User deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            email: { type: 'string', example: 'john.doe@example.com' },
            name: { type: 'string', example: 'John Doe' },
            role: { type: 'string', example: 'user' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'User not found' 
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
} 