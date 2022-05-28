import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from '../repositories/client.repository';
import { OwnerRepository } from '../repositories/owner.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
    @InjectRepository(OwnerRepository) private ownerRepository: OwnerRepository,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    return roles.includes(user.role);
  }
}
