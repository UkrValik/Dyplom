import { Request } from 'express';
import { User } from '../user/schemas/user.schema';

export interface RequestWithUser extends Request {
    user: User,
}
