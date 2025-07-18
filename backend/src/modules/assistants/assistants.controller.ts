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
import { AssistantsService } from './assistants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateAssistantDto } from './dto/update-assistant.dto';

@ApiTags('Virtual Assistants')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new virtual assistant',
    description: 'Creates a new virtual assistant with the specified configuration and capabilities.'
  })
  @ApiBody({ type: CreateAssistantDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Assistant created successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Assistant created successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Alex - Customer Support' },
            description: { type: 'string', example: 'A friendly customer support assistant specializing in product inquiries' },
            voiceType: { type: 'string', example: 'en-US-Neural2-F' },
            language: { type: 'string', example: 'en-US' },
            isActive: { type: 'boolean', example: true },
            aiConfig: { type: 'object', example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 } },
            specializations: { type: 'array', items: { type: 'string' }, example: ['customer support', 'sales'] },
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
  create(@Body() createAssistantDto: CreateAssistantDto) {
    return this.assistantsService.create(createAssistantDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all virtual assistants',
    description: 'Retrieves a list of all virtual assistants in the system. Requires authentication.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Assistants retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Assistants retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              name: { type: 'string', example: 'Alex - Customer Support' },
              description: { type: 'string', example: 'A friendly customer support assistant specializing in product inquiries' },
              voiceType: { type: 'string', example: 'en-US-Neural2-F' },
              language: { type: 'string', example: 'en-US' },
              isActive: { type: 'boolean', example: true },
              aiConfig: { type: 'object', example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 } },
              specializations: { type: 'array', items: { type: 'string' }, example: ['customer support', 'sales'] },
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
    return this.assistantsService.findAll();
  }

  @Get('active')
  @ApiOperation({ 
    summary: 'Get all active virtual assistants',
    description: 'Retrieves a list of all active virtual assistants that are currently available for calls.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Active assistants retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Active assistants retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              name: { type: 'string', example: 'Alex - Customer Support' },
              description: { type: 'string', example: 'A friendly customer support assistant specializing in product inquiries' },
              voiceType: { type: 'string', example: 'en-US-Neural2-F' },
              language: { type: 'string', example: 'en-US' },
              isActive: { type: 'boolean', example: true },
              aiConfig: { type: 'object', example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 } },
              specializations: { type: 'array', items: { type: 'string' }, example: ['customer support', 'sales'] },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
            }
          }
        }
      }
    }
  })
  findActive() {
    return this.assistantsService.findActive();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get virtual assistant by ID',
    description: 'Retrieves a specific virtual assistant by their unique ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Assistant ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Assistant retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Assistant retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Alex - Customer Support' },
            description: { type: 'string', example: 'A friendly customer support assistant specializing in product inquiries' },
            voiceType: { type: 'string', example: 'en-US-Neural2-F' },
            language: { type: 'string', example: 'en-US' },
            isActive: { type: 'boolean', example: true },
            aiConfig: { type: 'object', example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 } },
            specializations: { type: 'array', items: { type: 'string' }, example: ['customer support', 'sales'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Assistant not found' 
  })
  findOne(@Param('id') id: string) {
    return this.assistantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update virtual assistant',
    description: 'Updates an existing virtual assistant with the provided information. Only provided fields will be updated.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Assistant ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiBody({ type: UpdateAssistantDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Assistant updated successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Assistant updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Alex - Customer Support' },
            description: { type: 'string', example: 'A friendly customer support assistant specializing in product inquiries' },
            voiceType: { type: 'string', example: 'en-US-Neural2-F' },
            language: { type: 'string', example: 'en-US' },
            isActive: { type: 'boolean', example: true },
            aiConfig: { type: 'object', example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 } },
            specializations: { type: 'array', items: { type: 'string' }, example: ['customer support', 'sales'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Assistant not found' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data' 
  })
  update(@Param('id') id: string, @Body() updateAssistantDto: UpdateAssistantDto) {
    return this.assistantsService.update(id, updateAssistantDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete virtual assistant',
    description: 'Permanently deletes a virtual assistant from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Assistant ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Assistant deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Assistant deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Alex - Customer Support' },
            description: { type: 'string', example: 'A friendly customer support assistant specializing in product inquiries' },
            voiceType: { type: 'string', example: 'en-US-Neural2-F' },
            language: { type: 'string', example: 'en-US' },
            isActive: { type: 'boolean', example: true },
            aiConfig: { type: 'object', example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 } },
            specializations: { type: 'array', items: { type: 'string' }, example: ['customer support', 'sales'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Assistant not found' 
  })
  remove(@Param('id') id: string) {
    return this.assistantsService.remove(id);
  }
} 