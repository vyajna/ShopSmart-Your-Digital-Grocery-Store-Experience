import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  loading = true;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.product = response.product;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart({ 
      productId: this.product._id, 
      quantity: this.quantity 
    }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Product added to cart!');
          this.router.navigate(['/cart']);
        }
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to add product to cart');
      }
    });
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
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
