import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SynCouplePage } from './syn-couple.page';

describe('SynCouplePage', () => {
  let component: SynCouplePage;
  let fixture: ComponentFixture<SynCouplePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SynCouplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
