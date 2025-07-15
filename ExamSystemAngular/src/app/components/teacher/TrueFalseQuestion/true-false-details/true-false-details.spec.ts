import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseDetails } from './true-false-details';

describe('TrueFalseDetails', () => {
  let component: TrueFalseDetails;
  let fixture: ComponentFixture<TrueFalseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
