import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AlbumsComponent } from './albums/albums.component';

const routes: Routes = [
  { path: 'artist', redirectTo: 'artist/list', pathMatch: 'full' },
  { path: 'artist/list', component: ListComponent },
  { path: 'artist/:artistId/details', component: DetailsComponent },
  { path: 'artist/create', component: CreateComponent },
  { path: 'artist/:artistId/albums', component: AlbumsComponent },
  { path: 'artist/:artistId/edit', component: EditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
