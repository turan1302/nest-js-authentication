import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'deneme123',

      // burada jwt token'ının geçerli olup olmadığını kontrol ediyoruz
    });
  }

  async validate(payload: { id: number; username: string }) {
    // return edilen obje req.user olur
    return { id: payload.id, username: payload.username };
  }
}