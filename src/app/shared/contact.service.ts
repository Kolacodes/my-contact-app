import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firebase: AngularFireDatabase) { }
  contactList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl('null '),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('')
  });

  getContacts(){
    this.contactList = this.firebase.list('contacts');
    return this.contactList.snapshotChanges();
  }

  insertContact(contact) {
    this.contactList.push({
      fullName: contact.fullName,
      email: contact.email,
      mobile: contact.mobile,
      location: contact.location
    });
  }
}
