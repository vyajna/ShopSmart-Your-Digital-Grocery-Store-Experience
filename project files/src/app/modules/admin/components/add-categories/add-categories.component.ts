import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categoryForm!: FormGroup;
  categories: any[] = [];
  loading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.loadCategories();
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('description', this.categoryForm.value.description || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.loading = true;
    this.categoryService.createCategory(formData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Category added successfully!');
          this.categoryForm.reset();
          this.selectedFile = null;
          this.loadCategories();
        }
        this.loading = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to add category');
        this.loading = false;
      }
    });
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Category deleted successfully');
            this.loadCategories();
          }
        },
        error: (error) => alert(error.error?.message || 'Failed to delete category')
      });
    }
  }
}
