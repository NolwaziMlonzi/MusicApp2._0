import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'genre', redirectTo: 'genre/list', pathMatch: 'full' },
  { path: 'genre/list', component: ListComponent },
  { path: 'genre/:genreId/details', component: DetailsComponent },
  { path: 'genre/create', component: CreateComponent },
  { path: 'genre/:genreId/edit', component: EditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
