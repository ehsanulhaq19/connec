import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ type: Types.ObjectId, ref: 'Assistant', required: true })
  assistantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Client', required: true })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  scheduledDate: Date;

  @Prop({ required: true })
  duration: number; // in minutes

  @Prop({ default: 'scheduled' })
  status: string; // scheduled, in-progress, completed, cancelled

  @Prop()
  notes: string;

  @Prop({ type: Object, default: {} })
  callSettings: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule); 