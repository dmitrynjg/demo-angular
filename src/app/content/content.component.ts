import { Component, OnInit, SimpleChanges} from '@angular/core';
import getQueriesParams from '../lib/validators/getQueriesParams/getQueriesParams';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  content = 'table';
  queries: string = '{}';
  constructor() {}
  openCreate() {
    location.href = "#form";
    location.reload();
  }
  checkUrl() {
    const path = location.hash.substring(1);
    if (path === '' || path === 'table') {
      this.content = 'table';
    }
    if (path === 'form') {
      this.content = 'form';
      this.queries = JSON.stringify(getQueriesParams());
    }
  }
  goToForm() {
    return ''
  }
  ngOnInit(): void {
    this.checkUrl();
  }
}
