import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
const compact = require('lodash/compact');
const flatten = require('lodash/flatten');
const uniq = require('lodash/uniq');

import { SearchService } from '../../services/search';
import { StateService } from '../../services/state';

/**
 * Class representing a search results page for repositories.
 */

@Component({
  selector: 'search-results',
  styles: [require('./search-results.styles.scss')],
  template: require('./search-results.template.html'),
  encapsulation: ViewEncapsulation.None,
})

export class SearchResultsComponent {
  public searchQuery: string = '';
  private queryValue: string = '';
  private routeSubscription: Subscription;
  private results = [];
  private searchResultsSubscription: Subscription;
  private total: number;
  private isLoading = true;
  private filterForm: FormGroup;

  /**
   * Constructs a SearchResultsComponent.
   *
   * @constructor
   * @param {StateService} stateService - A service for managing the state of the site
   * @param {ActivatedRoute} activatedRoute - The currently active route
   * @param {SearchService} searchService - A service for searching repositories
   */
  constructor(
    public stateService: StateService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
  ) {
    this.filterForm = formBuilder.group({
      languages: {},
      licenses: {},
    });

    this.filterForm.valueChanges.subscribe(data => {
      console.log('Form changes', data)
      // this.output = data
    });
  }

  ngOnInit() {
    this.stateService.set('section', 'explore-code');
    
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (response: any) => {
        this.queryValue = response.q;
        this.searchService.search(this.queryValue);
      }
    );

    this.searchResultsSubscription = this.searchService.searchResultsReturned$.subscribe(results => {
      if (results !== null) {
        this.results = results;
        this.total = this.searchService.total;
        this.filterForm.setControl('languages', this.formBuilder.group(this.getLanguages().reduce((obj, language) => {
          obj[language] = this.formBuilder.control(false);
          return obj;
        }, {})));
        this.filterForm.setControl('licenses', this.formBuilder.group(this.getLicenses().reduce((obj, language) => {
          obj[language] = this.formBuilder.control(false);
          return obj;
        }, {})));
        this.isLoading = false;
      }
    });
  }

  /**
   * On removal from the DOM, unsubscribe from URL updates.
   */
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.searchResultsSubscription.unsubscribe();
  }

  getLanguages() {
    return uniq(compact(flatten(this.results.map(result => result.languages))));
  }

  getLicenses() {
    return uniq(compact(flatten(this.results.map(result => result.permissions.licenses ? result.permissions.licenses.map(license => license.name) : []))));
  }
}
