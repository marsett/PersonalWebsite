import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusocialesComponent } from './menusociales.component';

describe('MenusocialesComponent', () => {
  let component: MenusocialesComponent;
  let fixture: ComponentFixture<MenusocialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenusocialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
