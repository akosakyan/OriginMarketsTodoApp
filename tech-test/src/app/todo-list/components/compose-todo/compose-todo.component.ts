import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TodoCategory } from '../../models';

import {
  ComposeTodoDialogData,
  ComposeTodoDialogResult,
  ComposeTodoMode,
  ComposeTodoFormValue,
  ComposeTodoFormControlsConfig
} from './compose-todo.types';

@Component({
  selector: 'app-compose-todo',
  templateUrl: './compose-todo.component.html',
  styleUrls: ['./compose-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComposeTodoComponent implements OnInit {
  mode!: ComposeTodoMode;
  categories!: TodoCategory[];
  form!: FormGroup;

  modeValues = ComposeTodoMode;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: ComposeTodoDialogData,
    private matDialogRef: MatDialogRef<ComposeTodoComponent, ComposeTodoDialogResult>,
    private fb: FormBuilder,
  ) {
    const { mode, todoEntity, categories } = dialogData;

    this.mode = mode;
    this.categories = categories;
    this.form = this.createForm();

    if (mode === ComposeTodoMode.Edit) {
      this.form.patchValue(todoEntity);
    }
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      category: [null, Validators.required],
      label: ['', Validators.required],
      description: ['', Validators.required],
    } as ComposeTodoFormControlsConfig);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.matDialogRef.close(this.form.value);
  }
}
