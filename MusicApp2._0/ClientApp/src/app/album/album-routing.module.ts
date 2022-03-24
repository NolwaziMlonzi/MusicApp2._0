import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
  { path: 'album', redirectTo: 'album/list', pathMatch: 'full' },
  { path: 'album/list', component: ListComponent },
  { path: 'album/:albumId/details', component: DetailsComponent },
  { path: 'album/create', component: CreateComponent },
  { path: 'album/:albumId/edit', component: EditComponent },
  { path: 'album/:albumId/songs', component: SongsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
