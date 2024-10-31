import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { NotesService } from 'src/app/core/services/items.service';

interface DeletedButtonItems {
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
    selector: 'app-deleted-view',
    templateUrl: './deleted-view.component.html',
    styleUrls: ['./deleted-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletedViewComponent implements OnInit, OnDestroy {
    public deletedButtonItems: DeletedButtonItems[] = [];
    public selectTab = 'deleted';

    private readonly _destroy$ = new Subject<void>();

    constructor(
        private _notes: NotesService,
        private _cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        if (this.deletedButtonItems) {
            this.deletedButtonItems = this._notes.getDeletedNoteItems();
        }

        this._notes.searchNotes('', 'deletedItems');

        this._notes.filteredNotes$.pipe(
            tap(deletedNotes => {
                console.log('deletedNotes', deletedNotes);
                
                this.deletedButtonItems = deletedNotes;
                console.log(this.deletedButtonItems);
                
                this._cdr.markForCheck();
            })
        ).subscribe()
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}