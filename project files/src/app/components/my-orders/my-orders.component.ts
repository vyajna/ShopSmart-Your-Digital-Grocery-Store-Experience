import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.orders;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
      }
    });
  }

  cancelOrder(orderId: string): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Order cancelled successfully');
            this.loadOrders();
          }
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to cancel order');
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    const classes: any = {
      'Pending': 'bg-warning',
      'Processing': 'bg-info',
      'Shipped': 'bg-primary',
      'Delivered': 'bg-success',
      'Cancelled': 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
  }

  getImageUrl(imagePath: string): string {
    // Check if image is a data URI (base64 encoded)
    if (imagePath && imagePath.startsWith('data:')) {
      return imagePath;
    }
    // Check if image is an external URL
    if (imagePath && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
      return imagePath;
    }
    // Otherwise, it's a local upload
    return 'http://localhost:5100' + imagePath;
  }
}
