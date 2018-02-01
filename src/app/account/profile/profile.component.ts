import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../shared/services/user.service'
import {MenuService} from '../../shared/services/menu.service';
import { PasswordValidation } from '../password-validation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editProfile:boolean
  editPassword:boolean

  contactForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    public fb: FormBuilder, 
    private userService: UserService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]]
    });

    this.passwordForm =  this.fb.group({
      password: ["", [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });

  }

  doEditProfile() {
    this.contactForm.setValue({
      name: this.userService.user.name,
      email: this.userService.user.email
    });
    this.editProfile = true;

  }

  saveEditProfile() {
    if(this.contactForm.invalid){
      alert("Not valid");
      return false;
    }
    console.log("Saved contact form")
    this.userService.user.name = this.contactForm.value.name;
    this.userService.user.email = this.contactForm.value.email;

    this.editProfile = false;
  }

  abortEditProfile() {
    this.editProfile = false;
  }

  doChangePassword(){
    this.editPassword = true;
  }

  abortChangePassword(){
    this.editPassword = false;
  }

  saveNewPassword(){
    if(this.passwordForm.invalid){
      alert("Not valid");
      return false;
    }
    console.log("Saved passwordForm")
    this.userService.user.password = this.passwordForm.value.password;
  }

}
