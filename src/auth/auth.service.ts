import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        // if (user?.password !== pass) {
        //     throw new UnauthorizedException();
        // }
        // const payload = { sub: user.id, username: user.username };
        // return {
        //     access_token: await this.jwtService.signAsync(payload),
        // };
        const match = await bcrypt.compare(pass, user?.password);
        if (match) {
            const payload = { sub: user.id, username: user.username };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } else {
            throw new UnauthorizedException();
        }
    }

    async checkToken(token: string): Promise<any> {
        return {
            checked_token: await this.jwtService.verifyAsync(token),
        };
    }
}
