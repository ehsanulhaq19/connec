import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Call Scheduler')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule a new call' })
  @ApiResponse({ status: 201, description: 'Call scheduled successfully' })
  create(@Body() createScheduleDto: any) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scheduled calls' })
  @ApiResponse({ status: 200, description: 'Schedules retrieved successfully' })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming scheduled calls' })
  @ApiResponse({ status: 200, description: 'Upcoming schedules retrieved successfully' })
  findUpcoming() {
    return this.schedulesService.findUpcoming();
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Get calls by status' })
  @ApiResponse({ status: 200, description: 'Schedules by status retrieved successfully' })
  findByStatus(@Param('status') status: string) {
    return this.schedulesService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get scheduled call by ID' })
  @ApiResponse({ status: 200, description: 'Schedule retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update scheduled call' })
  @ApiResponse({ status: 200, description: 'Schedule updated successfully' })
  update(@Param('id') id: string, @Body() updateScheduleDto: any) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel scheduled call' })
  @ApiResponse({ status: 200, description: 'Schedule cancelled successfully' })
  cancel(@Param('id') id: string) {
    return this.schedulesService.cancelSchedule(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete scheduled call' })
  @ApiResponse({ status: 200, description: 'Schedule deleted successfully' })
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
} 