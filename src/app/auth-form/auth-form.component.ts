import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  username: string = ''; // Provide an initial value
  password: string = ''; // Provide an initial value

  constructor(private http: HttpClient) {}

  submitForm(): void {
    const userData = {
      nome: this.username,
      senha: this.password,
    };

    // Fazer a chamada para o endpoint de login
    this.http.post('http://127.0.0.1:5000/login', userData).subscribe(
      (response) => {
        // Tratar a resposta aqui, se necessário
      },
      (error) => {
        // Tratar erros aqui, se necessário
      }
    );
  }
}
