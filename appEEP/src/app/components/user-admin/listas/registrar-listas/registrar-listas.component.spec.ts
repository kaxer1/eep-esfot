import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarListasComponent } from './registrar-listas.component';

describe('RegistrarListasComponent', () => {
  let component: RegistrarListasComponent;
  let fixture: ComponentFixture<RegistrarListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarListasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
