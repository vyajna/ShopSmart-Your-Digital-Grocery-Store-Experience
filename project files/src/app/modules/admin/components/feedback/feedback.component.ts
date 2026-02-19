import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  loading = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (response) => {
        if (response.success) {
          this.feedbacks = response.feedbacks;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  approveFeedback(id: string): void {
    this.feedbackService.approveFeedback(id).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Feedback approved');
          this.loadFeedbacks();
        }
      },
      error: (error) => alert(error.error?.message || 'Failed to approve feedback')
    });
  }

  deleteFeedback(id: string): void {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.feedbackService.deleteFeedback(id).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Feedback deleted');
            this.loadFeedbacks();
          }
        },
        error: (error) => alert(error.error?.message || 'Failed to delete feedback')
      });
    }
  }
}
