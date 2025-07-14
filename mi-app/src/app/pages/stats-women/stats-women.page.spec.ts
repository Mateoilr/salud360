import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsWomenPage } from './stats-women.page';

describe('StatsWomenPage', () => {
  let component: StatsWomenPage;
  let fixture: ComponentFixture<StatsWomenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsWomenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
