import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './repositories/client.repository';
import { ClientSignupCredentialsDto } from './dto/client-signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Client } from './entities/client.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UserRole } from './entities/roles.enum';
import { OwnerRepository } from './repositories/owner.repository';
import { Owner } from './entities/owner.entity';
import { OwnerSignupCredentialsDto } from './dto/owner-signup-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
    @InjectRepository(OwnerRepository) private ownerRepository: OwnerRepository,
    private jwtService: JwtService,
  ) {}

  async clientSignup(
    signupCredentialsDto: ClientSignupCredentialsDto,
  ): Promise<{ accessToken: string; client: Client } | null> {
    const newUser: Client | null = await this.clientRepository.signup(
      signupCredentialsDto,
    );
    if (newUser) {
      const accessToken = await this.signJwt(newUser.email, newUser.role);
      return {
        accessToken: accessToken,
        client: newUser,
      };
    }
  }

  async clientLogin(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string; client: Client } | null> {
    const user: Client | null = await this.clientRepository.validateUserPassword(
      loginCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.signJwt(user.email, user.role);
    return {
      accessToken,
      client: user,
    };
  }

  async ownerSignup(
    signupCredentialsDto: OwnerSignupCredentialsDto,
  ): Promise<{ accessToken: string; owner: Owner } | null> {
    const newUser: Owner | null = await this.ownerRepository.signup(
      signupCredentialsDto,
    );
    if (newUser) {
      const accessToken = await this.signJwt(newUser.email, newUser.role);
      return {
        accessToken,
        owner: newUser,
      };
    }
  }

  async ownerLogin(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string; owner: Owner } | null> {
    const user: Owner | null = await this.ownerRepository.validateUserPassword(
      loginCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const accessToken = await this.signJwt(user.email, user.role);
    return {
      accessToken,
      owner: user,
    };
  }

  private async signJwt(email: string, role: UserRole): Promise<string> {
    const payload: JwtPayload = { email, role };
    return this.jwtService.sign(payload);
  }
}
