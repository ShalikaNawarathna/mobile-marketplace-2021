import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {PopovercomponentPage} from '../popovercomponent/popovercomponent.page';
import { DataAccessService } from 'src/app/services/data-access.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { FirebbaseService } from 'src/app/services/firebbase.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  ngOnInit(): void {
    this.registration_form = this.formBuilder.group(
      {

        fname: new FormControl('', Validators.compose([])),
        lname: new FormControl('', Validators.compose([])),
        pnum: new FormControl('', Validators.compose([]))

      },

    );
  }
  registration_form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private fbSerice:FirebbaseService,
    public router:Router
  ) { }
  update(value){
    this.fbSerice.updateProfile(value.fname, value.lname, value.pnum);
    console.log("update successfull");
    this.router.navigateByUrl('tabs/profile');
  }
  back(){
    this.router.navigate(['tabs/profile']);
  }
}