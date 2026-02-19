import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.orders;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, { orderStatus: status }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Order status updated');
          this.loadOrders();
        }
      },
      error: (error) => alert(error.error?.message || 'Failed to update order')
    });
  }
}
