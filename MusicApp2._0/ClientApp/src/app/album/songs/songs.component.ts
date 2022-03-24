import { Component, OnInit } from '@angular/core';
import { AlbumService } from "../album.service";
import { Song } from '../../song/song';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];
  public albumId: number;
  constructor(public albumService: AlbumService, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.getId();
    this.getSongList();
  }

  /**
   *
   * get Id of the selected album record
   *
   **/
  getId() {
    this.route.params.subscribe((params: Params) => {
      this.albumId = params.albumId;
      (this.albumId, "params ", params)
    });
  }
  /**
  * 
  * get list of all albums
  *
  **/
  getSongList() {
    var self = this;
    this.albumService.getSongs().subscribe((data: Song[]) => {
      this.songs = _.filter(_.get(data, "songsList", []), function (song) {
        return song.albumId == self.albumId;
      });
    });
  }
}
