import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-complaint',
  templateUrl: './assign-complaint.component.html',
  styleUrls: ['./assign-complaint.component.css']
})
export class AssignComplaintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
}
