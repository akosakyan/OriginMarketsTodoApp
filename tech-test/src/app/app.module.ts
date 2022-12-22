import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig
} from '@angular/material/snack-bar';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig
} from '@angular/material/dialog';
import {
  MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
  MatProgressSpinnerDefaultOptions
} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, ThemeService } from './core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => () => {
        themeService.initTheme();
      },
      deps: [ThemeService],
      multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      } as MatSnackBarConfig
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
        hideRequiredMarker: false
      } as MatFormFieldDefaultOptions
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        closeOnNavigation: true,
        width: '676px',
        hasBackdrop: true,
      } as MatDialogConfig,
    },
    {
      provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
      useValue: {
        _forceAnimations: false,
        diameter: 30,
        strokeWidth: 3,
      } as MatProgressSpinnerDefaultOptions,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
