import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

@NgModule({

  imports: [
    MatSnackBar

  ],

  exports: [
    MatSnackBar
  ]

})
export class EditComponent implements OnInit {
  artistId: number;
  artist: Artist;
  editForm;
  constructor(
    public artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.formBuilder.group({
      artistId: [''],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.getId();
    this.getIdDetails();
  }

  /**
   *
   * get artist record of the given id
   *
   **/
  getIdDetails() {

    this.artistService.getArtist(this.artistId).subscribe((data: Artist) => {
      this.artist = data;
      this.editForm.patchValue(data);
    });
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
   * call this method on submit to save details
   *
   **/
  onSubmit(formData) {
    this.artistService.updateArtist(this.artistId, formData.value).subscribe(res => {
      if (res) {
        this.openSnackBar(res);
        this.list();
      }
    });

  }

  /**
   *
   * redirect to Artist List
   *
   *
   **/
  list() {
    this.router.navigateByUrl('artist/list');
  }

  /**
   *
   * display notification afteradding artist
   *
   **/

  openSnackBar(response) {
    this.snackBar.open('Successfully Updated Artist to : ' + response.name, 'OK', {
      duration: 5000
    });
  }
}

