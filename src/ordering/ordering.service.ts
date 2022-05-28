import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderLine } from './entities/orderLine.entity';

@Injectable()
export class OrderingService {
  async addOrder(order: Order): Promise<null> {
    order.approved = false;
    order.ready = false;

    await Order.save(order);
    order.orderLines.forEach((line) => {
      line.order = order;
      OrderLine.save(line);
    });

    return;
  }

  async approveOrder(orderId, owner) {
    const order = await Order.findOne(orderId);

    if (!order || order.restaurant.owner.id != owner.id)
      throw new UnauthorizedException('Unauthorized');
    else {
      order.approved = true;
      await Order.save(order);
    }
  }

  async disapproveOrder(orderId, owner) {
    const order = await Order.findOne(orderId);

    if (!order || order.restaurant.owner.id != owner.id)
      throw new UnauthorizedException('Unauthorized');
    else {
      order.approved = false;
      await Order.save(order);
    }
  }

  async confirmOrderIsReady(orderId, owner) {
    const order = await Order.findOne(orderId);

    if (!order || order.restaurant.owner.id != owner.id)
      throw new UnauthorizedException('Unauthorized');
    else {
      order.ready = true;
      await Order.save(order);
    }
  }

  async cancelOrderIsReady(orderId, owner) {
    const order = await Order.findOne(orderId);

    if (!order || order.restaurant.owner.id != owner.id)
      throw new UnauthorizedException('Unauthorized');
    else {
      order.ready = false;
      await Order.save(order);
    }
  }
}
