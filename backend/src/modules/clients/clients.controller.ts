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
  ApiBody,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new client',
    description: 'Creates a new client record with the provided information.'
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Client created successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Client created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', example: 'jane.smith@company.com' },
            phone: { type: 'string', example: '+1-555-123-4567' },
            company: { type: 'string', example: 'Acme Corporation' },
            preferences: { type: 'object', example: { timezone: 'EST', language: 'en' } },
            isActive: { type: 'boolean', example: true },
            notes: { type: 'array', items: { type: 'string' }, example: ['Prefers morning calls'] },
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
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all clients',
    description: 'Retrieves a list of all clients in the system. Requires authentication.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Clients retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Clients retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              name: { type: 'string', example: 'Jane Smith' },
              email: { type: 'string', example: 'jane.smith@company.com' },
              phone: { type: 'string', example: '+1-555-123-4567' },
              company: { type: 'string', example: 'Acme Corporation' },
              preferences: { type: 'object', example: { timezone: 'EST', language: 'en' } },
              isActive: { type: 'boolean', example: true },
              notes: { type: 'array', items: { type: 'string' }, example: ['Prefers morning calls'] },
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
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get client by ID',
    description: 'Retrieves a specific client by their unique ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Client ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Client retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Client retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', example: 'jane.smith@company.com' },
            phone: { type: 'string', example: '+1-555-123-4567' },
            company: { type: 'string', example: 'Acme Corporation' },
            preferences: { type: 'object', example: { timezone: 'EST', language: 'en' } },
            isActive: { type: 'boolean', example: true },
            notes: { type: 'array', items: { type: 'string' }, example: ['Prefers morning calls'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Client not found' 
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update client',
    description: 'Updates an existing client with the provided information. Only provided fields will be updated.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Client ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Client updated successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Client updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', example: 'jane.smith@company.com' },
            phone: { type: 'string', example: '+1-555-123-4567' },
            company: { type: 'string', example: 'Acme Corporation' },
            preferences: { type: 'object', example: { timezone: 'EST', language: 'en' } },
            isActive: { type: 'boolean', example: true },
            notes: { type: 'array', items: { type: 'string' }, example: ['Prefers morning calls'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Client not found' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data' 
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete client',
    description: 'Permanently deletes a client from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Client ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Client deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Client deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', example: 'jane.smith@company.com' },
            phone: { type: 'string', example: '+1-555-123-4567' },
            company: { type: 'string', example: 'Acme Corporation' },
            preferences: { type: 'object', example: { timezone: 'EST', language: 'en' } },
            isActive: { type: 'boolean', example: true },
            notes: { type: 'array', items: { type: 'string' }, example: ['Prefers morning calls'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Client not found' 
  })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
} 