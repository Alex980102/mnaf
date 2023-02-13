import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true, collection: 'users' })
export class Auth {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: false,
  })
  name: string;

  @Prop({
    required: false,
    default: 'USER_ROLE',
  })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
