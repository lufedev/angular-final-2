import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnimeService } from '../anime.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-anime-search',
  templateUrl: './anime-search.component.html',
  styleUrls: ['./anime-search.component.css'],
})
export class AnimeSearchComponent implements OnDestroy {
  animes: any;
  filteredAnimes: any;
  noResults: boolean = false;
  searchResults: any;
  private searchSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService,
    private searchService: SearchService
  ) {
    this.searchSubscription = this.searchService.search$.subscribe((searchTerm) => {
      this.searchAnime(searchTerm);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  searchAnime(searchTerm: string): void {
    if (searchTerm) {
      this.animeService.searchAnimes(searchTerm).subscribe((data) => {
        this.searchResults = data.data;
        this.filterAnimes(this.searchResults);
      });
    }
  }

  navigateToAnimeDetails(animeSlug: string): void {
    this.router.navigate(['/anime-details', animeSlug]);
  }

  filterAnimes(animeData: any[]): void {
    this.filteredAnimes = animeData;
    this.noResults = this.filteredAnimes.length === 0;
  }

  goBack(): void {
    this.router.navigate(['/anime-list']);
  }
}
