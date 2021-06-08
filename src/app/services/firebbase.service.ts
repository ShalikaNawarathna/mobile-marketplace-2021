import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Data } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { Details } from '../interfaces/Details';
import { GetuidComponent } from '../interfaces/GetuidComponent';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root'
})
export class FirebbaseService {
  public static data : Observable<Data[]>;
  public static dataCollection:AngularFirestoreCollection<Data>;

  public  static details : Observable<Details[]>;
  public detailsCollection:AngularFirestoreCollection<Details>;
  constructor(
    private afs:AngularFirestore,

    private navCtrl: NavController
  ) {

    FirebbaseService.dataCollection=this.afs.collection<Data>('data');
    this.detailsCollection=this.afs.collection('data').doc(GetuidComponent.uid).collection<Details>('user_details');
    FirebbaseService.data=FirebbaseService.dataCollection.snapshotChanges().pipe(
      map(action=>{
        return action.map(a=>{
          //get other datat
          const data=a.payload.doc.data();
          //get key
          const id=a.payload.doc.id;
          console.log(id);
          //return
          return {id,...data};
        });
      })
    );

   

   }
   getData(): Observable<Data[]>{
      return FirebbaseService.data;
  }
  addData(data:Data):Promise<DocumentReference>{
    console.log("adding to firebase");
    return FirebbaseService.dataCollection.add(data);
  }
  updateProfile(fname, lname, pnum):Promise<void>{
    return this.detailsCollection.doc(UserDetailsService.docid).update(
      {
        fname:fname,
        lname:lname,
        pnum:pnum
      }
    )
  }
}
