import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Granos } from 'src/app/core/models/granos.model';
import { GranosService } from 'src/app/core/services/granos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-granos-abm',
  templateUrl: './granos-abm.component.html',
  styleUrls: ['./granos-abm.component.css']
})
export class GranosAbmComponent implements OnInit {
  form!: FormGroup;

  constructor( public dialogRef: MatDialogRef<GranosAbmComponent>,
    private formBuilder: FormBuilder,
    public granosService: GranosService,
    @Inject(MAT_DIALOG_DATA) public data : any) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required]
    });

    // if (this.data[0].editMode) 
    //   this.getEditForm();
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  // getEditForm() {
  //   this.form.controls['descripcion'].setValue(this.data[0].grano.descripcion);
  // }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    if(this.data[0].editMode)
      this.update();
    else
      this.add();
  }

  add() {
    this.granosService.AddGranos(this.data[0].grano).toPromise().then((respose: any) => {
    this.dialogRef.close(this.data[0].grano);
    Swal.fire('Grano dado de alta!', '', 'success');
    }).catch(error => {
      console.log(error);
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

  update()
  {
    this.granosService.UpdateGranos(this.data[0].grano.ID, this.data[0].grano).toPromise().then((respose: any) => {
    this.dialogRef.close(this.data[0].grano);
    Swal.fire('Grano actualizado!', '', 'success');
    }).catch(error => {
      console.log(error);
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

}
