import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractUrl } from './extract-url';

describe('ExtractUrl', () => {
  let component: ExtractUrl;
  let fixture: ComponentFixture<ExtractUrl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtractUrl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtractUrl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
