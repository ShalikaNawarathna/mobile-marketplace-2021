import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Details } from '../interfaces/Details';
import {map, take} from 'rxjs/operators';
import { GetuidComponent } from '../interfaces/GetuidComponent';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  public  static notes : Observable<Details[]>;
  public noteCollection:AngularFirestoreCollection<Details>;
  public static docid:string;
  constructor(
    private afs:AngularFirestore,

    private navCtrl: NavController
  ) {console.log("addpage " + GetuidComponent.uid);
  //define collection
  //this.noteCollection=this.afs.collection<Note>('notes');
  this.noteCollection=this.afs.collection('data').doc(GetuidComponent.uid).collection<Details>('user_details');

  //get collection data
  UserDetailsService.notes=this.noteCollection.snapshotChanges().pipe(
    map(action=>{
      return action.map(a=>{
        //get other datat
        const data=a.payload.doc.data();
        //get key
        const id=a.payload.doc.id;
        UserDetailsService.docid=id;
        console.log(id);
        //return
        return {id,...data};
      });
    })
  );


}
  ngOnInit(){
    this.noteCollection=this.afs.collection('data').doc(GetuidComponent.uid).collection<Details>('user_details');

    //get collection data
    UserDetailsService.notes=this.noteCollection.snapshotChanges().pipe(
      map(action=>{
        return action.map(a=>{
          //get other datat
          const data=a.payload.doc.data();
          //get key
          const id=a.payload.doc.id;
          UserDetailsService.docid=id
          //return
          return {id,...data};
        });
      })
    );
  }
  //getting all notes
  getNotes(): Observable<Details[]>{
    return UserDetailsService.notes;
}

//get single note by id


//create new note
addNote(note:Details):Promise<DocumentReference>{
  return this.noteCollection.add(note);
}

updateNote(note : Details):Promise<void>{
  return this.noteCollection.doc(note.id).update(
    {
      fname:note.fname
    }
  );
}


deleteNote(id:string):Promise<void>{
  return this.noteCollection.doc(id).delete();
}

getNote(id:string):Observable<Details>{
  return this.noteCollection.doc<Details>(id).valueChanges().pipe(
    take(1),
    map(note=>{
      note.id=id;
      return note;
    })
  )
}
}
