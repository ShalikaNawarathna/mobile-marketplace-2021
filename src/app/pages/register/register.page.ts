import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ActionSheetController, NavController, LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { register } from 'src/app/interfaces/register';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { GetuidComponent } from 'src/app/interfaces/GetuidComponent';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
   currentUser;
   email;
   slideOpts = {
     slidesPerView: 1,
     allowTouchMove: false,
   };
   hideResend: boolean;
   registration_form: FormGroup;
   hasVerifideEmail = true;
   stopInterval = false;
   sendTimestamp;
   interval;
   text="";
 
   constructor(
 
     private actionSheetController: ActionSheetController,
     private navCtrl: NavController,
     public authService: AuthenticationService,
     private formBuilder: FormBuilder,
     private afs:AngularFirestore,
     private router: Router,
     public loadingController: LoadingController
   ) {
   
   
 
   }
 
   sendEmailVerification() {
    
     this.authService.getUser().subscribe((user) => {
       user.sendEmailVerification().then((result) => {
         this.text="Confirm Email And Login";
       });
     });
   }
   passwordMatchValidator(frm: FormGroup) {
     return frm.controls['password'].value === frm.controls['confpassword'].value
       ? null
       : { mismatch: true };
   }
   signUp(value) {
     this.authService
       .RegisterUser(value.email, value.password)
       .then((res) => {
        GetuidComponent.uid=res.user.uid;
        this.afs.collection('data').doc(GetuidComponent.uid).collection('user_details').add({
          fname:'',
          lname:'',
          pnum:'',
          imageuri:'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png'

      });
 
         
        try {
         this.sendEmailVerification();
 
        } catch (error) {
          console.log("oh shit");
        }finally{
          this.router.navigate[''];
        }
 
 
       })
       .catch((error) => {
         window.alert(error.message);
       });
   }
   goNext() {
 
   }
   back(){
     this.navCtrl.navigateBack("/login");
   }
  
   ngOnInit() {
 
 
 
 
 
 
 
 
 
 
 
 
 
 
     this.registration_form = this.formBuilder.group(
       {
         email: new FormControl(
           '',
           Validators.compose([
             Validators.required,
             Validators.pattern(
               '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
             ),
           ])
         ),
        
         password: new FormControl(
           '',
           Validators.compose([Validators.minLength(5), Validators.required])
         ),
         confpassword: new FormControl(
           '',
           Validators.compose([Validators.minLength(5), Validators.required])
         ),
       },
       { validator: this.passwordMatchValidator }
     );
   }
 }