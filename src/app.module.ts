import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';



@Module({
  imports: [
    UserModule, 
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '3010',
      database: 'trabelian',
      entities: [User],
      synchronize: true,
      dropSchema: false
    })
  ],
  controllers: 
    [AppController],
  providers: 
    [AppService],
})
export class AppModule {}
