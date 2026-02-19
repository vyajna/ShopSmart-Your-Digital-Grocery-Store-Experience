import { Component } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  template: `
    <div class="text-center my-5">
      <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: []
})
export class LoaderSpinnerComponent {}
