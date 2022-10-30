import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate({ email }: User): Promise<User> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
