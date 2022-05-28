import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../entities/client.entity';
import * as config from 'config';
import { OwnerRepository } from '../repositories/owner.repository';
import { UserRole } from '../entities/roles.enum';
import { Owner } from '../entities/owner.entity';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
    @InjectRepository(OwnerRepository) private ownerRepository: OwnerRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<Client | Owner> {
    const { email, role } = payload;
    let user: Client | Owner;
    if (role === UserRole.CLIENT) {
      user = await this.clientRepository.findOne({ email });
    } else if (role === UserRole.OWNER) {
      user = await this.ownerRepository.findOne({ email });
    } else {
      throw new UnauthorizedException('Role not defined.');
    }

    if (!user) throw new UnauthorizedException('User Not found.');

    return user;
  }
}
