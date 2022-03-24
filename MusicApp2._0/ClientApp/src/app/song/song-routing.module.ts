import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'song', redirectTo: 'song/list', pathMatch: 'full' },
  { path: 'song/list', component: ListComponent },
  { path: 'song/:songId/details', component: DetailsComponent },
  { path: 'song/create', component: CreateComponent },
  { path: 'song/:Id/edit', component: EditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
