import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
export class DeletedViewComponent implements OnInit {
    public deletedButtonItems: DeletedButtonItems[] = [];

    ngOnInit() {
        if (this.deletedButtonItems) {
            this.loadDataFromLocalStorage();
        }
    }

    public loadDataFromLocalStorage() {
        const storedData = localStorage.getItem('deletedItems');
        if (storedData) {
            this.deletedButtonItems = JSON.parse(storedData);
        } else {
            // this.deletedButtonItems = [];
            console.log('this.deletedButtonItems = []');
        }
    }
}