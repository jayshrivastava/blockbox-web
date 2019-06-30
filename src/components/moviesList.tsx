import React, { Component } from "react";
import Spinner from 'react-bootstrap/Spinner'
import { Container, Row, Col } from 'react-bootstrap';
import ApiCallService from './../services/apiCallService'
import { IMovie } from './../interfaces'

import MovieCard from './movieCard'

interface IMoviesListProps {
  moviesHaveLoaded: boolean;
  movies: IMovie[];
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
    const response = await ApiCallService.sendRequest('GET', '/movies/search/');

    console.log(response.body);
    this.setState({
      movies: response.body,
      moviesHaveLoaded: true,
    })
  }

  public render() {
    return (

      !this.props.moviesHaveLoaded
        ?
        <Spinner
          animation="border"
        >
        </Spinner>
        :
        // <div className="moviesBox">
          <Container className="moviesBox"
          >
            <Row className="justify-content-md-center">
            {this.props.movies.map((movie: IMovie) => {
              return (
                <Col sm="12" md="6" lg="4" key={movie.movieId} >
                  <MovieCard
                    movie={movie}
                  /> 

                </Col>

              )
            })
            }
            </Row>
          </Container>
        // </div >
    )
  }
}

export default MoviesList;
