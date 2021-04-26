import { Controller, Body, Req, Post, UseGuards, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { RequestWithUser } from './requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import JwtAuthGuard from './jwtAuth.guard';
import { Role } from 'src/roles/role.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        if (registerUserDto.roles.includes(Role.Doctor)) {
            return this.authService.registerDoctor(registerUserDto);
        } else {
            return this.authService.registerPatient(registerUserDto);
        }
    }

    @Post('log-in')
    @UseGuards(LocalAuthGuard)
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
        const {user} = request;
        const cookie = this.authService.getCookieWithJwtToken(user.email);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('log-out')
    async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        let user = request.user;
        user.password = undefined;
        return user;
    }
}
