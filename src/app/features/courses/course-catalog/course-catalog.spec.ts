import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseCatalog } from './course-catalog';

describe('CourseCatalog', () => {
  let component: CourseCatalog;
  let fixture: ComponentFixture<CourseCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCatalog, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
