import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SongService } from '../song.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album } from '../../album/album';
import { Genre } from '../../genre/genre';
import { Artist } from '../../artist/artist';
import * as _ from 'lodash';
import { Song } from '../song';

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
  id: number;
  albums: Album[] = [];
  artists: Artist[] = [];
  genres: Genre[] = [];
  song: Song;
  detailsForm;
  constructor(
    public songService: SongService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar

  ) {
    this.detailsForm = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      writer: [''],
      year: [0],
      artistId: [0],
      genreId: [0],
      albumId: [0]
    });
  }

  ngOnInit() {
    this.getArtistList();
    this.getGenreList();
    this.getAlbumList();
    this.getId();
    this.getIdDetails();
    }

    /**
     *
     * get song record of the given id
     *
     **/
    getIdDetails() {

      this.songService.getSong(this.id).subscribe((data: Song) => {
        this.song = data;
        this.detailsForm.patchValue(data);
      });
    }

    /**
     *
     * get Id of the selected song record
     *
     **/
    getId() {
      this.route.params.subscribe((params: Params) => {
        this.id = params.songId;
        (this.id, "params ", params)
      });
    }

  /**
  * 
  * get list of all artists to populate dropdown
  *
  **/
  getArtistList() {
    this.songService.getArtists().subscribe((data: Artist[]) => {
      this.artists = _.get(data, "artistsList", []);
    });
  }

  /**
  * 
  * get list of all albums to populate dropdown
  *
  **/
  getAlbumList() {
    this.songService.getAlbums().subscribe((data: Album[]) => {
      this.albums = _.get(data, "albumsList", []);
    });
  }

  /**
  * 
  * get list of all genres to populate dropdown
  *
  **/
  getGenreList() {
    this.songService.getGenres().subscribe((data: Genre[]) => {
      this.genres = _.get(data, "genreList", []);
    });
  }

  /**
   *
   * call this method on submit to save details
   *
   **/
  onSubmit(formData) {
    this.songService.createSong(formData.value).subscribe(res => {
      if (res) {
        this.openSnackBar(res);
        this.list();
      }
    });
  }

  /**
   *
   * redirect to Song List
   *
   *
   **/
  list() {
    this.router.navigateByUrl('song/list');
  }

  /**
   *
   * display notification afteradding album
   *
   **/

  openSnackBar(response) {
    this.snackBar.open('Successfully Added Song : ' + response.title, 'OK', {
      duration: 5000
    });
  }
}
