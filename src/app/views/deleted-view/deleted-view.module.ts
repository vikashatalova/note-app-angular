import { ViewModule } from './../../core/components/view/view.module';
import { DeletedViewComponent } from './deleted-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletedViewRoutingModule } from './deleted-view-routing.module';
import { CardsListModule } from 'src/app/core/components/cards-list/cards-list.module';


@NgModule({
    declarations: [
        DeletedViewComponent
    ],
    imports: [
        CommonModule,
        DeletedViewRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ViewModule,
        CardsListModule
    ]
})
export class DeletedViewModule {}
