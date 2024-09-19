import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, tap, takeUntil } from 'rxjs';

interface ButtonItems {
    id: string,
    title: string | null,
    description: string | null,
    category: string | null,
    color: string | null
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
    public buttonItems?: ButtonItems[];
    public copyButtonItems?: ButtonItems[];

    filterForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl('')
    });

    private readonly _destroy$ = new Subject();

    ngOnInit(): void {
        const storedData = localStorage.getItem('buttonItems');
        this.buttonItems = storedData ? JSON.parse(storedData) : [];
    }

    searchItems(event: Event) {
        const inputElement = (event.target as HTMLInputElement).value;
        
        this.copyButtonItems = this.buttonItems!.filter((el) => el.title!.toLowerCase().indexOf(inputElement.toLowerCase()) >= 0)
        console.log('copyButtonItems',this.copyButtonItems);
    }
}