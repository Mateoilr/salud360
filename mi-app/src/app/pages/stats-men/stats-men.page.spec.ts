import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsMenPage } from './stats-men.page';

describe('StatsMenPage', () => {
  let component: StatsMenPage;
  let fixture: ComponentFixture<StatsMenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsMenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
