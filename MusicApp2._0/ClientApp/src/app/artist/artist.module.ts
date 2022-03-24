import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistRoutingModule } from './artist-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { AlbumsComponent } from './albums/albums.component';


@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent, DetailsComponent, AlbumsComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArtistModule { }
