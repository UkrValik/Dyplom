import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    public async registerPatient(registerUserDto: RegisterUserDto) {
        const hashedPassword = await hash(registerUserDto.password, 10);
        try {
            let createdUser = await this.userService.createPatient({
                ...registerUserDto,
                password: hashedPassword,
            });
            createdUser.password = undefined;
            return createdUser;
        } catch(error) {
            console.log(error);
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    public async registerDoctor(registerUserDto: RegisterUserDto) {
        const hashedPassword = await hash(registerUserDto.password, 10);
        try {
            let createdUser = await this.userService.createDoctor({
                ...registerUserDto,
                password: hashedPassword,
            });
            createdUser.password = undefined;
            return createdUser;
        } catch(error) {
            console.log(error);
            throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    public async getAuthenticatedUser(email: string, plainPassword: string) {
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword(plainPassword, user.password);
            user.password = undefined;
            return user;
        } catch(error) {
            throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: string) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }

    private async verifyPassword(plainPassword: string, hashedPassword: string) {
        const isPasswordMatching = await compare(plainPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
        }
    }

    public async verifyUser(token: string) {
        const res = await this.jwtService.verify(token);
        const user = await this.userService.getByEmail(res.userId);
        return user;
    }
}
