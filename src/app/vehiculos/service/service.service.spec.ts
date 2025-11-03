import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehiculosService } from './service.service';
import { Vehiculo } from '../models/vehiculo.model';
import { environment } from '../../../environments/environment.development';

describe('VehiculosService', () => {
  let service: VehiculosService;
  let httpMock: HttpTestingController;

  const mockVehiculos: Vehiculo[] = [
    {
      id: 1,
      marca: 'Renault',
      linea: 'Kangoo',
      referencia: '2 Express 1.6',
      modelo: 2017,
      kilometraje: 93272,
      color: 'Blanco',
      imagen: 'imagen1.jpg'
    },
    {
      id: 2,
      marca: 'Chevrolet',
      linea: 'Spark',
      referencia: 'Life',
      modelo: 2018,
      kilometraje: 50000,
      color: 'Rojo',
      imagen: 'imagen2.jpg'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculosService]
    });
    service = TestBed.inject(VehiculosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data via GET', () => {
    service.getVehiculos().subscribe((vehiculos) => {
      expect(vehiculos.length).toBe(2);
      expect(vehiculos).toEqual(mockVehiculos);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehiculos);
  });
});
