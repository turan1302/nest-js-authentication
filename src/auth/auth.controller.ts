import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtGuardGuard } from './guards/jwt-guard/jwt-guard.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

    @Get('profile')
    @UseGuards(JwtGuardGuard)
    profile(@Req() req: { user: { id: number; username: string } }) {
        return this.authService.profile(req.user);
    }
}
