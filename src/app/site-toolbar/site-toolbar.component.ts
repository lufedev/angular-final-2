import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-site-toolbar',
  templateUrl: './site-toolbar.component.html',
  styleUrls: ['./site-toolbar.component.css']
})

export class SiteToolbarComponent {
  isUserLoggedIn: boolean = false;
  constructor( 
    private router: Router, 
    private loginService: LoginService){}

    ngOnInit(): void {
      this.loginService.isUserLoggedIn$.subscribe((isLoggedIn: boolean) => {
        this.isUserLoggedIn = isLoggedIn;
      });
    }

  navigateToAuth(operation: string): void {
    this.loginService.setLoginTerm(operation);
    this.router.navigate(['/auth']);
  }
}
