import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopovercomponentPage} from '../popovercomponent/popovercomponent.page';
import { DataAccessService } from 'src/app/services/data-access.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebbaseService } from 'src/app/services/firebbase.service';
import { AngularFirestore } from '@angular/fire/firestore';
//jkuyfkjhgfcjfj
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public notes:Observable<Data[]>;
  ngOnInit(): void {

    this.notes=this.fbSerice.getData();
    console.log("my listing loadeed");
  }
  constructor(
    private auths:AuthenticationService,
    private router:Router,
    private ngFireAuth:AngularFireAuth,
    private fbSerice:FirebbaseService,     
    private firestore: AngularFirestore,
             
  ){
    
  }
}