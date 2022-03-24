import { Component, NgModule, OnInit } from '@angular/core';
import { Genre } from "../genre";
import { GenreService } from "../genre.service";
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
@NgModule({

  imports: [
    MatSnackBar

  ],

  exports: [
    MatSnackBar
  ]

})
export class ListComponent implements OnInit {

  genres: Genre[] = [];
  deleteId = 0;
  constructor(public genreService: GenreService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.genres = null;
    this.getList();
  }

  /**
   * get list of all genres
   *
   * */
  getList() {
    this.genreService.getGenres().subscribe((data: Genre[]) => {
      this.genres = _.get(data, "genreList", []);
    });
  }

  /**
   * 
   * search genre by name
   *
   **/
  searchGenre() {
    var list = [];
    this.genres = undefined;
    var param = $('#search').val().toString().toLowerCase();
    this.genreService.getGenres().subscribe((data: Genre[]) => {
      this.genres = _.filter(_.get(data, "genreList", []), function (item) {
        (item['name'].toLowerCase(), "return filter list", param)
        return item['name'].toLowerCase() == param;
      })
    });
  }

  /**
  * 
  * executed when user has confirmed delete genre of the param id
  * 
  * @param id
  */
  public confirmedDeleteGenre(id) {
    this.genreService.deleteGenre(id).subscribe(res => {
      if (res) {
        this.openSnackBar(id);
        this.getList();
      }
    });
  }

  /**
  * display message after deleting genre
  * @param response
  */
  openSnackBar(id) {
    this.snackBar.open('Successfully Deleted Genre ID : ' + id, 'OK', {
      duration: 5000
    });
  }

}
