import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

import { LOCAL_STORAGE } from '@ng-web-apis/common';

import { BehaviorSubject } from 'rxjs';

export enum AppTheme {
  Dark = 'todos-dark-theme',
  Light = 'todos-light-theme',
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;

  private readonly themeSubject = new BehaviorSubject<AppTheme>(null);
  readonly theme$ = this.themeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private rendererFactory: RendererFactory2,
    private mediaMatcher: MediaMatcher
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    let appTheme = this.localStorage.getItem('appTheme');

    const isValidThemeValue = Object
      .values(AppTheme)
      .includes(appTheme as any);

    if (isValidThemeValue) {
      this.themeSubject.next(appTheme as AppTheme);
      this.renderer.addClass(this.document.body, appTheme);
    } else {
      appTheme = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches
        ? AppTheme.Dark
        : AppTheme.Light;
      this.renderer.addClass(this.document.body, appTheme);
      this.localStorage.setItem('appTheme', appTheme);
      this.themeSubject.next(appTheme as AppTheme);
    }
  }

  setTheme(theme: AppTheme): void {
    this.renderer.removeClass(this.document.body, this.themeSubject.getValue());
    this.renderer.addClass(this.document.body, theme);
    this.localStorage.setItem('appTheme', theme);
    this.themeSubject.next(theme);
  }
}
