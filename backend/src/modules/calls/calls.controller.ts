import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
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
  @ApiOperation({ summary: 'Get all completed calls' })
  @ApiResponse({ status: 200, description: 'Calls retrieved successfully' })
  findAll() {
    return this.callsService.findAll();
  }

  @Get('completed')
  @ApiOperation({ summary: 'Get all completed calls' })
  @ApiResponse({ status: 200, description: 'Completed calls retrieved successfully' })
  findCompleted() {
    return this.callsService.findCompleted();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent completed calls' })
  @ApiResponse({ status: 200, description: 'Recent calls retrieved successfully' })
  findRecent(@Query('limit') limit: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.callsService.findRecent(limitNum);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get call analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
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
  @ApiOperation({ summary: 'Get calls by client' })
  @ApiResponse({ status: 200, description: 'Calls by client retrieved successfully' })
  findByClient(@Param('clientId') clientId: string) {
    return this.callsService.findByClient(clientId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get completed call by ID' })
  @ApiResponse({ status: 200, description: 'Call retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.callsService.findOne(id);
  }
} 