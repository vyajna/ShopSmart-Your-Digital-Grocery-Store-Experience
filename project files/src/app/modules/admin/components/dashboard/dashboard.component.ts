import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { OrderService } from '../../../../services/order.service';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    pendingOrders: 0
  };

  recentOrders: any[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats.totalProducts = response.products.length;
        }
      },
      error: (error) => console.error('Error loading products:', error)
    });

    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats.totalCategories = response.categories.length;
        }
      },
      error: (error) => console.error('Error loading categories:', error)
    });

    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats.totalOrders = response.orders.length;
          this.stats.pendingOrders = response.orders.filter((o: any) => o.orderStatus === 'Pending').length;
          this.recentOrders = response.orders.slice(0, 5);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.loading = false;
      }
    });
  }
}
