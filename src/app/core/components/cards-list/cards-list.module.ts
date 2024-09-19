import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from 'src/app/core/components/cards-list/cards-list.component';
import { CardsListItemModule } from '../card-list-item/card-list-item.module';

@NgModule({
    declarations: [
        CardsListComponent
    ],
    imports: [
        CommonModule,
        CardsListItemModule,
        RouterModule
    ],
    exports: [CardsListComponent]
})
export class CardsListModule {}