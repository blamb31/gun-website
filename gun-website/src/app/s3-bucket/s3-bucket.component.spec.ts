import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { S3BucketComponent } from './s3-bucket.component';

describe('S3BucketComponent', () => {
  let component: S3BucketComponent;
  let fixture: ComponentFixture<S3BucketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S3BucketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S3BucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
