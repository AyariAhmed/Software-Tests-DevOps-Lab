import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import * as bcrypt from 'bcrypt';
import { ClientSignupCredentialsDto } from '../dto/client-signup-credentials.dto';
import { Address } from '../entities/address.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { isEmail, isPhone } from '../helpers';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async signup(
    signupCredentialsDto: ClientSignupCredentialsDto,
  ): Promise<Client | null> {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      birthdate,
      governorate,
      municipality,
      street,
      location,
    } = signupCredentialsDto;

    const address: Address = new Address(
      governorate,
      municipality,
      street,
      location,
    );
    let user: Client | null;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await address.save();
      user = new Client(
        firstName,
        lastName,
        email,
        hashedPassword,
        phone,
        birthdate,
        address,
      );
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Email/Phone number already exists!');
      else throw new InternalServerErrorException();
    }

    return user;
  }

  async validateUserPassword(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<Client | null> {
    const { email_or_phone, password } = loginCredentialsDto;

    let user: Client | undefined;

    if (isEmail(email_or_phone)) {
      user = await this.findOne({ email: email_or_phone });
    } else if (isPhone(email_or_phone)) {
      user = await this.findOne({ phone: email_or_phone });
    } else {
      return null;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }
}
