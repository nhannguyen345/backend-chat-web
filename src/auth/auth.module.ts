import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: '1h' } }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
