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
import { AssistantsService } from './assistants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Virtual Assistants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assistants')
export class AssistantsController {
  constructor(private readonly assistantsService: AssistantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new virtual assistant' })
  @ApiResponse({ status: 201, description: 'Assistant created successfully' })
  create(@Body() createAssistantDto: any) {
    return this.assistantsService.create(createAssistantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all virtual assistants' })
  @ApiResponse({ status: 200, description: 'Assistants retrieved successfully' })
  findAll() {
    return this.assistantsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active virtual assistants' })
  @ApiResponse({ status: 200, description: 'Active assistants retrieved successfully' })
  findActive() {
    return this.assistantsService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get virtual assistant by ID' })
  @ApiResponse({ status: 200, description: 'Assistant retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.assistantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update virtual assistant' })
  @ApiResponse({ status: 200, description: 'Assistant updated successfully' })
  update(@Param('id') id: string, @Body() updateAssistantDto: any) {
    return this.assistantsService.update(id, updateAssistantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete virtual assistant' })
  @ApiResponse({ status: 200, description: 'Assistant deleted successfully' })
  remove(@Param('id') id: string) {
    return this.assistantsService.remove(id);
  }
} 