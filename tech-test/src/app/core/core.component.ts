import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AppTheme, ThemeService } from './services';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnInit {
  theme$ = this.themeService.theme$;

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  onAppThemeChange(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }
}
