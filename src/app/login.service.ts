import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginSubject = new BehaviorSubject<string>('');
  private jwtToken = new BehaviorSubject<string>('');
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);

  public jwtToken$ = this.jwtToken.asObservable();
  public login$ = this.loginSubject.asObservable();
  public isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  setLoginTerm(loginTerm: string) {
    this.loginSubject.next(loginTerm);
  }

  setJwtToken(jwtToken: string) {
    this.jwtToken.next(jwtToken);
  }
  setIsUserLoggedIn(isUserLoggedIn: boolean) {
    this.isUserLoggedIn.next(isUserLoggedIn);
  }

  userLogin(userData: object): void {
    this.http.post<any>(`${this.apiUrl}/login`, userData).subscribe(
      (response) => {
        const accessToken = response.access_token;
        this.setJwtToken(accessToken);
        this.setIsUserLoggedIn(true);
      },
      (error) => {
        this.setIsUserLoggedIn(false);
        console.error('Erro ao fazer login:', error);
      }
    );
  }

  userCadastro(userData: object): void {
    this.http.post<any>(`${this.apiUrl}/cadastro`, userData).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
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
}
