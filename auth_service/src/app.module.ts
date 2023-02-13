import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';

@Module({
  imports: [
    AuthModule,
    // Tomar a direccion de la base de datos de la ruta de la maquina virtual y establecerla en un archivo .env
    MongooseModule.forRoot('mongodb://localhost:27017/pruebadb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/login/renew');
  }
}
