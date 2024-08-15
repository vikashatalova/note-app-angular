import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface FavoriteButtonItems {
    id: string,
    title: string | null,
    description: string | null,
    category: string | null,
    color: string | null
}

@Component({
    selector: 'app-favorite-view',
    templateUrl: './favorite-view.component.html',
    styleUrls: ['./favorite-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteViewComponent implements OnInit {
    public favoriteButtonItems: FavoriteButtonItems[] = [];

    ngOnInit() {
        if (this.favoriteButtonItems) {
            this.loadDataFromLocalStorage();
        }
    }

    public loadDataFromLocalStorage() {
        const storedData = localStorage.getItem('favoriteItems');
        if (storedData) {
            this.favoriteButtonItems = JSON.parse(storedData);
        } else {
            this.favoriteButtonItems = [];
        }
    }
}