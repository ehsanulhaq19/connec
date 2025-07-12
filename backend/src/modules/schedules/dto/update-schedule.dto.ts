import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDateString, IsEnum, IsObject } from 'class-validator';

export class UpdateScheduleDto {
  @ApiProperty({
    description: 'Assistant ID for the scheduled call',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsOptional()
  @IsString()
  assistantId?: string;

  @ApiProperty({
    description: 'Client ID for the scheduled call',
    example: '507f1f77bcf86cd799439012',
    required: false,
  })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiProperty({
    description: 'Scheduled date and time for the call',
    example: '2024-01-15T10:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @ApiProperty({
    description: 'Duration of the call in minutes',
    example: 30,
    minimum: 5,
    maximum: 120,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({
    description: 'Status of the scheduled call',
    example: 'scheduled',
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['scheduled', 'in-progress', 'completed', 'cancelled'])
  status?: string;

  @ApiProperty({
    description: 'Additional notes for the scheduled call',
    example: 'Follow up on previous conversation about pricing',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Call settings and configuration',
    example: { recording: true, transcription: true, language: 'en-US' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  callSettings?: Record<string, any>;
} 