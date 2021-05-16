import { Req, Body, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { RequestWithUser } from 'src/complaints/requestWithUser.interface';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { GetDoctorAvatarDto, UpdateUserDataDto } from './dto';
import { UserService } from './user.service';
import { UseInterceptors, UploadedFile } from  '@nestjs/common';
import { diskStorage } from  'multer';
import { extname } from  'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    SERVER_URL: string = 'http://1ab42c5ed62d.ngrok.io/';
    constructor(private userService: UserService) {}

    @Post('update/data')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateUserData(@Body() body: UpdateUserDataDto) {
        return this.userService.updateUserDataById(body);
    }

    @Get('active-doctors')
    @Roles(Role.Patient)
    @UseGuards(JwtAuthGuard, RolesGuard)
    activeDoctors() {
        return this.userService.getActiveDoctors();
    }

    @Post('activate')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    activateDoctor(@Req() request: RequestWithUser) {
        const {user} = request;
        user.password = undefined;
        return this.userService.activateDoctor(user);
    }

    @Post(':user_id/avatar')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './avatars',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        }),
    }))
    uploadAvatar(@Req() request: RequestWithUser, @UploadedFile() file) {
        const {user} = request;
        user.password = undefined;
        return this.userService.setAvatar(user._id, `${this.SERVER_URL}${file.path}`);
    }

    @Get(':user_id/avatar')
    @UseGuards(JwtAuthGuard)
    downloadAvatar(@Req() request: RequestWithUser, @Res() res: Response) {
        const {user} = request;
        user.password = undefined;
        return res.sendFile(user.avatar.split('avatars/')[1], {root: 'avatars'});
    }

    @Get(':user_id')
    @Roles(Role.Doctor)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getUserById(@Req() request: RequestWithUser) {
        const {user} = request;
        user.password = undefined;
        return user;
    }

    @Get('doctor-avatar/:avatar')
    @UseGuards(JwtAuthGuard)
    getDoctorAvatar(@Req() req: Request, @Res() res: Response) {
        return res.sendFile(req.url.split('avatar/')[1], {root: 'avatars'});
    }
}
