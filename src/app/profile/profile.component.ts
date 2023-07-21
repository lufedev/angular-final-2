import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  animes: any;

  constructor(private loginService:LoginService) {}

  ngOnInit(): void {
    this.loadAnimes();
  }
  generateStars(nota: number): number[] {
    return Array(Math.floor(nota)).fill(0);
  }
  loadAnimes(): void {

    this.loginService.listarAnimes().subscribe(data => {
       this.animes = data;
    });

  }
}
