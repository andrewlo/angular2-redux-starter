import { Component, Inject, ApplicationRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { SearchActions } from '../actions';
import { RioContainer } from '../components';
import { ISearch/*, IAppState*/ } from '../store';
/*
import { Control, ControlGroup, FormBuilder } from '@angular/common';
import { NgRedux } from 'ng2-redux';
*/
//import 'rxjs/Rx';

@Component({
  selector: 'search-page',
  providers: [ SearchActions ],
  directives: [ RioContainer ],
  pipes: [ AsyncPipe ],
  template: `
    <rio-container testid="counter" [size]=2 [center]=true>
      <h2 data-testid="counter-heading" id="qa-counter-heading"
        class="center caps">
        Search
      </h2>
      <!-- form [ngFormModel]="searchForm"><input ngControl="search" placeholder="Search Giphy"></form -->
      <div *ngIf="loading | async">
        Loading
      </div>
      <div *ngIf="!(loading | async)">
        <div *ngFor="let result of (results | async)">
          <img src="{{result.images.downsized_large.url}}">
        </div>
      </div>
    </rio-container>
  `
})
export class SearchPage {
  //@select() private search$: Observable<ISearch>;
  @select(['search', 'results']) searchResults$: Observable<any>;
  @select(['search', 'loading']) loading$: Observable<boolean>;
  private results: Observable<any>;
  // private searchField: Control;
  // private searchForm: ControlGroup;

  constructor(private actions: SearchActions/*, private fb: FormBuilder, private ngRedux: NgRedux<IAppState>*/) {
    this.results = this.searchResults$.map(l => l.toJS());
    // this.searchField = new Control();
    // this.searchForm = fb.group({search: this.searchField});

    // this.searchField.valueChanged
    //   .debounceTime(400)
    //   .flatMap(term => {
    //     this.ngRedux.dispatch(this.actions.loading(term))
    //     return this.actions.search(term);
    //   })
    //   .subscribe(
    //      result => this.ngRedux.dispatch(this.actions.success(result)),
    //      error => this.ngRedux.dispatch(this.actions.error(error)));
  }
  ngOnInit() {
    this.actions.search('inside out');

    //this.searchResults$.subscribe((results) => console.log('results ', results));
  }
}
