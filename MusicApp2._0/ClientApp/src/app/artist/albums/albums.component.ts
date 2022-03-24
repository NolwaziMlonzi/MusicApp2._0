import { Component, NgModule, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { Album } from '../../album/album';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as _ from 'lodash';
import { ArtistService } from '../artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})

  @NgModule({

    imports: [
      MatSnackBar

    ],

    exports: [
      MatSnackBar
    ]

  })

export class AlbumsComponent implements OnInit {

  artists: Artist[] = [];
  albums: Album[] = [];
  artistId :number;
  constructor(public albumService: ArtistService,
  private snackBar: MatSnackBar,
  private route: ActivatedRoute,
  private router: Router,) { }

ngOnInit() {
  this.getId();
  this.getAlbumList();
}

/**
 *
 * get Id of the selected artist record
 *
 **/
getId() {
  this.route.params.subscribe((params: Params) => {
    this.artistId = params.artistId;
    (this.artistId, "params ", params)
  });
}
/**
* 
* get list of all albums
*
**/
getAlbumList() {
  var self = this;
  this.albumService.getAlbums().subscribe((data: Album[]) => {
    //("data album ", data)
    this.albums = _.filter(_.get(data, "albumsList", []), function (album) {
      return album.artistId == self.artistId;
    });
  });
}
}
