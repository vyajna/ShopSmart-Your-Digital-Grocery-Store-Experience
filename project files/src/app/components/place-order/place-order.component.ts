import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderForm!: FormGroup;
  cart: any = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.orderForm = this.fb.group({
      shippingAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      paymentMethod: ['Cash on Delivery', Validators.required]
    });
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success) {
          this.cart = response.cart;
          if (this.cart.items.length === 0) {
            this.router.navigate(['/cart']);
          }
        }
      },
      error: (error) => console.error('Error loading cart:', error)
    });
  }

  placeOrder(): void {
    if (this.orderForm.invalid) {
      return;
    }

    this.loading = true;
    this.orderService.createOrder(this.orderForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Order placed successfully!');
          this.router.navigate(['/orders']);
        }
        this.loading = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to place order');
        this.loading = false;
      }
    });
  }
}
