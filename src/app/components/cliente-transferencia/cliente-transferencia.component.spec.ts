import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTransferenciaComponent } from './cliente-transferencia.component';

describe('ClienteTransferenciaComponent', () => {
  let component: ClienteTransferenciaComponent;
  let fixture: ComponentFixture<ClienteTransferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteTransferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
