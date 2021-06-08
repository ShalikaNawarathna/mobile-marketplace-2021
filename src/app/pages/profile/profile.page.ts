import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {PopovercomponentPage} from '../popovercomponent/popovercomponent.page';
import { DataAccessService } from 'src/app/services/data-access.service';
import { Observable } from 'rxjs';
import { Details } from 'src/app/interfaces/Details';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { FirebbaseService } from 'src/app/services/firebbase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { GetuidComponent } from 'src/app/interfaces/GetuidComponent';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user : Observable<Details[]>;
  imageuri:string;
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  oc:string;
  uploading:string;
  
  static username:string;
  ngOnInit(): void {
    
  }
  constructor(private auths:AuthenticationService,
    private router:Router,
    private ngFireAuth:AngularFireAuth,
    private afs:AngularFirestore,
    private udtl:UserDetailsService,
    private ff:FirebbaseService,

private storage: AngularFireStorage,




    ) {


      this.udtl.ngOnInit();
      console.log("profile page constructor");
      this.user=this.udtl.getNotes();
   
    
     this.user.subscribe(x => x.forEach(p=>{
       this.imageuri=p.imageuri;
      
     }))

    }
    gotoEdit(){
      this.router.navigateByUrl('/profile-edit');
    }
    choose(){
      if(this.selectedImage!=null){
        return false;
      }
      return true;
    }
    delete(downloadUrl) {
      try{
        return this.storage.storage.refFromURL(downloadUrl).delete();
      }catch{
        console.log("no image");
      }
  
    }


    save() {

      var name= this.selectedImage.name;
       console.log(name);
      
       this.uploading="uploading your image please wait";
       this.delete(this.imageuri)
       console.log(" old image deleted");
   
       const fileRef = this.storage.ref(name);
       this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
         finalize(() => {
           fileRef.getDownloadURL().subscribe((url) => {
             this.url = url;
             console.log(UserDetailsService.docid);
             this.afs.collection('data').doc(GetuidComponent.uid).collection('user_details').doc(UserDetailsService.docid).update({
               imageuri:url
             })
           })
           this.uploading="";
   
         })
       ).subscribe();
   
     }
     showPreview(event: any) {
      this.selectedImage = event.target.files[0];
    }
  
}