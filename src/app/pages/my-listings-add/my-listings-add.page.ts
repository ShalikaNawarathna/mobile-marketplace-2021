import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { tap, finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataAccessService } from 'src/app/services/data-access.service';
import { Data, Router } from '@angular/router';
import { FirebbaseService } from 'src/app/services/firebbase.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-my-listings-add',
  templateUrl: './my-listings-add.page.html',
  styleUrls: ['./my-listings-add.page.scss'],
})
export class MyListingsAddPage implements OnInit {
  ngOnInit(): void {
   
  }
  data:Data={
    title:'',
    description:'',
    price:''
  }
  constructor(
    private auths:AuthenticationService,
    private router:Router,
    private fbSerice:FirebbaseService,
    private ngFireAuth:AngularFireAuth
      ) { }
      onClickSave(){
        this.fbSerice.addData(this.data);
        this.router.navigateByUrl('/tabs/home');
        this.data.title = '';
        this.data.description = '';
        this.data.price = '';
      }
}