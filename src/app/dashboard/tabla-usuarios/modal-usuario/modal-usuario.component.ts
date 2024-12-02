import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {

  usuario: Usuario;
  modo: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalUsuarioComponent>,
    private usuarioService: UsuariosService) {
    this.usuario = structuredClone(data.usuario) || JSON.parse(JSON.stringify(data.pelicula));
    this.modo = data.modo;
  }

  onSubmit() {
    if(this.modo === 'editar'){
      this.usuarioService.actualizarUsuario(this.usuario).subscribe({
        next: (datos) => {
          console.log(datos);
          Swal.fire({
            title: "Usuario Actualizado!",
            text: "¡Datos aceptados!",
            icon: "success"
          })
          console.log('respuesta:', datos);
          this.dialogRef.close(this.usuario);
        },
        error: (errores) => {
          console.log(errores)
        }
      });
    }
    if(this.modo === 'agregar'){
      this.usuarioService.insertarUsuario(this.usuario).subscribe({
        next: (datos) => {
          console.log(datos);
          Swal.fire({
            title: "Usuario Insertado!",
            text: "¡Datos aceptados!",
            icon: "success"
          })
          console.log('respuesta:', datos);
          this.dialogRef.close(this.usuario);
        },
        error: (errores) => {
          console.log(errores)
        }
      });
    }
    
  }

  onClose() {
    this.dialogRef.close();
  }

}
