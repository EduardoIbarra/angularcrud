import { Component, OnInit } from '@angular/core';
import {Movie} from '../interfaces/movie';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  movie: Movie = {
    name: null,
    year: null,
    description: null,
    duration: null,
    genre: null
  };
  id: any;
  editing: boolean = false;
  movies: Movie[];
  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.editing = true;
      this.moviesService.get().subscribe((data: Movie[]) => {
        this.movies = data;
        this.movie = this.movies.find((m) => { return m.id == this.id });
        console.log(this.movie);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.editing = false;
    }
  }

  ngOnInit() {
  }

  saveMovie() {
    if (this.editing) {
      this.moviesService.put(this.movie).subscribe((data) => {
        alert('Película actualizada');
        console.log(data);
      }, (error) => {
        console.log(error);
        alert('Ocurrió un error');
      });
    } else {
      this.moviesService.save(this.movie).subscribe((data) => {
        alert('Película guardada');
        console.log(data);
      }, (error) => {
        console.log(error);
        alert('Ocurrió un error');
      });
    }
  }

}
