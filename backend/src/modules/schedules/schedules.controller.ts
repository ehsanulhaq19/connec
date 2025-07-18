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
import { SchedulesService } from './schedules.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@ApiTags('Call Scheduler')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Schedule a new call',
    description: 'Creates a new scheduled call between an assistant and a client at the specified time.'
  })
  @ApiBody({ type: CreateScheduleDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Call scheduled successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Call scheduled successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
            clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
            scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            duration: { type: 'number', example: 30 },
            status: { type: 'string', example: 'scheduled' },
            notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
            callSettings: { type: 'object', example: { recording: true, transcription: true } },
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
    status: HttpStatus.NOT_FOUND, 
    description: 'Assistant or client not found' 
  })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all scheduled calls',
    description: 'Retrieves a list of all scheduled calls in the system. Requires authentication.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Schedules retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Schedules retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              duration: { type: 'number', example: 30 },
              status: { type: 'string', example: 'scheduled' },
              notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
              callSettings: { type: 'object', example: { recording: true, transcription: true } },
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
    return this.schedulesService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ 
    summary: 'Get upcoming scheduled calls',
    description: 'Retrieves a list of all upcoming scheduled calls that are not yet completed or cancelled.'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Upcoming schedules retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Upcoming schedules retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              duration: { type: 'number', example: 30 },
              status: { type: 'string', example: 'scheduled' },
              notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
              callSettings: { type: 'object', example: { recording: true, transcription: true } },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
            }
          }
        }
      }
    }
  })
  findUpcoming() {
    return this.schedulesService.findUpcoming();
  }

  @Get('status/:status')
  @ApiOperation({ 
    summary: 'Get calls by status',
    description: 'Retrieves all scheduled calls filtered by their current status.'
  })
  @ApiParam({ 
    name: 'status', 
    description: 'Call status', 
    example: 'scheduled',
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled']
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Schedules by status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Schedules by status retrieved successfully' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
              clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
              scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              duration: { type: 'number', example: 30 },
              status: { type: 'string', example: 'scheduled' },
              notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
              callSettings: { type: 'object', example: { recording: true, transcription: true } },
              createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
            }
          }
        }
      }
    }
  })
  findByStatus(@Param('status') status: string) {
    return this.schedulesService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get scheduled call by ID',
    description: 'Retrieves a specific scheduled call by its unique ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Schedule ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Schedule retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Schedule retrieved successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
            clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
            scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            duration: { type: 'number', example: 30 },
            status: { type: 'string', example: 'scheduled' },
            notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
            callSettings: { type: 'object', example: { recording: true, transcription: true } },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Schedule not found' 
  })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update scheduled call',
    description: 'Updates an existing scheduled call with the provided information. Only provided fields will be updated.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Schedule ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiBody({ type: UpdateScheduleDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Schedule updated successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Schedule updated successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
            clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
            scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            duration: { type: 'number', example: 30 },
            status: { type: 'string', example: 'scheduled' },
            notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
            callSettings: { type: 'object', example: { recording: true, transcription: true } },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Schedule not found' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data' 
  })
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ 
    summary: 'Cancel scheduled call',
    description: 'Cancels a scheduled call by setting its status to cancelled.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Schedule ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Schedule cancelled successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Schedule cancelled successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
            clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
            scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            duration: { type: 'number', example: 30 },
            status: { type: 'string', example: 'cancelled' },
            notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
            callSettings: { type: 'object', example: { recording: true, transcription: true } },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Schedule not found' 
  })
  cancel(@Param('id') id: string) {
    return this.schedulesService.cancelSchedule(id);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete scheduled call',
    description: 'Permanently deletes a scheduled call from the system. This action cannot be undone.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Schedule ID', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Schedule deleted successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'success' },
        message: { type: 'string', example: 'Schedule deleted successfully' },
        data: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            assistantId: { type: 'string', example: '507f1f77bcf86cd799439012' },
            clientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
            scheduledDate: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            duration: { type: 'number', example: 30 },
            status: { type: 'string', example: 'scheduled' },
            notes: { type: 'string', example: 'Follow up on previous conversation about pricing' },
            callSettings: { type: 'object', example: { recording: true, transcription: true } },
            createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Schedule not found' 
  })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
} 