import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BemEstarPage } from './bem-estar.page';

describe('BemEstarPage', () => {
  let component: BemEstarPage;
  let fixture: ComponentFixture<BemEstarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BemEstarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
