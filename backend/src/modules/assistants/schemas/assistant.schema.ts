import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssistantDocument = Assistant & Document;

@Schema({ timestamps: true })
export class Assistant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  voiceType: string;

  @Prop({ default: 'en-US' })
  language: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object, default: {} })
  aiConfig: Record<string, any>;

  @Prop({ type: [String], default: [] })
  specializations: string[];
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant); 