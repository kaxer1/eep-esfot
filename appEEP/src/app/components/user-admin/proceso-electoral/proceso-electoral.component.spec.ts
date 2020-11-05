import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoElectoralComponent } from './proceso-electoral.component';

describe('ProcesoElectoralComponent', () => {
  let component: ProcesoElectoralComponent;
  let fixture: ComponentFixture<ProcesoElectoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoElectoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoElectoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
