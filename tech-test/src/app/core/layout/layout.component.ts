import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AppTheme } from '../services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  @Input() appTheme: AppTheme;

  @Output() appThemeChanged = new EventEmitter<AppTheme>();

  appThemeValues = AppTheme;

  constructor() { }

  ngOnInit(): void {}

  onToggleAppTheme(): void {
    this.appThemeChanged.emit(this.appTheme === AppTheme.Light ? AppTheme.Dark : AppTheme.Light);
  }

}
