import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorListComponent } from './autor-list.component';

describe('AutorListComponent', () => {
  let component: AutorListComponent;
  let fixture: ComponentFixture<AutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
