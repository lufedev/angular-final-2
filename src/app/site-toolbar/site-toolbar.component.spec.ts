import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteToolbarComponent } from './site-toolbar.component';

describe('SiteToolbarComponent', () => {
  let component: SiteToolbarComponent;
  let fixture: ComponentFixture<SiteToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteToolbarComponent]
    });
    fixture = TestBed.createComponent(SiteToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
