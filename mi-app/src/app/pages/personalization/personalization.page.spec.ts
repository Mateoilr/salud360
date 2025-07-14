import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizationPage } from './personalization.page';

describe('PersonalizationPage', () => {
  let component: PersonalizationPage;
  let fixture: ComponentFixture<PersonalizationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
