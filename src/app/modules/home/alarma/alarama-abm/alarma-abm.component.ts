import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alarma } from '../../../../core/models/Alarma.model';
import { AlarmaService } from '../../../../core/services/alarma.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { Router } from '@angular/router';
import { Granos } from 'src/app/core/models/granos.model';
import { UnidadMedida } from 'src/app/core/models/unidadmedida.model';
import { Color } from 'src/app/core/models/color.model';
import { TipoNotificacion } from 'src/app/core/models/tiponotificacion.model';
import { User } from 'src/app/core/models/user.model';
import { GranosService } from 'src/app/core/services/granos.service';
import { UnidadMedidaService } from 'src/app/core/services/unidadmedida.service';
import { ColorService } from 'src/app/core/services/color.service';
import { TipoNotificacionService } from 'src/app/core/services/tiponotificacion.service';
import { Userervice } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-alarma-abm',
  templateUrl: './alarma-abm.component.html',
  styleUrls: ['./alarma-abm.component.css']
})
export class AlarmaAbmComponent implements OnInit {
  form!: FormGroup;
  alarma!: Alarma;
  editMode = false;
  rangoMode: boolean = false;
  rangoRepetido = false;
  alarmasActuales: Alarma[] = [];
  //dispositivoEdit: Dispositivo = new Dispositivo('', '', '', '', undefined);
  granos: Granos[] =[];
  unidadesDeMedida: UnidadMedida[]=[];
  colores: Color[]=[];
  notificaciones: TipoNotificacion[]=[];
  usuarios: User[]=[];

  constructor(private router: Router, public dialog: MatDialog, public dialogRef: MatDialogRef<AlarmaAbmComponent>,
                                                                private formBuilder: FormBuilder,
                                                                public storageService : StorageService,
                                                                public AlarmaService: AlarmaService,
                                                                public GranosService: GranosService,
                                                                public UnidadesMedidasService : UnidadMedidaService,
                                                                public ColoresService: ColorService,
                                                                public notificacionesService : TipoNotificacionService,
                                                                public UsuarioService : Userervice,
                                                                @Inject(MAT_DIALOG_DATA) public data: {alarma: Alarma, edit: boolean, rangoMode: boolean }
                                                                ) {


    this.alarma = data.alarma;
    this.editMode = data.edit;
    this.rangoMode = data.rangoMode;
  }

  ngOnInit(): void {

    if(this.editMode || this.rangoMode){
      this.getGranosPorId(this.alarma.granosID);
      this.getUnidadesDeMedidaPorId(this.alarma.unidadesMedidasID);
    }
    else{
      this.getGranos();
      this.getUnidadesDeMedida();
    }

    this.getColores();
    this.getNotificaciones();
    this.getUsuarios();

    //configuracion del formulario
    this.form = this.formBuilder.group({
      granos: ['', Validators.required],
      unidadesMedidas: ['', Validators.required],
      colores: ['', Validators.required],
      minimo: ['', Validators.required],
      maximo: ['', Validators.required],
      descripcion: ['', Validators.required],
      tiposDeNotificacion: ['', Validators.required],
      usuarios: ['', Validators.required]
    });



  }

  getGranos(){
    this.GranosService.GranosList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.granos.push(new Granos(item.id,item.descripcion)));
    }).catch(error => {
      console.log('Error al obtener granos');
    });
  }

  getUnidadesDeMedida(){
    this.UnidadesMedidasService.UnidadMedidaList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.unidadesDeMedida.push(new UnidadMedida(item.id,item.descripcion, item.simbolo)));
    }).catch(error => {
      console.log('Error al obtener unidades de medida');
    });
  }

  getGranosPorId(id: string){
    this.GranosService.GranosListById(id).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.granos.push(new Granos(item.id,item.descripcion)));
    }).catch(error => {
      console.log('Error al obtener granos');
    });
  }

  getUnidadesDeMedidaPorId(id: string){
    this.UnidadesMedidasService.UnidadMedidaListById(id).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.unidadesDeMedida.push(new UnidadMedida(item.id,item.descripcion, item.simbolo)));
    }).catch(error => {
      console.log('Error al obtener unidades de medida');
    });
  }


  getColores(){
    this.ColoresService.ColorList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.colores.push(new Color(item.id,item.descripcion, item.hex)));
    }).catch(error => {
      console.log('Error al obtener colores');
    });
  }

  getNotificaciones(){
    this.notificacionesService.TipoNotificacionList().toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.notificaciones.push(new TipoNotificacion(item.id,item.descripcion)));
    }).catch(error => {
      console.log('Error al obtener los tipos de notificacion');
    });
  }

  getUsuarios(){
    let filter = `?%24filter=productoresID%20eq%20${this.storageService.getCurrentUser().productoresID}`;

    this.UsuarioService.userList(filter).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.usuarios.push(new User(item.id,item.email,'','','','','','')));
    }).catch(error => {
      console.log('Error al obtener los usuarios');
    });
  }

  onSubmit(){
    if (!this.form.valid) {
      return;
    }

    if(this.rangoRepetido)
    {
      Swal.fire('El valor mínimo o máximo ya se encuentra en otro rango!', '', 'error');
      return;
    }

    if(this.editMode)
    {
      this.update();
    }
    else
    {
      this.add();
    }
    this.dialogRef.close(this.alarma);
  }

  add(){
    this.AlarmaService.add(this.alarma).toPromise().then((respose: any) => {
    this.dialogRef.close(true);
    Swal.fire('Nuevo rango de alarmas dado de alta', '', 'success');
    }).catch(responseError => {
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

  update(){
    this.AlarmaService.edit(this.alarma.id, this.alarma).toPromise().then((respose: any) => {
    this.dialogRef.close(true);
    Swal.fire('Rango de alarma actualizado!', '', 'success');
    }).catch(responseError => {
      Swal.fire('Ocurrió un error imprevisto', '', 'error');
    });
  }

  cancelar(){
    this.dialogRef.close(false);
  }

  controlarRepetido() {
    this.alarmasActuales = [];

    this.AlarmaService.alarmaList(this.storageService.getCurrentUser().productoresID).toPromise().then((respose: any) => {
      respose.forEach((item: any) => this.alarmasActuales.push(new Alarma(item.ID,
                                                                  '',
                                                                  '',
                                                                  item.granosID,
                                                                  item.granos,
                                                                  item.unidadesMedidasID,
                                                                  item.unidadesMedidas,
                                                                  item.minimo,
                                                                  item.maximo,
                                                                  '',
                                                                  item.tiposNotificaciones,
                                                                  '',
                                                                  item.colores,
                                                                  '',
                                                                  item.usuarioDestino
                                                                  )));

        //filtro por grano y unidad de medida
        if(this.editMode){
          this.alarmasActuales = this.alarmasActuales.filter(resp => resp.granosID == this.alarma.granosID
                                                                && resp.unidadesMedidasID == this.alarma.unidadesMedidasID
                                                                && resp.id != this.alarma.id);
        }
        else{
          this.alarmasActuales = this.alarmasActuales.filter(resp => resp.granosID == this.alarma.granosID && resp.unidadesMedidasID == this.alarma.unidadesMedidasID);
        }


      //Filtro de minimo y maximo
      var resultado = this.alarmasActuales.filter(a => (a.minimo >= this.alarma.minimo && a.minimo <=this.alarma.maximo) || (a.maximo >= this.alarma.minimo && a.maximo <= this.alarma.maximo));

      this.rangoRepetido = (resultado.length > 0);

    }).catch(error => {
      console.log('Error al obtener las alarmas', error);
     this.rangoRepetido =true;
    });
  }

}
