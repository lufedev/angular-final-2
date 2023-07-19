import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../anime.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {
  anime: any;

  constructor(private route: ActivatedRoute, private animeService: AnimeService, private router: Router) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.animeService.getAnimeBySlug(slug).subscribe(data => {
        this.anime = data.data[0];
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/anime-list']);
  }
}
