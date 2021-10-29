import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserNewComponent } from '../user-new/user-new.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { User } from '../models/user.model';
import { Userervice } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] =[]; 

  displayedColumns: string[] = ['usuario', 'email', 'operations'];
  dataSource!: MatTableDataSource<User>;
  constructor(public dialog: MatDialog, public userervice: Userervice) { }

  ngOnInit(): void {
    this.userervice.userList().toPromise().then((respose: any) => {        
      respose.forEach((item: any) => this.users.push(new User(item.nombre, item.apellido, item.telefono, item.genero, item.email, item.usuario, item.password, item.id, item.idRol)));
      this.dataSource = new MatTableDataSource(this.users);
    }).catch(error => {
      console.log('Error al obtener los usuario'); 
    });
    
  }

  deleteUser(user: User){
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: this.clone(user)
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.users =[]
        this.ngOnInit();
      }      
    });
  }

  editUser(user: User){
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
      data: new User('', '', '', 0, '', '', '')
    });
    dialogRef.afterClosed().subscribe(respononse => {
      if (respononse){
        this.users =[]
        this.ngOnInit();
      } 
    });
  }

  detailsUser(user: User) {
    console.log(user.nombre)
    const dialogRef = this.dialog.open(UserViewComponent, {
      data: user
    });    
  }

  clone(user: User): User {
    var cloned = new User(user.nombre, user.apellido, user.telefono, user.genero, user.email, user.usuario, '', user.id, user.idRol);
    return cloned;
}

}
