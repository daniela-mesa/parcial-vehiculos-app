import { Component, OnInit } from '@angular/core';
import { VehiculosService } from './service/service.service';
import { Vehiculo } from './models/vehiculo.model';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  marcaCount: { [marca: string]: number } = {}; 

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit() {
    this.vehiculosService.getVehiculos().subscribe(data => {
      this.vehiculos = data;
      this.marcaCount = data.reduce((acc, vehiculo) => {
        acc[vehiculo.marca] = (acc[vehiculo.marca] || 0) + 1;
        return acc;
      }, {} as { [marca: string]: number });
    });
  }
}
