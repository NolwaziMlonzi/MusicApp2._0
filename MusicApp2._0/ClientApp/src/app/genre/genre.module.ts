import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreRoutingModule } from './genre-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent, EditComponent, CreateComponent],
  imports: [
    CommonModule,
    GenreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GenreModule { }
