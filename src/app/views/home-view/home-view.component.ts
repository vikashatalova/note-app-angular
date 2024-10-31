import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit {
    // убрать/заменить полностью buttonItems
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

    public color: string = '#ff0000';
    public isVisible: boolean = false;
    public isVisibleForm: boolean = false;
    public errors: boolean = false;
    filteredCategories: any[] = [];  // Массив уникальных категорий

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
        console.log(selectedValue);
        
        // this.buttonItems = this.copyButtonItems?.filter(item => {
        //     return (item.categories.category.name)?.includes(selectedValue.name);
        // });
    }

    public addNote() {
        this.ngZone.run(() => {
            const item: ButtonItems = {
                id: this.generateId(),
                title: this.createNewItemForm.controls.title.value,
                description: this.createNewItemForm.controls.description.value,
                categories: {
                    category: {
                        name: this.createNewItemForm.controls.category.value,
                        color: this.color,
                    }
                },
            }

            this.buttonItems = [...this.buttonItems!, item];
            this.saveNewItem(this.buttonItems);

            if (this.buttonItems) {
                this.createNewItemForm.reset();
                this.isVisible = false;
            }

            this._changeDetectorRef.detectChanges(); 
        })
    }

    onCardDeleted(deletedItem: any) {
        this.buttonItems = this.buttonItems?.filter(item => item.id !== deletedItem.id);
    }
    

    public saveNewItem(item: any) {
        localStorage.setItem('buttonItems', JSON.stringify(item));
    }

    public loadDataFromLocalStorage() {
        const storedData = localStorage.getItem('buttonItems');
        this.buttonItems = storedData ? JSON.parse(storedData) : [];

        const deletedItemsData = localStorage.getItem('deletedItems');
        this.deletedButtonItems = deletedItemsData ? JSON.parse(deletedItemsData) : [];

        const favoriteItemsData = localStorage.getItem('favoriteItems');
        this.favoriteButtonItems = favoriteItemsData ? JSON.parse(favoriteItemsData) : [];

        this.copyButtonItems = [...this.buttonItems!];
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private setErrors() {
        for (const item of this.buttonItems!) {
            this.createNewItemForm.controls.category.valueChanges.subscribe(value => {
                if (value === item.categories.category.name) {
                    this.createNewItemForm.setErrors({'incorrect': true});
                    this.createNewItemForm.updateValueAndValidity();
                    this.errors = true;
                    console.log('одинаковые названия категорий');
                } else {
                    this.errors = false;
                    this.createNewItemForm.updateValueAndValidity();
                    console.log('нет совпадения');
                }
            })
        }
    }
}