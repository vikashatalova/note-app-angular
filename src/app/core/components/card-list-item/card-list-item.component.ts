import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NotesService } from "../../services/items.service";

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
    selector: 'app-card-list-item',
    templateUrl: './card-list-item.component.html',
    styleUrls: ['./card-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardListItemComponent implements OnInit {
    recordId: any;
    cardId: any;
    items: any;
    currentCategory!: 'all' | 'deleted' | 'favorite';
    filteredItems: any;
    titleContent: any;
    tmpTitle: string = '';
    isEditing: boolean = false;

    public buttonItems?: ButtonItems[];
    public copyButtonItems?: ButtonItems[];
    public deletedButtonItems: ButtonItems[] = [];
    public favoriteButtonItems: ButtonItems[] = [];

    updateData = new FormGroup({
        title: new FormControl(''),
        description: new FormControl('')
    });

    constructor (
        private route: ActivatedRoute , 
        private elem: ElementRef, 
        private renderer: Renderer2,
        private _notes: NotesService
    ) { }

    ngOnInit(): void {        
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.cardId = paramMap.get('id');
        })

        this.items = {
            all: this.getItemFromLocalStorage('buttonItems', this.cardId),
            deleted: this.getItemFromLocalStorage('deletedItems', this.cardId),
            favorite: this.getItemFromLocalStorage('favoriteItems', this.cardId)
        };

        for (const key in this.items) {
            if (this.items[key] !== undefined) {
                this.filteredItems = this.items[key];
                
                this.updateData.controls.title.setValue(this.filteredItems.title);
                this.updateData.controls.description.setValue(this.filteredItems.description);
            }
        }
    }

    getItemFromLocalStorage(key: string, id: any) {
        const storedData = localStorage.getItem(key);
        const parsedItems = storedData ? JSON.parse(storedData) : [];
        return parsedItems.find((item: any) => item.id === id);
    }

    // режим редактирования
    enableEditing(): void {
        this.isEditing = true;
    }

    saveTitle(event: any) {
        const value = event.target.value
        this.filteredItems.title = value;

        if (this.tmpTitle === this.filteredItems.title) {
            console.log('если заголовок не менялся');
        } else {
            console.log('если заголовок менялся');
        }

        // rewrite
        // const newTitle: ButtonItems = {
        //     title: this.filteredItems.title,
        //     category: this.filteredItems.category,
        //     color: this.filteredItems.color,
        //     description: this.filteredItems.description,
        //     id: this.filteredItems.id
        // }
        // console.log(newTitle);
        // если значение никак не менялось то выйти из режима редактирования
        
        this.isEditing = false;
    }

    loadDataFromLocalSt() {
        this.buttonItems = this._notes.getNoteItems();
        this.deletedButtonItems = this._notes.getDeletedNoteItems();
        this.favoriteButtonItems = this._notes.getFavoriteNoteItems();
    }
}