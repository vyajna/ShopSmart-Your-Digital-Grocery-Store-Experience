import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cart: any = null;
  loading = true;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success) {
          this.cart = response.cart;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.loading = false;
      }
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateCartItem({ productId, quantity }).subscribe({
      next: (response) => {
        if (response.success) {
          this.cart = response.cart;
        }
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to update cart');
      }
    });
  }

  removeItem(productId: string): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(productId).subscribe({
        next: (response) => {
          if (response.success) {
            this.cart = response.cart;
          }
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to remove item');
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe({
        next: (response) => {
          if (response.success) {
            this.cart = response.cart;
          }
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to clear cart');
        }
      });
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/place-order']);
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
