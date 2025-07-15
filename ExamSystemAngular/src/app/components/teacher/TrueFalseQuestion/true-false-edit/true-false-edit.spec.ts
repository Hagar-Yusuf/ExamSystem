import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseEdit } from './true-false-edit';

describe('TrueFalseEdit', () => {
  let component: TrueFalseEdit;
  let fixture: ComponentFixture<TrueFalseEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
