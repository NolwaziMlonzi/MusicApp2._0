import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Genre } from '../genre';
import { GenreService } from '../genre.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  genreId: number;
  genre: Genre;
  detailsForm;
  constructor(
    public genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.detailsForm = this.formBuilder.group({
      genreId: [''],
      name: [''],
      description: ['']
    });
  }

  ngOnInit() {

    this.getId();
    this.getIdDetails();
  }

  /**
   *
   * get genre record of the given id
   *
   **/
  getIdDetails() {

    this.genreService.getGenre(this.genreId).subscribe((data: Genre) => {
      this.genre = data;
      this.detailsForm.patchValue(data);
    });
  }

  /**
   *
   * get Id of the selected genre record
   *
   **/
  getId() {
    this.route.params.subscribe((params: Params) => {
      this.genreId = params.genreId;
      (this.genreId, "params ", params)
    });
  }

  /**
   *
   * call this method on submit to save details
   *
   **/
  onSubmit(formData) {
    this.genreService.createGenre((this.genreId, formData.value)).subscribe(res => {
      if (res) {
        this.openSnackBar(res);
        this.list();
      }
    });

  }

  /**
   *
   * redirect to Genre List
   *
   *
   **/
  list() {
    this.router.navigateByUrl('genre/list');
  }

  /**
   *
   * display notification afteradding genre
   *
   **/

  openSnackBar(response) {
    this.snackBar.open('Successfully Updated Genre to : ' + response.name, 'OK', {
      duration: 5000
    });
  }
}
