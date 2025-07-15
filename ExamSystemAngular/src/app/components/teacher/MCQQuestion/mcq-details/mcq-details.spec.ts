import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McqDetails } from './mcq-details';

describe('McqDetails', () => {
  let component: McqDetails;
  let fixture: ComponentFixture<McqDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McqDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
