import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { configuration } from 'src/config/configuration';

export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().jwt_secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
