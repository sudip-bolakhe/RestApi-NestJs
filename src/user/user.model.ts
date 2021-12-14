import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
