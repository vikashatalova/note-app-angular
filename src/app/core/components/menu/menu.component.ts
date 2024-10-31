import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, tap, takeUntil, Observable, switchMap } from 'rxjs';
import { NotesService } from '../../services/items.service';
import { query } from '@angular/animations';

interface ButtonItems {
    id: string,
    title?: string | null,
    description?: string | null,
    categories: {
        category: {
            name?: string | null,
            color?: string | null,
            isActive?: boolean | undefined
        }
    },
    isFavorite?: boolean | undefined
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {
    public buttonItems?: ButtonItems[];
    public copyButtonItems?: ButtonItems[];

    filterForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl('')
    });

    private readonly _destroy$ = new Subject<void>();

    constructor(
        private _notes: NotesService
    ) {}

    ngOnInit(): void {
        this._notes.filteredNotes$.pipe(
            tap(notes => {
                this.buttonItems = notes;
            }),
            takeUntil(this._destroy$)
        ).subscribe()

        // this.filterForm.controls.title.valueChanges.pipe(
        //     tap(query => {
        //         console.log('searchAllNotes');
                
        //         this._notes.searchAllNotes(query || '')
        //     }),
        //     takeUntil(this._destroy$)
        // ).subscribe()

        this.filterForm.controls.title.valueChanges.pipe(
            tap(query => {
                this._notes.searchNotes(query || '', '')
            }),
            takeUntil(this._destroy$)
        ).subscribe()
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}