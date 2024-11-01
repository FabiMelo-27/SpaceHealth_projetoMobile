import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SintomasDiariosPage } from './sintomas-diarios.page';

describe('SintomasDiariosPage', () => {
  let component: SintomasDiariosPage;
  let fixture: ComponentFixture<SintomasDiariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SintomasDiariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
