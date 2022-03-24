import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artist } from '../../artist/artist';
import { Genre } from '../../genre/genre';
import * as _ from 'lodash';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
@NgModule({

  imports: [
    MatSnackBar

  ],

  exports: [
    MatSnackBar
  ]

})
export class DetailsComponent implements OnInit {
  albumId: number;
  album: Album;
  artists: Artist[] = [];
  genres: Genre[] = [];
  detailsForm;
  constructor(
    public albumService: AlbumService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.detailsForm = this.formBuilder.group({
      albumId: [0],
      title: ['', Validators.required],
      price: [0],
      artistId: [0],
      genreId: [0],
    });
  }

  ngOnInit() {

    this.getId();
    this.getIdDetails();
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
   * get album record of the given id
   *
   **/
  getIdDetails() {

    this.albumService.getAlbum(this.albumId).subscribe((data: Album) => {
      this.album = data;
      this.detailsForm.patchValue(data);
    });
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
   * call this method on submit to save details
   *
   **/
  onSubmit(formData) {
    this.albumService.updateAlbum(this.albumId, formData.value).subscribe(res => {
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
    this.snackBar.open('Successfully Updated Album to : ' + response.name, 'OK', {
      duration: 5000
    });
  }
}
