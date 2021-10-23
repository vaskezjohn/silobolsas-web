import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Session } from "../models/session.model";
import  {User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession: Session | null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session {
    let sessionStr = <Session>JSON.parse(this.localStorageService.getItem('currentUser') || '{}');
    return sessionStr;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session | null = this.getCurrentSession();
    return (session && session.user) ? session.user : null!;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null && !this.isTokenExpired()) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null!;
  };

  private getTokenExpired(): string {
    var session = this.getCurrentSession();
    return (session && session.tokenExpires) ? session.tokenExpires : null!;
  }

  private isTokenExpired(): boolean {
    let currentDate=new Date();
    let tokenExpiredDate=new Date(this.getTokenExpired());
    return currentDate.getTime() > tokenExpiredDate.getTime();
  }

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
