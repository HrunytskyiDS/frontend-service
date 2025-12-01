import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractFile } from './extract-file';

describe('ExtractFile', () => {
  let component: ExtractFile;
  let fixture: ComponentFixture<ExtractFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtractFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtractFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
