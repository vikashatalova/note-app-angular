import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface ButtonItems {
    id: string,
    title: string | null,
    description: string | null,
    category: string | null,
    color: string | null
}

interface CategoryItems {
    name: string | null,
    color: string | null,
    isActive: boolean
}

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit {
    public buttonItems?: ButtonItems[];
    public copyButtonItems?: ButtonItems[];
    public deletedButtonItems: ButtonItems[] = [];
    public favoriteButtonItems: ButtonItems[] = [];

    public createNewItemForm = new FormGroup({
        title: new FormControl('', 
            [Validators.required]
        ),
        description: new FormControl('', 
            [Validators.required]
        ),
        category: new FormControl('', 
            [Validators.required]
        )
    })
    public selectCategoriesForm = new FormGroup({
        category: new FormControl('', [])
    });
    public categories: CategoryItems[] = [];
    public selectedOption?: string;
    public color: string = '#ff0000';
    public isVisible: boolean = false;
    public isVisibleForm: boolean = false;
    public errors: boolean = false;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private ngZone: NgZone
    ) { }

    ngOnInit(): void {
        this.loadDataFromLocalStorage();

        this.setErrors();
    }

    handleChangeComplete($event: any) {
        this.color = $event.color.hex;
    }

    getDataSelect(selectedValue: string | any) {
        this.buttonItems = this.copyButtonItems?.filter(item => {
            let check = (item.category)?.includes(selectedValue.name);
            console.log(check);
            
            // selectedValue.name === item.category
            // this.copyButtonItems?.includes(item.category);
        });
        
    }

    public saveDeletedButtons() {
        localStorage.setItem('deletedItems', JSON.stringify(this.deletedButtonItems));
    }

    public saveFavoriteButtons() {
        localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteButtonItems));
    }

    public addNote() {
        this.ngZone.run(() => {
           const newItem: ButtonItems = {
                id: this.generateId(),
                title: this.createNewItemForm.controls.title.value,
                description: this.createNewItemForm.controls.description.value,
                category: this.createNewItemForm.controls.category.value,
                color: this.color
            }

            const newCategoryItem: CategoryItems = {
                name: this.createNewItemForm.controls.category.value,
                color: this.color,
                isActive: true
            }

            this.buttonItems = [...this.buttonItems!, newItem];
            this.saveNewItem(this.buttonItems);

            this.categories.push(newCategoryItem);        
            this.saveNewCategories(this.categories);

            if (this.buttonItems && this.categories) {
                this.createNewItemForm.reset();
                this.isVisible = false;
            }

            this._changeDetectorRef.detectChanges(); 
        })
    }

    public saveNewItem(item: any) {
        localStorage.setItem('buttonItems', JSON.stringify(item));
    }

    public saveNewCategories(item: any) {
        localStorage.setItem('categories', JSON.stringify(item));
    }

    public loadDataFromLocalStorage() {
        const storedData = localStorage.getItem('buttonItems');
        this.buttonItems = storedData ? JSON.parse(storedData) : [];

        const deletedItemsData = localStorage.getItem('deletedItems');
        this.deletedButtonItems = deletedItemsData ? JSON.parse(deletedItemsData) : [];

        const favoriteItemsData = localStorage.getItem('favoriteItems');
        this.favoriteButtonItems = favoriteItemsData ? JSON.parse(favoriteItemsData) : [];

        const categoriesItemsData = localStorage.getItem('categories');
        this.categories = categoriesItemsData ? JSON.parse(categoriesItemsData) : this.categories;

        this.copyButtonItems = [...this.buttonItems!];
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private setErrors() {
        for (const category of this.categories) {
            this.createNewItemForm.controls.category.valueChanges.subscribe(value => {
                if (value === category.name) {
                    this.createNewItemForm.setErrors({'incorrect': true});
                    this.createNewItemForm.updateValueAndValidity();
                    this.errors = true;
                    console.log('одинаколвые названия категорий');
                } else {
                    this.errors = false;
                    this.createNewItemForm.updateValueAndValidity();
                    console.log('нет совпадения');
                }
            })
        }
    }
}