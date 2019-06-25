import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/Fire/auth';
import { Cliente } from '../model/cliente';
import { Produto } from '../model/produto';
import {  AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()

export class DBService {

    expanded:true;

  private productsCollection: AngularFirestoreCollection<Produto>;

    constructor(public db: AngularFireDatabase, private afa:AngularFireAuth) { 
    }

    inserir<Type>(caminho: string, objeto: Type): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.db.list<Type>(caminho)
                .push(objeto)
                .then(item => resolve(item.key));
        });
    }

    
    
    update(path: string, object): Promise<void> {
        return this.db.object(path).update(object);
    }


    remover(caminho: string, uid: string): Promise<void> {
        return this.db.object(`${caminho}/${uid}`).remove();
    }

    get<Type>(caminho: string): Promise<Type> {
        return new Promise<Type>((resolve, reject) => {
            this.db.object<Type>(caminho)
                .valueChanges()
                .subscribe(
                    result => resolve(result),
                    error => reject(error)
                );
        });
    }

    getSincronizado<Type>(path: string): Observable<Type> {
        return this.db.object<Type>(path).valueChanges();
    }

    listWithUIDs<Type>(path: string): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.db.list<Type>(path)
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

    listar<Type>(path: string): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.db.list<Type>(path)
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

    listarSincronizado<Type>(caminho: string): Observable<Type[]> {
        return this.db.list<Type>(caminho).valueChanges();
    }

    buscar<Type>(caminho: string, propriedade: string, valor: any): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.db.list<Type>(caminho, ref => ref.orderByChild(propriedade).equalTo(valor))
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

      userLogin(cliente: Cliente) {

        return this.afa.auth.signInWithEmailAndPassword(cliente.senha,cliente.email);
    
      }

      deslogar(){

        return this.afa.auth.signOut();
      }

      getAuth(){
        return this.afa.auth;

      }
}
