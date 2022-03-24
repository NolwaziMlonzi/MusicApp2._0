import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../genre';
import { GenreService } from '../genre.service';
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
  genres: Genre[] = [];
  createForm;
  constructor(
    public genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm = this.formBuilder.group({
      genreId: [0],
      name: ['', Validators.required],
      description: ['']
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
    this.genreService.createGenre(formData.value).subscribe(res => {
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
    this.snackBar.open('Successfully Added Genre : ' + response.name, 'OK', {
      duration: 5000
    });
  }
}
