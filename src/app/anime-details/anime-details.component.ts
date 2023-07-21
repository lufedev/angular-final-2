import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../anime.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {
  anime: any;
  nota: number = 0;
  showRatingStatusSelection: boolean = false;
  status: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private animeService: AnimeService, 
    private router: Router)
    { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.animeService.getAnimeBySlug(slug).subscribe(data => {
        this.anime = data.data[0];
      });
    }
  }


  openRatingStatusSelection(): void {
    this.showRatingStatusSelection = true;
  }

  addToList(ratingStatusData: any): void {
    const animeData = {
      nome: this.anime,
      nota: ratingStatusData.nota,
      status: ratingStatusData.status,
    };
    this.loginService.adicionarAnime(animeData);
    this.showRatingStatusSelection = false;
  }
  goBack(): void {
    this.router.navigate(['/anime-list']);
  }
}
