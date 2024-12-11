import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-usuarios',
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
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.css'
})

export class TablaUsuariosComponent implements OnInit, AfterViewInit {
  modo: string = '';
  usuarios: Usuario[];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'accion'];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      return data.name.toLowerCase().includes(filter.trim().toLowerCase()) 
      || data.email.toLowerCase().includes(filter.trim().toLowerCase())
      || data.phone.toLowerCase().includes(filter.trim().toLowerCase())
    };
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    console.log('entramos al metodo')
    this.usuarioService.obtenerUsuarios().subscribe(
      {
        next: (datos) => {
          this.usuarios = datos;
          this.dataSource.data = this.usuarios;
          console.log(datos)
        },
        error: (errores) => {
          console.log(errores)
        }
      }
    );
  }

  readonly dialog = inject(MatDialog);

  masDetalles(usuario: Usuario) {
    this.modo = 'ver';
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      width: '600px',
      data: { usuario, modo: this.modo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  agregar() {
    this.modo = 'agregar';
    let usuario: Usuario = new Usuario();
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      width: '600px',
      data: { usuario, modo: this.modo }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  editar(usuario: Usuario) {
    this.modo = 'editar';
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      width: '600px',
      data: { usuario, modo: this.modo }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  eliminar(usuario: Usuario) {
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
        this.usuarioService.eliminarUsuario(usuario).subscribe({
          next: (datos) => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "El elemento fue borrado.",
              icon: "success"
            }).then( () => {
              this.obtenerUsuarios();
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

