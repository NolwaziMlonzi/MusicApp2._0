import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  artists: Artist[] = [];
  createForm;
  constructor(
    public artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm = this.formBuilder.group({
      artistId: [0],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  /**
   *
   * call this method on submit to save details
   *
   **/
  onSubmit(formData) {
    this.artistService.createArtist(formData.value).subscribe(res => {
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
    this.snackBar.open('Successfully Added Artist : ' + response.name, 'OK', {
      duration: 5000
    });
  }
}
