import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-site-toolbar',
  templateUrl: './site-toolbar.component.html',
  styleUrls: ['./site-toolbar.component.css']
})

export class SiteToolbarComponent implements OnDestroy {
  isUserLoggedIn: boolean = false;
  userName: string = '';
  private userNameSubscription: Subscription;

  constructor( 
    private router: Router, 
    private loginService: LoginService){
      this.userNameSubscription = this.loginService.userName$.subscribe((login: string) => {
        this.userName = login;
      });
    }

    ngOnInit(): void {
      this.loginService.isUserLoggedIn$.subscribe((isLoggedIn: boolean) => {
        this.isUserLoggedIn = isLoggedIn;
      });
    }

  navigateToAuth(operation: string): void {
    this.loginService.setLoginTerm(operation);
    this.router.navigate(['/auth']);
  }
  
  ngOnDestroy(): void {
    this.userNameSubscription.unsubscribe();
  }
}
