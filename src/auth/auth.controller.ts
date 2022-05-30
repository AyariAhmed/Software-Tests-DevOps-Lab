import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientSignupCredentialsDto } from './dto/client-signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { GetUser } from './decorators/get-user.decorator';
import { OwnerSignupCredentialsDto } from './dto/owner-signup-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-guard';
import { RolesGuard } from './guards/roles.guard';
import { hasRoles } from './decorators/roles.decorator';
import { UserRole } from './entities/roles.enum';
import { Owner } from './entities/owner.entity';
import { Client } from './entities/client.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('client/signup')
  async clientSignup(
    @Body(ValidationPipe) signupCredentialsDto: ClientSignupCredentialsDto,
  ): Promise<{ accessToken: string; client: Omit<Client, 'password'> } | void> {
    return this.authService.clientSignup(signupCredentialsDto);
  }

  @Post('client/login')
  async clientLogin(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string; client: Omit<Client, 'password'> } | void> {
    return this.authService.clientLogin(loginCredentialsDto);
  }

  @Post('owner/signup')
  async ownerSignup(
    @Body(ValidationPipe) signupCredentialsDto: OwnerSignupCredentialsDto,
  ): Promise<{ accessToken: string; owner: Omit<Owner, 'password'> } | void> {
    return this.authService.ownerSignup(signupCredentialsDto);
  }

  @Post('owner/login')
  async login(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string; owner: Omit<Owner, 'password'> } | void> {
    return this.authService.ownerLogin(loginCredentialsDto);
  }

  @Get('/test')
  @hasRoles(UserRole.CLIENT, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  testUserExtraction(@GetUser() client) {
    return client;
  }
}
