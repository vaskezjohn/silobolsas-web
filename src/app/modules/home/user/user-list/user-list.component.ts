import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserNewComponent } from '../user-new/user-new.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { Users } from '../../../../core/models/users.model';
import { Userervice } from '../../../../core/services/user.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/core/authentication/services/storage.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Users[] =[]; 

  displayedColumns: string[] = ['usuario', 'email', 'operations'];
  dataSource!: MatTableDataSource<Users>;
  constructor(public dialog: MatDialog, public userervice: Userervice, private storageService: StorageService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {    
    let filter = !this.storageService.isAdmin() ? `?%24filter=productoresID%20eq%20${this.storageService.getCurrentUser().productoresID}%20and%20rolesID%20eq%20cf6e4f59-2de6-11ec-b9b8-883882e3ecf6`: '';
    this.userervice.userList(filter).toPromise().then((response: any) => {   
      
      this.dataSource = new MatTableDataSource<Users>(response);
        this.dataSource.paginator = this.paginator;
    }).catch(error => {
      console.log('Error al obtener los usuario'); 
    });    
  }

  deleteUser(user: Users){
    Swal.fire({
      title:  'Eliminar Usuario',
      text:  '¿Desea eliminar usuario ' + user.usuario +'?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userervice.delete(user).toPromise().then((respose: any) => {              
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id != user.id
          );
        }).catch(error => {
          Swal.fire('Error!', 'campo invalido!', 'error');
        });
        Swal.fire('Eliminado!', '', 'success');
      }
    })
  }

  editUser(user: Users){
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: this.clone(user)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.users =[]
        this.ngOnInit();
      }      
    });
  }  

  newUser() {
    const dialogRef = this.dialog.open(UserNewComponent, {
      data: new Users('', '', '', 0, '', '', '', '')
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.users =[]
        this.ngOnInit();
      } 
    });
  }

  detailsUser(user: Users) {
    console.log(user.nombre)
    const dialogRef = this.dialog.open(UserViewComponent, {
      data: user
    });    
  }

  clone(user: Users): Users {
    var cloned = new Users(user.nombre, user.apellido, user.telefono, user.genero, user.email, user.usuario, '', user.id, user.rolesID, user.productoresID);
    return cloned;
  }

}
