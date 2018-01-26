import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformComponent } from './platform.component';
import {MenuService} from '../shared/services/menu.service';

describe('PlatformComponent', () => {
  let component: PlatformComponent;
  let fixture: ComponentFixture<PlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformComponent ],
      providers:[MenuService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
