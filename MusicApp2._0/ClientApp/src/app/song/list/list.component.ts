import { Component, NgModule, OnInit } from '@angular/core';
import { Song } from "../song";
import { SongService } from "../song.service";
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

  songs: Song[] = [];
  deleteId = 0;

  constructor(public songService: SongService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.songs = null;
    this.getList();
  }

  /**
   * get list of all songs
   *
   * */
  getList() {
    this.songService.getSongs().subscribe((data: Song[]) => {
      this.songs = _.get(data, "songsList", []);
    });
  }

  /**
   * 
   * search song by name
   *
   **/
  searchSongs() {
    var list = [];
    this.songs = undefined;
    var param = $('#search').val().toString().toLowerCase();
    this.songService.getSongs().subscribe((data: Song[]) => {
      this.songs = _.filter(_.get(data, "songsList", []), function (item) {
        (item['title'].toLowerCase(), "return filter list", param)
        return item['title'].toLowerCase() == param;
      })
    });
  }

  /**
   *
   * open new feature notification
   * 
   * 
   */
  newFeature() {
    $('.modal').css('display', 'block');
  }

  /**
   *
   * close new feature notification
   * 
   * 
   */
  closeModal() {
    $('.modal').css('display', 'none');
  }

  /**
  * 
  * executed when user has confirmed delete song of the param id
  * 
  * @param id
  */
  public confirmedDeleteSong(id) {
    this.songService.deleteSong(id).subscribe(res => {
      if (res) {
        this.openSnackBar(id);
        this.getList();
      }
    });
  }

  /**
  * display message after deleting song
  * @param response
  */
  openSnackBar(id) {
    this.snackBar.open('Successfully Deleted Song ID : ' + id, 'OK', {
      duration: 5000
    });
  }

}
