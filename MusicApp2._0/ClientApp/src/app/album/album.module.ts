import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { SongsComponent } from './songs/songs.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent, EditComponent, CreateComponent, SongsComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AlbumModule { }
