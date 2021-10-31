import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Campo} from '../models/campo.model'
import { CampoService } from '../service/campo.service';

@Component({
  selector: 'app-campo-edit',
  templateUrl: './campo-edit.component.html',
  styleUrls: ['./campo-edit.component.css']
})
export class CampoEditComponent implements OnInit {

  public showError: boolean = false;
  public erroMessage!: string;

  constructor(public dialogRef: MatDialogRef<CampoEditComponent>,
    @ Inject(MAT_DIALOG_DATA) public campo: Campo, public campoService: CampoService) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  edit() {
    this.showError = false;
     this.campoService.edit(this.campo).toPromise().then((respose: any) => {
      this.dialogRef.close(true);
    }).catch(responseError => {
      console.log(responseError);
      this.showError = true;
      this.erroMessage = (responseError.status != 500) ? responseError.error.message : 'No se pudo editar el campo';
    });
  }
}
