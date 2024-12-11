import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Planta } from '../../../models/planta';
import { PlantaService } from '../../../services/planta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-planta',
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
  templateUrl: './modal-planta.component.html',
  styleUrl: './modal-planta.component.css'
})
export class ModalPlantaComponent {

  planta: Planta;
  modo: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalPlantaComponent>,
    private plantaService: PlantaService) {
    this.planta = structuredClone(data.planta) || JSON.parse(JSON.stringify(data.planta));
    this.modo = data.modo;
  }

  onSubmit() {
    if(this.modo === 'editar'){
      this.plantaService.actualizarPlanta(this.planta).subscribe({
        next: (datos) => {
          console.log(datos);
          Swal.fire({
            title: "Planta Actualizada!",
            text: "¡Datos aceptados!",
            icon: "success"
          })
          console.log('respuesta:', datos);
          this.dialogRef.close(this.planta);
        },
        error: (errores) => {
          console.log(errores)
        }
      });
    }
    if(this.modo === 'agregar'){
      this.plantaService.insertarPlanta(this.planta).subscribe({
        next: (datos) => {
          console.log(datos);
          Swal.fire({
            title: "Planta Creada!",
            text: "¡Datos aceptados!",
            icon: "success"
          })
          console.log('respuesta:', datos);
          this.dialogRef.close(this.planta);
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
