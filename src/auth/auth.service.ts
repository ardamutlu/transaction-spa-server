import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/users.schema';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    const isPasswordMatching = await bcrypt.compare(
      password,
      user?.password || '',
    );
    if (user && isPasswordMatching) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
