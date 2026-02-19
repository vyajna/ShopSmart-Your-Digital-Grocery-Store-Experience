export interface Feedback {
  _id: string;
  user: string;
  product?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: Date;
}

export interface CreateFeedbackRequest {
  product?: string;
  rating: number;
  comment: string;
}
