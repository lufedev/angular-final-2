import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginSubject = new BehaviorSubject<string>('');
  private jwtToken = new BehaviorSubject<string>('');
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  private userName = new BehaviorSubject<string>('');
  private message = new BehaviorSubject<string>('');

  public jwtToken$ = this.jwtToken.asObservable();
  public login$ = this.loginSubject.asObservable();
  public isUserLoggedIn$ = this.isUserLoggedIn.asObservable();
  public userName$ = this.userName.asObservable();
  public message$ = this.message.asObservable();

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private router: Router) { }

  setLoginTerm(loginTerm: string) {
    this.loginSubject.next(loginTerm);
  }

  setJwtToken(jwtToken: string) {
    this.jwtToken.next(jwtToken);
  }
  setIsUserLoggedIn(isUserLoggedIn: boolean) {
    this.isUserLoggedIn.next(isUserLoggedIn);
  }

  setUserName(userName: string) {
    this.userName.next(userName);
  }

  setMessage(message: string) {
    this.message.next(message);
  }

  userLogin(userData: object): void {
    this.http.post<any>(`${this.apiUrl}/login`, userData).subscribe(
      (response) => {
        const accessToken = response.access_token;
        this.setJwtToken(accessToken);
        this.setIsUserLoggedIn(true);
        this.getUserName();
        this.setMessage("Usuário logado com sucesso")
        this.router.navigate(['/']);
        
      },
      (error) => {
        this.setMessage(error.error.message)
        this.setIsUserLoggedIn(false);
        return (error);
      }
    );
  }

  userCadastro(userData: object): void {
    this.http.post<any>(`${this.apiUrl}/cadastro`, userData).subscribe(
      (response) => {
        this.setMessage("Cadastro realizado com sucesso:")
      },
      (error) => {
        this.setMessage(error.error.message)
      }
    );
  }

  adicionarAnime(animeData: object): void {
    this.http.post<any>(`${this.apiUrl}/filmes`, animeData, {
      headers: { Authorization: `Bearer ${this.jwtToken.getValue()}` }
    }).subscribe(
      (response) => {
        console.log('Anime adicionado com sucesso:', response);
        console.log('Anime adicionado aos favoritos:', animeData);
      },
      (error) => {
        console.error('Erro ao adicionar anime:', error);
      }
    );
  }

  editarAnime(animeData: object, nomeAnime: string): void {
    this.http.put<any>(`${this.apiUrl}/filmes/${nomeAnime}`, animeData, {
      headers: { Authorization: `Bearer ${this.jwtToken.getValue()}` }
    }).subscribe(
      (response) => {
        console.log('Anime editado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao editar anime:', error);
      }
    );
  }

  listarAnimes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filmes`, {
      headers: { Authorization: `Bearer ${this.jwtToken.getValue()}` }
    });
  }

  listarUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios`, {
      headers: { Authorization: `Bearer ${this.jwtToken.getValue()}` }
    });
  }

    getUserName(): void {
      this.http.get<any>(`${this.apiUrl}/perfil`, {
      headers: { Authorization: `Bearer ${this.jwtToken.getValue()}` }
    }).subscribe(
      (response) => {
        this.setUserName(response.message);
      }
    );
  }
}
