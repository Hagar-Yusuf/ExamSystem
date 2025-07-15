import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseAdd } from './true-false-add';

describe('TrueFalseAdd', () => {
  let component: TrueFalseAdd;
  let fixture: ComponentFixture<TrueFalseAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
