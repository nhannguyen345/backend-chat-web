import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('cktoken')
    checkToken(@Body() checkTokenDto: Record<string, any>) {
        return this.authService.checkToken(checkTokenDto.token);
    }
}
