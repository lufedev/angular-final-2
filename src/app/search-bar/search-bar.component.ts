import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  searchAnime(text: string): void {
    this.searchTerm = text;
    this.searchService.setSearchTerm(this.searchTerm);
    this.router.navigate(['/search', this.searchTerm]);
  }
}
