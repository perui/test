import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {MenuService} from '../../shared/services/menu.service';
import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/model/user';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers:[MenuService,UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.get(UserService);
    userService.user = <User>{'name':'Kalle','email':'kalle@af.se'}
  });

  it('should create', () => {
    spyOn(userService, 'isAuthenticated').and.returnValue(true);
    expect(component).toBeTruthy();
  });
});
