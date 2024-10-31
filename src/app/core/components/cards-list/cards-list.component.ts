import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../../services/items.service';
import { LocalStorageService } from '../../services/local-storage.service';

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
    selector: 'app-cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardsListComponent implements OnInit{
    @Input() buttonItems: ButtonItems[] = [];
    @Input() actionType: string = '';
    @Input() favoriteIcon: boolean = false;
    @Output() cardDeleted = new EventEmitter<any>();

    public deletedButtonItems: ButtonItems[] = [];
    public favoriteButtonItems: ButtonItems[] = [];
    public isFavorite: boolean = false;

    constructor (
        private router: Router,
        private cdr: ChangeDetectorRef,
        private _notes: NotesService,
        private _lc: LocalStorageService
    ) {}

    ngOnInit() {
        const deletedItemsData = localStorage.getItem('deletedItems');
        this.deletedButtonItems = deletedItemsData ? JSON.parse(deletedItemsData) : [];

        const favoriteItemsData = localStorage.getItem('favoriteItems');
        this.favoriteButtonItems = favoriteItemsData ? JSON.parse(favoriteItemsData) : [];

    }

    // delFromLocalSt(item: any, index: number) {
    //     if (this.allItemsAction) {
    //         const storedData = this.getKeyStorage('buttonItems');
    //         this.buttonItems = JSON.parse(storedData!);
    //         const findEL = this.buttonItems!.find((buttonItem: any) => buttonItem.id === item.id);
    //         console.log('мы на странице всех записей');   

    //         if (findEL) {
    //             // 1 добавить удаленный массив в новый массив
    //             this.deletedButtonItems.push(item);
    
    //             // 2 сохранить в новом хранилище
    //             this.saveDeletedButtons();
                
    //             // 3 удалить из старого хранилища
    //             this.buttonItems?.splice(index, 1);
    //             this.saveNewItem(this.buttonItems);
    //         } else {
    //             console.log('не получилось удалить запись');
    //         }
    //     } else if (this.deletedAction) {
    //         console.log('мы на странице удаленных записей');
    //         const storedData = this.getKeyStorage('deletedItems');
    //         this.buttonItems = JSON.parse(storedData!);
    //         const findEL = this.buttonItems!.find((buttonItem: any) => buttonItem.id === item.id);

    //         if (findEL) {
    //             // 1 удалить из старого хранилища
    //             this.buttonItems?.splice(index, 1);
    //             this.updateLocalSt('deletedItems', this.buttonItems);
    //         }
    //     } else if (this.favoriteAction) {
    //         console.log('мы на странице избранных записей');
    //         const storedData = this.getKeyStorage('favoriteItems');
    //         this.buttonItems = JSON.parse(storedData!);
    //         const findEL = this.buttonItems!.find((buttonItem: any) => buttonItem.id === item.id);

    //         if (findEL) {
    //             // 1 добавить удаленный массив в новый массив
    //             this.deletedButtonItems.push(item);
    
    //             // 2 сохранить в новом хранилище
    //             this.saveDeletedButtons();
                
    //             // 3 удалить из старого хранилища
    //             this.buttonItems?.splice(index, 1);
    //             this.saveNewItem(this.buttonItems);
    //         }
    //     }
    // }

    delFromLocalSt(item: any, index: number) {
        switch (this.actionType) {
            case 'all':
                this.handleItemAction(item, index, 'buttonItems', 'deletedItems');
                break;
            case 'deleted':
                this.handleItemAction(item, index, 'deletedItems');
                break;
            case 'favorite':
                this.handleItemAction(item, index, 'favoriteItems', 'deletedItems');
                break;
            default:
            console.log('Unknown action type');
        }

        this.cardDeleted.emit(item);
    }

    handleItemAction(item: any, index: number, sourceKey: string, targetKey?: string) {
        const storedData = this.getKeyStorage(sourceKey);
        this.buttonItems = JSON.parse(storedData!);
        const findEL = this.buttonItems.find((buttonItem: any) => buttonItem.id === item.id);

        if (findEL) {
            if (targetKey) {
                const targetItems = JSON.parse(this.getKeyStorage(targetKey) || '[]');
                targetItems.push(item);
                
                this.updateLocalSt(targetKey, targetItems);
            }
        
            this.buttonItems.splice(index, 1);

            this.buttonItems = [...this.buttonItems]
            this.updateLocalSt(sourceKey, this.buttonItems);
            this.cdr.detectChanges();
        } else {
            console.log('Item not found');
        }
    }

    getKeyStorage(key: string) {
        return localStorage.getItem(key);
    }

    addFavorite(item: any, index: number) {
        console.log(item);
        this.isFavorite = item !== null ? true : false;
        console.log(this.isFavorite);
        if (this.favoriteIcon) {
            console.log('мы в избранном и кликнули на сердце');
            this.isFavorite = false;
        } else {
            console.log('что-то пошло не так');
        }
        
        const storedData = localStorage.getItem('buttonItems');
        this.buttonItems = JSON.parse(storedData!);
        console.log(this.buttonItems);
        
        const findEL = this.buttonItems!.find((buttonItem: any) => buttonItem.id === item.id);  
        console.log(findEL);
              

        // if (findEL) {
        //     // 1 добавить удаленный массив в новый массив
        //     this.favoriteButtonItems.push(item);

        //     // 2 сохранить в новом хранилище
        //     this.saveFavoriteButtons();
            
        //     // 3 удалить из старого хранилища
        //     this.buttonItems?.splice(index, 1);
        //     this.saveNewItem(this.buttonItems);
        // } else {
        //     console.log('не получилось удалить запись');
        // }
    }

    public saveDeletedButtons() {
        localStorage.setItem('deletedItems', JSON.stringify(this.deletedButtonItems));
    }

    public saveFavoriteButtons() {
        localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteButtonItems));
    }

    public saveNewItem(item: any) {
        localStorage.setItem('buttonItems', JSON.stringify(item));
    }

    public updateLocalSt(key: string, item: any) {
        localStorage.setItem(key, JSON.stringify(item));
    }
}