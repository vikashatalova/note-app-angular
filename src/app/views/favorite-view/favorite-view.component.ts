import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/items.service';

interface FavoriteButtonItems {
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
    selector: 'app-favorite-view',
    templateUrl: './favorite-view.component.html',
    styleUrls: ['./favorite-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteViewComponent implements OnInit {
    public favoriteButtonItems: FavoriteButtonItems[] = [];

    constructor(private _notes: NotesService) {}

    ngOnInit() {
        if (this.favoriteButtonItems) {
            this.favoriteButtonItems = this._notes.getFavoriteNoteItems();
        }
    }
}