import React, { Component } from "react";
import Spinner from 'react-bootstrap/Spinner'
import { Container, Row, Col } from 'react-bootstrap';
import ApiCallService from './../services/apiCallService'
import { IMovie, IRatingsIndexedByMovieId } from './../interfaces'

import MovieCard from './movieCard'

interface IMoviesListProps {
  moviesHaveLoaded: boolean;
  movies: IMovie[];
  ratedMovies: IRatingsIndexedByMovieId,
  addRating: any,
}

interface IMoviesListState {
}

class MoviesList extends Component<IMoviesListProps, IMoviesListState> {
  constructor(props: IMoviesListProps) {
    super(props);

    this.state = {
    }
  }

  async componentDidMount() {
  }

  public render() {
    if (!this.props.movies.length && this.props.moviesHaveLoaded) {
      return (
        <p> No movies found! Please rate some movies before trying to generate recommendations or broaden your search. </p>
      )
    }
    return (

      !this.props.moviesHaveLoaded
        ?
        <Container>
          <div className="spinnerDiv">
            <Spinner
              animation="border"
            >
            </Spinner>
          </div>
        </Container>
        :
        <Container className="moviesBox"
        >
          <Row className="justify-content-md-center">
            {this.props.movies.map((movie: IMovie) => {
              return (
                <Col sm="12" md="6" lg="4" key={movie.movieId} >
                  <MovieCard
                    movie={movie}
                    rating={movie.movieId in this.props.ratedMovies ? Math.floor(this.props.ratedMovies[movie.movieId] * 5) : 0}
                    addRating={this.props.addRating}
                  />

                </Col>

              )
            })
            }
          </Row>
        </Container>

    )
  }
}

export default MoviesList;
