import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";

import Swal from 'sweetalert2';
import {filter, map} from "rxjs/internal/operators";
import {IngresoEgreso} from "./ingreso-egreso.model";
import {User as UserFirebase} from "firebase";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {ActivarLoadingAction, DesactivarLoadingAction} from "../shared/ui.accions";
import {Subscription} from "rxjs/index";
import {AuthService} from "../auth/auth.service";
import {SetItemsAction, UnsetItemsAction} from "./ingreso-egreso.actions";

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private ingresoegresoListenerSubcription: Subscription = new Subscription();
  private ingresoegresoItemsSubcription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState>) {
  }



  initInresoEgresoListener() {

    this.ingresoegresoListenerSubcription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }


  private ingresoEgresoItems(uid: string) {

    this.ingresoegresoItemsSubcription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {

          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          });
        })
      )
      .subscribe((coleccion: any) => {

        this.store.dispatch(new SetItemsAction(coleccion));

      })
  }

  cancelarSubcriptions() {
    this.ingresoegresoListenerSubcription.unsubscribe();
    this.ingresoegresoItemsSubcription.unsubscribe();

    this.store.dispatch(new UnsetItemsAction());
  }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});

  }

  borrarIngresoEgreso(uid:string) {

    const user = this.authService.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid}`)
      .delete();
  }
}
