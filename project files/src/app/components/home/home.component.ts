import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = true;
  selectedCategory = '';
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.categories;
        }
      },
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  loadProducts(): void {
    this.loading = true;
    const filters: any = {};
    if (this.selectedCategory) filters.category = this.selectedCategory;
    if (this.searchTerm) filters.search = this.searchTerm;

    this.productService.getAllProducts(filters).subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.products;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  filterByCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.loadProducts();
  }

  search(): void {
    this.loadProducts();
  }

  addToCart(product: any): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart({ productId: product._id, quantity: 1 }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Product added to cart!');
        }
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to add product to cart');
      }
    });
  }

  viewDetails(productId: string): void {
    this.router.navigate(['/product', productId]);
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

  onImageError(event: any): void {
    // Fallback to a colored placeholder if image fails to load
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIyOEIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
  }
}
