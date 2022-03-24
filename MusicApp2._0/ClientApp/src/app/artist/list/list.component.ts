import { Component, NgModule, OnInit } from '@angular/core';
import { Artist } from "../artist";
import { ArtistService } from "../artist.service";
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

  artists: Artist[] = [];
  deleteId = 0;
  constructor(public artistService: ArtistService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.artists = null;
    this.getList();
  }

  /**
   * get list of all artists
   *
   * */
  getList() {
    this.artistService.getArtists().subscribe((data: Artist[]) => {
      this.artists = _.get(data, "artistsList", []);
    });
  }

  /**
   * 
   * search artist by name
   *
   **/
  searchArtist() {
    var list = [];
    this.artists = undefined;
    var param = $('#search').val().toString().toLowerCase();
    this.artistService.getArtists().subscribe((data: Artist[]) => {
      this.artists = _.filter(_.get(data, "artistsList", []), function (item) {
        (item['name'].toLowerCase(), "return filter list", param)
        return item['name'].toLowerCase() == param;
      })
    });
  }

  /**
  * 
  * executed when user has confirmed delete artist of the param id
  * 
  * @param id
  */
  public confirmedDeleteArtist(id) {
    this.artistService.deleteArtist(id).subscribe(res => {
      if (res) {
        this.openSnackBar(id);
        this.getList();
      }
    });
  }

  /**
  * display message after deleting artist
  * @param response
  */
  openSnackBar(id) {
    this.snackBar.open('Successfully Deleted Artist ID : ' + id, 'OK', {
      duration: 5000
    });
  }

}
