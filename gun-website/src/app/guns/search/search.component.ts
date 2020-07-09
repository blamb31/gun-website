import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GunsService } from 'src/app/shared/services/guns.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  guns$: Observable<any>;
  constructor(private _gunsSvc: GunsService) {}

  ngOnInit() {
    this.guns$ = this._gunsSvc.getAllGuns();
  }
}
