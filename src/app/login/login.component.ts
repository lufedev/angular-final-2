import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../anime.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'yup';

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
  displayMessage: boolean = false;
  value: string = '';
  message: string = '';
  operation: any;
  username: string = ''; // Provide an initial value
  password: string = ''; // Provide an initial value
  
 

  private loginSubscription: Subscription;
  private messageSubscription: Subscription;
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    ) 
  { 
    this.loginSubscription = this.loginService.login$.subscribe((loginTerm) => {
     this.isLogin(loginTerm);
    });
    this.messageSubscription = this.loginService.message$.subscribe((message) => {
      if (this.displayMessage){
      this.openSnackBar(message, 'Fechar');
      }
    })
  }


  isLogin(operation: string): void {
    if (operation === 'login') {
      this.login = true;
      this.value = 'Login';
    } else
      this.login = false;
      this.value = 'Cadastro';
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
    this.displayMessage = true;
  }
  
  cadastroForm(userData: object): void {
    this.loginService.userCadastro(userData);
    this.displayMessage = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    this.displayMessage = false;
  }
    ngOnDestroy(): void {
      this.loginSubscription.unsubscribe();
    }
    
  }   
