import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../anime.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  access_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  login: boolean = false;
  operation: any;
  username: string = ''; // Provide an initial value
  password: string = ''; // Provide an initial value
  
 

  private loginSubscription: Subscription;
  constructor(
    private loginService: LoginService,
    private http: HttpClient
    ) 
  { 
    this.loginSubscription = this.loginService.login$.subscribe((loginTerm) => {
     this.isLogin(loginTerm);
    });
  }


  isLogin(operation: string): void {
    if (operation === 'login') {
      this.login = true;
    } else
      this.login = false;
  }
  submitForm(type : boolean): void {
    const userData = {
      nome: this.username,
      senha: this.password,
    };

    if(type){
      this.loginForm(userData);
    }else{
      this.cadastroForm(userData);
    }
  }
  loginForm(userData: object): void {
   
    this.loginService.userLogin(userData);

  }
  
  cadastroForm(userData: object): void {
    this.loginService.userCadastro(userData);
  }



    ngOnDestroy(): void {
      this.loginSubscription.unsubscribe();
    }
  }   
