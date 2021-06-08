import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GetuidComponent } from 'src/app/interfaces/GetuidComponent';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email='';
  password='';
  errorMessage="";
  loading: any;
  constructor(


    private router:Router,
    private authServices: AuthenticationService,
    public loadingController: LoadingController
  ) {

    this.loading=this.loadingController;

   }

  ngOnInit() {


  }




  onLogin(form:NgForm){
    if(form.valid){
      
      this.errorMessage="Please Wait";
     this.authServices.SignIn(this.email,this.password).then((result)=>{
      console.log(result);
      console.log(result.user.uid);
      GetuidComponent.uid=result.user.uid;
      if(result.user){
        if(result.user.emailVerified){
        console.log(result.user);
       // console.log("sdfebajdkf");
        this.router.navigate(['tabs/']);
        this.errorMessage="";

      }
      else{
        this.errorMessage="Confirm Your Email";
      }
    }


    }).catch((err)=>{
      if(err.code=='auth/user-not-found'){
        this.errorMessage="Please Registor";
      }
      else{
        this.errorMessage=err.message;
      }
    })
  }
}
  registor(){
this.router.navigateByUrl('/register');
  }

  
}