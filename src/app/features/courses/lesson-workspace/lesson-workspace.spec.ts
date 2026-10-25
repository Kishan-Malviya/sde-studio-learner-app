import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LessonWorkspace } from './lesson-workspace';

describe('LessonWorkspace', () => {
  let component: LessonWorkspace;
  let fixture: ComponentFixture<LessonWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonWorkspace],
      providers: [
        provideRouter([
          { path: 'courses', component: DummyRouteComponent },
          { path: 'courses/:id', component: DummyRouteComponent },
          { path: 'courses/:id/learn/:lessonId', component: DummyRouteComponent },
          { path: 'courses/:id/learn', component: DummyRouteComponent },
        ]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => null,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonWorkspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ template: '' })
class DummyRouteComponent {}