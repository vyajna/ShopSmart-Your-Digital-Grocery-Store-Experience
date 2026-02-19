import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm!: FormGroup;
  loading = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = '';

    this.feedbackService.createFeedback(this.feedbackForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Thank you for your feedback!';
          this.feedbackForm.reset({ rating: 5 });
        }
        this.loading = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to submit feedback');
        this.loading = false;
      }
    });
  }
}
