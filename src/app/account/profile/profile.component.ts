import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { KeycloakService } from '../../shared/services/keycloak/keycloak.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  

  constructor(
    private idp:KeycloakService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    

    this.idp.client().loadUserInfo()
    .success(userinfo=> console.log("loadUserInfo: ",userinfo))
    .error(error=>{
      console.error("loadUserInfo error:",error)
      this.toastrService.error("Failed to load user info");
    })

    this.idp.client().loadUserProfile()
    .success(profile=>console.log("loadUserProfile:",profile))
    .error(error=>{
      console.error("loadUserProfile error:",error)
      this.toastrService.error("Failed to load user profile");
    })
    
  }

  doEditProfile() {
    this.idp.client().accountManagement()
    .success(()=>console.log("accountManagement ok"))
    .error(error=>console.log("accountManagement error",error))
  }


}
