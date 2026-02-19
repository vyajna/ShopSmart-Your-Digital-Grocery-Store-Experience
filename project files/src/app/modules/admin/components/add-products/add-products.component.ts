import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  productForm!: FormGroup;
  categories: any[] = [];
  products: any[] = [];
  loading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadProducts();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      unit: ['piece', Validators.required],
      brand: [''],
      discount: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.categories;
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.products;
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.selectedFile) {
      alert('Please fill all required fields and select an image');
      return;
    }

    const formData = new FormData();
    Object.keys(this.productForm.value).forEach(key => {
      formData.append(key, this.productForm.value[key]);
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.loading = true;
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Product added successfully!');
          this.productForm.reset({ unit: 'piece', discount: 0 });
          this.selectedFile = null;
          this.loadProducts();
        }
        this.loading = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to add product');
        this.loading = false;
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Product deleted successfully');
            this.loadProducts();
          }
        },
        error: (error) => alert(error.error?.message || 'Failed to delete product')
      });
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
