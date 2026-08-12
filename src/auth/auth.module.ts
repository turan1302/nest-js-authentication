import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
  
    JwtModule.register({
      secret: 'deneme123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  
  providers: [
    AuthService,
    JwtStrategy // JwtStrategy'i providers'a ekliyoruz. Çünkü JwtStrategy'i kullanmak için AuthService'de inject etmemiz gerekiyor.
  ],
  controllers: [AuthController]
})
export class AuthModule {}
