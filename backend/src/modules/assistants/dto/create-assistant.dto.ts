import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, IsObject } from 'class-validator';

export class CreateAssistantDto {
  @ApiProperty({
    description: 'Assistant name',
    example: 'Alex - Customer Support',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Assistant description',
    example: 'A friendly customer support assistant specializing in product inquiries',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Voice type for the assistant',
    example: 'en-US-Neural2-F',
    enum: ['en-US-Neural2-F', 'en-US-Neural2-M', 'en-GB-Neural2-F', 'en-GB-Neural2-M'],
  })
  @IsString()
  voiceType: string;

  @ApiProperty({
    description: 'Language code',
    example: 'en-US',
    default: 'en-US',
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Whether the assistant is active',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'AI configuration settings',
    example: { model: 'gpt-4', temperature: 0.7, maxTokens: 1000 },
    required: false,
  })
  @IsOptional()
  @IsObject()
  aiConfig?: Record<string, any>;

  @ApiProperty({
    description: 'Assistant specializations',
    example: ['customer support', 'sales', 'technical support'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specializations?: string[];
} 