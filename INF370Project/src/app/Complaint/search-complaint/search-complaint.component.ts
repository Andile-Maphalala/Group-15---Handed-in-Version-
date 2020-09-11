import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-complaint',
  templateUrl: './search-complaint.component.html',
  styleUrls: ['./search-complaint.component.css']
})
export class SearchComplaintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
}
