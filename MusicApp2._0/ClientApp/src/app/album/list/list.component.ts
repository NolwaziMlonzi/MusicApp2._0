import { Component, NgModule, OnInit } from '@angular/core';
import { Album } from "../album";
import { AlbumService } from "../album.service";
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { Song } from '../../song/song';

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

  albums: Album[] = [];
  songs: Song[] = [];
  deleteId = 0;
  constructor(public albumService: AlbumService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.albums = null;
    this.getList();
  }

  /**
   * get list of all albums
   *
   * */
  getList() {
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = _.get(data, "albumsList", []);
    });
  }

  /**
   * 
   * search album by name
   *
   **/
  searchAlbums() {
    var list = [];
    this.albums = undefined;
    var param = $('#search').val().toString().toLowerCase();
    this.albumService.getAlbums().subscribe((data: Album[]) => {
      this.albums = _.filter(_.get(data, "albumsList", []), function (item) {
        (item['title'].toLowerCase(), "return filter list", param)
        return item['title'].toLowerCase() == param;
      })
    });
  }

  /**
  * 
  * executed when user has confirmed delete album of the param id
  * 
  * @param id
  */
  public confirmedDeleteAlbum(id) {
    this.albumService.deleteAlbum(id).subscribe(res => {
      if (res) {
        this.openSnackBar(id);
        this.getList();
      }
    });
  }

  /**
  * display message after deleting album
  * @param response
  */
  openSnackBar(id) {
    this.snackBar.open('Successfully Deleted Album ID : ' + id, 'OK', {
      duration: 5000
    });
  }

}
