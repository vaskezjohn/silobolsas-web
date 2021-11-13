import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { StorageService } from 'src/app/core/authentication/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnInit {
  
  usuario!: string;
  constructor(
    public menuItems: MenuItems,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.menuItems.getMenuitem().forEach(
      item => item.hasPermissions = this.hasPermissions(this.storageService.getCurrentUser().role, item.userRole)
    );
    this.menuItems.getMenuitem().forEach(item => console.log(`Rol: ${item.userRole} - Tiene Permisos: ${item.hasPermissions}`));
    this.usuario = this.storageService.getCurrentUser().firstname;
  }

  private hasPermissions(userRoles:string, itemMenuRole: string): boolean {
    var splittedItemMenuRole = itemMenuRole.split('|');
    return splittedItemMenuRole.includes(userRoles);
  }
}
