import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoListComponent } from './campo-list.component';

describe('CampoListComponent', () => {
  let component: CampoListComponent;
  let fixture: ComponentFixture<CampoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
