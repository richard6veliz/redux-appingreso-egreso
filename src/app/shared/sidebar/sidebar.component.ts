import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs/index";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter} from "rxjs/internal/operators";
import {IngresoEgresoService} from "../../ingreso-egreso/ingreso-egreso.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  nameuser: string;
  subscription: Subscription = new Subscription();


  constructor(private store: Store<AppState>
    , public authService: AuthService,
              private ingresoEgresoService: IngresoEgresoService) {
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

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubcriptions();

  }

}
