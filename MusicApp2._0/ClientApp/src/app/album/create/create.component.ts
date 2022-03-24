import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Song } from '../../song/song';
import { Genre } from '../../genre/genre';
import { Artist } from '../../artist/artist';
import * as _ from 'lodash';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


@NgModule({

  imports: [
    MatSnackBar

  ],

  exports: [
    MatSnackBar
  ]

})
export class CreateComponent implements OnInit {
  albums: Album[] = [];
  artists: Song[] = [];
  genres: Genre[] = [];
  createForm;
  constructor(
    public albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm = this.formBuilder.group({
      albumId: [0],
      title: ['', Validators.required],
      writer: [''],
      price: [0],
      artistId: [0],
      genreId: [0],
    });
  }

  ngOnInit() {
    this.getArtistList();
    this.getGenreList();
  }

  /**
  * 
  * get list of all artists to populate dropdown
  *
  **/
  getArtistList() {
    this.albumService.getArtists().subscribe((data: Artist[]) => {
      this.artists = _.get(data, "artistsList", []);
    });
  }

  /**
  * 
  * get list of all genres to populate dropdown
  *
  **/
  getGenreList() {
    this.albumService.getGenres().subscribe((data: Genre[]) => {
      this.genres = _.get(data, "genreList", []);
    });
  }

  /**
   *
   * call this method on submit to save details
   *
   **/
  onSubmit(formData) {
    this.albumService.createAlbum(formData.value).subscribe(res => {
      if (res) {
        this.openSnackBar(res);
        this.list();
      }
    });
  }

  /**
   *
   * redirect to Album List
   *
   *
   **/
  list() {
    this.router.navigateByUrl('album/list');
  }

  /**
   *
   * display notification afteradding album
   *
   **/

  openSnackBar(response) {
    this.snackBar.open('Successfully Added Album : ' + response.title, 'OK', {
      duration: 5000
    });
  }
}
