import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { TruncatePipe } from '../../pipes/truncate';
import { LanguageIconPipe } from '../../pipes/language-icon';
import { RepoListItemComponent } from './';

@Component({
  selector: 'test-component-wrapper',
  template: '<repo-list-item [repo]="repo"></repo-list-item>'
})
class TestComponentWrapper {
  repo = {
    repositoryURL: '',
    permissions: {
      usageType: 'openSource',
    },
  };
}

fdescribe('RepoListItemComponent', () => {
  let component: RepoListItemComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TruncatePipe,
        LanguageIconPipe,
        RepoListItemComponent,
        TestComponentWrapper,
      ],
      imports: [
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      schemas: [
      ],
    });

    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  describe('isGitHubRepo()', () => {
    it('should return true if it has a repositoryURL from GitHub', () => {
      fixture.componentInstance.repo.repositoryURL = 'https://github.com/gsa/code-gov-web';

      expect(component.isGitHubRepo()).toBe(true);
    });

    it('should return false if the repositoryURL is not from GitHub', () => {
      fixture.componentInstance.repo.repositoryURL = 'https://gsa.gov/repositories/gsa/code-gov-web';
      
      expect(component.isGitHubRepo()).toBe(false);
    });
  });
});
