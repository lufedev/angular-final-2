import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating-status-selection',
  templateUrl: './rating-status-selection.component.html',
  styleUrls: ['./rating-status-selection.component.css']
})
export class RatingStatusSelectionComponent {
  nota: number = 0;
  status: string = '';

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  rate(rating: number): void {
    this.nota = rating;
  }

  submitRatingStatus(): void {
    // Emit the selected rating and status data back to the main component
    this.onSubmit.emit({ nota: this.nota, status: this.status });
  }
}
