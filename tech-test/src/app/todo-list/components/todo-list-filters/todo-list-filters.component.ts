import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { TodoCategory } from '../../models';

export interface TodoListFiltersChangedEvent {
  searchTerm?: string;
  category?: TodoCategory | null;
}

@Component({
  selector: 'app-todo-list-filters',
  templateUrl: './todo-list-filters.component.html',
  styleUrls: ['./todo-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListFiltersComponent implements OnInit, OnDestroy {
  @Input() set searchTerm(value: string) {
    this.searchTermControl.setValue(value, { emitEvent: false });
  }

  @Input() categories: TodoCategory[];

  @Input() set selectedCategory(value: TodoCategory) {
    this.categoryControl.setValue(value, { emitEvent: false });
  }

  @Output() filtersChanged = new EventEmitter<TodoListFiltersChangedEvent>();

  searchTermControl = new FormControl('');
  categoryControl = new FormControl(null);

  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.searchTermControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      map((searchTerm: string) => searchTerm.trim()),
      takeUntil(this.destroy$)
    )
      .subscribe((searchTerm) => {
        this.filtersChanged.emit({ searchTerm });
      });

    this.categoryControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    )
      .subscribe((category) => {
        this.filtersChanged.emit({ category });
      });
  }

  onCategorySelected(category: TodoCategory): void {
    this.categoryControl.setValue(this.categoryControl.value === category ? null : category);
  }

  onClearSearchTermInput(): void {
    this.searchTermControl.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
