import { Component, EventEmitter, Output } from '@angular/core';
import { AnimeService } from '../anime.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private animeService: AnimeService) {}

  onSearch(): void {
    this.animeService.searchAnimes(this.searchTerm).subscribe(data => {
      this.searchResults.emit(data.data);
    });
  }

}
