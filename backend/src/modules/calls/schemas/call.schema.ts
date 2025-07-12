import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CallDocument = Call & Document;

@Schema({ timestamps: true })
export class Call {
  @Prop({ type: Types.ObjectId, ref: 'Schedule', required: true })
  scheduleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Assistant', required: true })
  assistantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop()
  duration: number; // in seconds

  @Prop({ default: 'completed' })
  status: string; // in-progress, completed, failed

  @Prop({ type: [Object], default: [] })
  conversationLogs: Array<{
    timestamp: Date;
    speaker: string; // 'assistant' or 'client'
    message: string;
    type: string; // 'text', 'voice', 'action'
  }>;

  @Prop({ type: Object, default: {} })
  callMetrics: {
    totalMessages: number;
    assistantMessages: number;
    clientMessages: number;
    averageResponseTime: number;
  };

  @Prop()
  summary: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const CallSchema = SchemaFactory.createForClass(Call); 