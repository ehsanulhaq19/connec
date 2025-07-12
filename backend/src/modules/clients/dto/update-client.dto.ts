import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({
    description: 'Client full name',
    example: 'Jane Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Client email address',
    example: 'jane.smith@company.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+1-555-123-4567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Client company name',
    example: 'Acme Corporation',
    required: false,
  })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({
    description: 'Client preferences (key-value pairs)',
    example: { timezone: 'EST', language: 'en' },
    required: false,
  })
  @IsOptional()
  preferences?: Record<string, any>;

  @ApiProperty({
    description: 'Whether the client is active',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Additional notes about the client',
    example: ['Prefers morning calls', 'Technical background'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];
} 