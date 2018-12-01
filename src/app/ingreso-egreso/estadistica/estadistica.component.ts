import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/index";
import {IngresoEgreso} from "../ingreso-egreso.model";
import {AppState} from "../ingreso-egreso.reducer";

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Egresos','Ingresos'];
  public doughnutChartData: number[] = [];


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach(item => {

      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [this.egresos,this.ingresos];

  }

}
