import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../shared/services/user.service'
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from '../password-validation';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  passwordChangesSubscription: ISubscription

  constructor(
    private userService: UserService, 
    public fb: FormBuilder, 
    public router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });

    this.passwordChangesSubscription = this.form.controls.password.valueChanges
      .subscribe((data) => {
      // revalidate the confirm when the password is changed
        this.form.controls.confirmPassword.updateValueAndValidity()
      }
    );
  }
  ngOnDestroy(){
    this.passwordChangesSubscription.unsubscribe();
  }

  signUpWithEmailAndPassword() {
    if (this.form.invalid) {
      alert("Correct your formular");
      return false;
    }
    console.debug("signInWithEmailAndPassword - email: " + this.form.value.email );
    this.userService.signup(this.form.value.name, this.form.value.email, this.form.value.password)
    .then(()=>{
      console.log('signup success ');
        this.router.navigate(['/signin']);
    })
    .catch(error=>{
      this.toastrService.error(error, 'Sign up failed');
    })
  }
}
