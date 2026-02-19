import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemsCount = 0;
  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.loadCartCount();
      }
    });

    this.cartService.cartItemsCount$.subscribe(count => {
      this.cartItemsCount = count;
    });
  }

  loadCartCount(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success) {
          this.cartItemsCount = response.cart.items.length;
        }
      },
      error: (error) => console.error('Error loading cart count:', error)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
