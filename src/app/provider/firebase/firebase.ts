
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable() export class Firebase {
    constructor(public db: AngularFireDatabase){
        console.log('Hello Firebase Provider');
    }

    save(course:any){

        this.db.list('course')
                .push(course).then(r => console
                .log(r));
    }



}



