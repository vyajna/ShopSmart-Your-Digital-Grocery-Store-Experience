import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container text-center mt-5">
      <i class="fas fa-exclamation-triangle fa-5x text-warning mb-4"></i>
      <h1 class="display-4">404</h1>
      <p class="lead">Page Not Found</p>
      <p>The page you are looking for doesn't exist.</p>
      <a routerLink="/" class="btn btn-success mt-3">
        <i class="fas fa-home me-2"></i>Go Home
      </a>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {}
