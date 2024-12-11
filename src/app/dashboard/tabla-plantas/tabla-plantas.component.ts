import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PlantaService } from '../../services/planta.service';
import { Planta } from '../../models/planta';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalPlantaComponent } from './modal-planta/modal-planta.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-plantas',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './tabla-plantas.component.html',
  styleUrl: './tabla-plantas.component.css'
})
export class TablaPlantasComponent implements OnInit,AfterViewInit{
  
  modo: string = '';
  plantas: Planta[];
  displayedColumns: string[] = ['id', 'nombre_comun', 'nombre_cientifico', 'accion'];
  dataSource = new MatTableDataSource<Planta>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
constructor(private plantaService:PlantaService ){}

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Planta, filter: string) => {
      return data.nombre_comun.toLowerCase().includes(filter.trim().toLowerCase()) 
      || data.nombre_cientifico.toLowerCase().includes(filter.trim().toLowerCase())
      // || data.phone.toLowerCase().includes(filter.trim().toLowerCase())
    };
    this.obtenerPlantas(); }

    obtenerPlantas() {
      console.log('entramos al metodo')
      this.plantaService.obtenerPlantas().subscribe(
        {
          next: (datos) => {
            this.plantas = datos;
            this.dataSource.data = this.plantas;
            console.log(datos)
          },
          error: (errores) => {
            console.log(errores)
          }
        }
      );
    }

    readonly dialog = inject(MatDialog);

  masDetalles(planta: Planta) {
    this.modo = 'ver';
    const dialogRef = this.dialog.open(ModalPlantaComponent, {
      width: '600px',
       data: { planta, modo: this.modo }
     });

     dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
     });
  }

  agregar() {
    this.modo = 'agregar';
    let planta: Planta = new Planta();
     const dialogRef = this.dialog.open(ModalPlantaComponent, {
       width: '600px',
       data: { planta, modo: this.modo }
     });
     dialogRef.afterClosed().subscribe(() => {
       this.obtenerPlantas();
     });
  }

  editar(planta: Planta) {
    this.modo = 'editar';
     const dialogRef = this.dialog.open(ModalPlantaComponent, {
       width: '600px',
       data: { planta, modo: this.modo }
     });
     dialogRef.afterClosed().subscribe(() => {
       this.obtenerPlantas();
     });
  }

  eliminar(planta: Planta) {
    Swal.fire({
      title: "¿Estas Seguro?",
      text: "¡No podras Revertir la accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.plantaService.eliminarPlanta(planta).subscribe({
          next: (datos) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El elemento fue borrado.",
              icon: "success"
            }).then( () => {
              this.obtenerPlantas();
            });
          }
        });
      }
    });


  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
