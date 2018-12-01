import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs/index";
import {filter} from "rxjs/internal/operators";
import {IngresoEgresoService} from "../../ingreso-egreso/ingreso-egreso.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nameuser: string;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.nameuser = auth.user.nombre
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
