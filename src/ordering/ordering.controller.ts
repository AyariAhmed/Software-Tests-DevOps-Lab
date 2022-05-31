import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Order } from './entities/order.entity';
import { OrderingService } from './ordering.service';
import { Client } from '../auth/entities/client.entity';

@Controller('ordering')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderingController {
  constructor(private orderingService: OrderingService) {}

  @hasRoles(UserRole.CLIENT)
  @Post('addOrder')
  async addOrder(
    @Body(ValidationPipe) order: Order,
    @GetUser() client: Client,
  ): Promise<null> {
    order.client = client;
    return await this.orderingService.addOrder(order);
  }

  @hasRoles(UserRole.CLIENT)
  @Get('client/getOrders')
  getClientOrders(@GetUser() client: Client) {
    return Order.find({ client: client });
  }

  @hasRoles(UserRole.OWNER)
  @Get('owner/getOrders')
  async getOwnerOrders(@GetUser() owner) {
    const restaurant = await Restaurant.findOne({ owner: owner });

    return Order.find({ restaurant: restaurant });
  }

  @hasRoles(UserRole.OWNER)
  @Get('approveOrder/:id')
  async approveOrder(@Param('id') orderId, @GetUser() owner) {
    await this.orderingService.approveOrder(orderId, owner);
  }

  @hasRoles(UserRole.OWNER)
  @Get('disapproveOrder/:id')
  async disapproveOrder(@Param('id') orderId, @GetUser() owner) {
    await this.orderingService.disapproveOrder(orderId, owner);
  }

  @hasRoles(UserRole.OWNER)
  @Get('confirmOrderIsReady/:id')
  async confirmOrderIsReady(@Param('id') orderId, @GetUser() owner) {
    await this.orderingService.confirmOrderIsReady(orderId, owner);
  }

  @hasRoles(UserRole.OWNER)
  @Get('cancelOrderIsReady/:id')
  async cancelOrderIsReady(@Param('id') orderId, @GetUser() owner) {
    await this.orderingService.cancelOrderIsReady(orderId, owner);
  }
}
