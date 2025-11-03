import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VehiculosComponent } from './vehiculos.component';
import { VehiculosService } from './service/service.service';
import { Vehiculo } from './models/vehiculo.model';

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;
  let mockVehiculosService: jasmine.SpyObj<VehiculosService>;

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
    },
    {
      id: 3,
      marca: 'Renault',
      linea: 'Logan',
      referencia: '1.4 Authentique',
      modelo: 2019,
      kilometraje: 30000,
      color: 'Gris',
      imagen: 'imagen3.jpg'
    }
  ];

  beforeEach(async () => {
    mockVehiculosService = jasmine.createSpyObj('VehiculosService', ['getVehiculos']);
    mockVehiculosService.getVehiculos.and.returnValue(of(mockVehiculos));

    await TestBed.configureTestingModule({
      declarations: [VehiculosComponent],
      providers: [
        { provide: VehiculosService, useValue: mockVehiculosService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getVehiculos on init and assign data', () => {
    fixture.detectChanges();
    expect(mockVehiculosService.getVehiculos).toHaveBeenCalled();
    expect(component.vehiculos.length).toBe(3);
  });
  
  it('should retrieve right number of rows in the table', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should correctly calculate marcaCount by brand', () => {
    fixture.detectChanges();
    expect(component.marcaCount['Renault']).toBe(2);
    expect(component.marcaCount['Chevrolet']).toBe(1);
  });

});
