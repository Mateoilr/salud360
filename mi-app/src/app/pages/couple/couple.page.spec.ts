import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouplePage } from './couple.page';

describe('CouplePage', () => {
  let component: CouplePage;
  let fixture: ComponentFixture<CouplePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CouplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
