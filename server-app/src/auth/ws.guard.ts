import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConnectedSocket, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private logger: Logger = new Logger(WsJwtGuard.name);

  constructor(private authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken: string = client.handshake.headers.cookie.split('=')[1];
      const user: UserDocument = await this.authService.verifyUser(authToken);
      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}