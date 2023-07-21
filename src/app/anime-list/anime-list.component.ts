import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../anime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: any;
  
  currentPage: number = 1;
  pageSize: number = 16;


  constructor(private animeService: AnimeService, private router: Router) { }

  ngOnInit(): void {
    this.loadAnimes(this.currentPage);
  }

  loadAnimes(page: number): void {
    this.animeService.getAnimes(page, this.pageSize).subscribe(data => {
      this.animes = data.data;
    });
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAnimes(this.currentPage);
    }
  }

  loadNextPage(): void {
    this.currentPage++;
    this.loadAnimes(this.currentPage);
  }

  navigateToAnimeDetails(animeSlug: string): void {
    this.router.navigate(['/anime-details', animeSlug]);
  }
 
  
}
