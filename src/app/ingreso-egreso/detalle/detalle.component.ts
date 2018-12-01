import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IngresoEgreso} from "../ingreso-egreso.model";
import {Subscription} from "rxjs/index";
import {IngresoEgresoService} from "../ingreso-egreso.service";
import Swal from 'sweetalert2';
import {AppState} from "../ingreso-egreso.reducer";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subcription: Subscription = new Subscription();

  constructor(private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.subcription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.items = ingresoEgreso.items;
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
      .then(() => {
        Swal('Eliminado', item.descripcion, 'success');
      });
  }
}
