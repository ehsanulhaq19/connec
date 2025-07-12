import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CallsService } from './calls.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Completed Calls')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get all completed calls',
    description: 'Retrieves a list of all completed calls in the system. Requires authentication.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Calls retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Calls retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              scheduleId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439014' },
              startTime: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              endTime: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
              duration: { type: 'number', example: 1800 },
              status: { type: 'string', example: 'completed' },
              conversationLogs: { type: 'array', items: { type: 'object' } },
              callMetrics: { type: 'object' },
              summary: { type: 'string', example: 'Product discussion completed successfully' },
              tags: { type: 'array', items: { type: 'string' }, example: ['sales', 'follow-up'] },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:30:00.000Z' }
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
    return this.callsService.findAll();
  }

  @Get('completed')
  @ApiOperation({ 
    summary: 'Get all completed calls',
    description: 'Retrieves a list of all calls that have been completed successfully.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Completed calls retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Completed calls retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              scheduleId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439014' },
              startTime: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              endTime: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
              duration: { type: 'number', example: 1800 },
              status: { type: 'string', example: 'completed' },
              conversationLogs: { type: 'array', items: { type: 'object' } },
              callMetrics: { type: 'object' },
              summary: { type: 'string', example: 'Product discussion completed successfully' },
              tags: { type: 'array', items: { type: 'string' }, example: ['sales', 'follow-up'] },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:30:00.000Z' }
            }
          }
        }
      }
    }
  })
  findCompleted() {
    return this.callsService.findCompleted();
  }

  @Get('recent')
  @ApiOperation({ 
    summary: 'Get recent completed calls',
    description: 'Retrieves the most recent completed calls, limited by the specified number.'
  })
  @ApiQuery({ 
    name: 'limit', 
    description: 'Number of recent calls to retrieve', 
    example: '10',
    required: false,
    type: 'string'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Recent calls retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Recent calls retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              scheduleId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439014' },
              startTime: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              endTime: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
              duration: { type: 'number', example: 1800 },
              status: { type: 'string', example: 'completed' },
              conversationLogs: { type: 'array', items: { type: 'object' } },
              callMetrics: { type: 'object' },
              summary: { type: 'string', example: 'Product discussion completed successfully' },
              tags: { type: 'array', items: { type: 'string' }, example: ['sales', 'follow-up'] },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:30:00.000Z' }
            }
          }
        }
      }
    }
  })
  findRecent(@Query('limit') limit: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.callsService.findRecent(limitNum);
  }

  @Get('analytics')
  @ApiOperation({ 
    summary: 'Get call analytics',
    description: 'Retrieves analytics and statistics about completed calls including metrics and trends.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Analytics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Analytics retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            totalCalls: { type: 'number', example: 150 },
            totalDuration: { type: 'number', example: 45000 },
            averageDuration: { type: 'number', example: 1800 },
            callsByStatus: { type: 'object', example: { completed: 140, failed: 10 } },
            callsByAssistant: { type: 'object', example: { 'assistant1': 50, 'assistant2': 100 } },
            callsByClient: { type: 'object', example: { 'client1': 30, 'client2': 45 } },
            recentTrends: { type: 'array', items: { type: 'object' } }
          }
        }
      }
    }
  })
  getAnalytics() {
    return this.callsService.getCallAnalytics();
  }

  @Get('assistant/:assistantId')
  @ApiOperation({ summary: 'Get calls by assistant' })
  @ApiResponse({ status: 200, description: 'Calls by assistant retrieved successfully' })
  findByAssistant(@Param('assistantId') assistantId: string) {
    return this.callsService.findByAssistant(assistantId);
  }

  @Get('client/:clientId')
  @ApiOperation({ 
    summary: 'Get calls by client',
    description: 'Retrieves all completed calls for a specific client.'
  })
  @ApiParam({ 
    name: 'clientId', 
    description: 'Client ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Calls by client retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Calls by client retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              scheduleId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439014' },
              startTime: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              endTime: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
              duration: { type: 'number', example: 1800 },
              status: { type: 'string', example: 'completed' },
              conversationLogs: { type: 'array', items: { type: 'object' } },
              callMetrics: { type: 'object' },
              summary: { type: 'string', example: 'Product discussion completed successfully' },
              tags: { type: 'array', items: { type: 'string' }, example: ['sales', 'follow-up'] },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:30:00.000Z' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Client not found' 
  })
  findByClient(@Param('clientId') clientId: string) {
    return this.callsService.findByClient(clientId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get completed call by ID',
    description: 'Retrieves a specific completed call by its unique ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Call ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Call retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Call retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            scheduleId: { type: 'string', example: '507f1f77bcf86cd799439012' },
            assistantId: { type: 'string', example: '507f1f77bcf86cd799439013' },
            clientId: { type: 'string', example: '507f1f77bcf86cd799439014' },
            startTime: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            endTime: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
            duration: { type: 'number', example: 1800 },
            status: { type: 'string', example: 'completed' },
            conversationLogs: { type: 'array', items: { type: 'object' } },
            callMetrics: { type: 'object' },
            summary: { type: 'string', example: 'Product discussion completed successfully' },
            tags: { type: 'array', items: { type: 'string' }, example: ['sales', 'follow-up'] },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:30:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Call not found' 
  })
  findOne(@Param('id') id: string) {
    return this.callsService.findOne(id);
  }
} 