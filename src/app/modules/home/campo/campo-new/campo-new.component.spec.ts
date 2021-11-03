import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoNewComponent } from './campo-new.component';

describe('CampoNewComponent', () => {
  let component: CampoNewComponent;
  let fixture: ComponentFixture<CampoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
