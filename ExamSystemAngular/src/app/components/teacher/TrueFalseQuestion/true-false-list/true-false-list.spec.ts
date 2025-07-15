import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseList } from './true-false-list';

describe('TrueFalseList', () => {
  let component: TrueFalseList;
  let fixture: ComponentFixture<TrueFalseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
