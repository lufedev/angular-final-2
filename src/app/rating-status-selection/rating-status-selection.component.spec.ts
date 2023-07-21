import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStatusSelectionComponent } from './rating-status-selection.component';

describe('RatingStatusSelectionComponent', () => {
  let component: RatingStatusSelectionComponent;
  let fixture: ComponentFixture<RatingStatusSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingStatusSelectionComponent]
    });
    fixture = TestBed.createComponent(RatingStatusSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
