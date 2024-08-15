import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListItemComponent } from 'src/app/core/components/cards-list-item/cards-list-item.component';

@NgModule({
    declarations: [
        CardsListItemComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [CardsListItemComponent]
})
export class CardsListItemModule {}