import React, { Component } from "react";
import Spinner from 'react-bootstrap/Spinner'
import { Container, Row, Col } from 'react-bootstrap';
import ApiCallService from './../services/apiCallService'

interface IMoviesListProps {

}

interface IMoviesListState {
  moviesHaveLoaded: boolean;
  movies: any[];
}

class MoviesList extends Component<IMoviesListProps, IMoviesListState> {
  constructor(props: IMoviesListProps) {
    super(props);

    this.state = {
      moviesHaveLoaded: false,
      movies: [],
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

      !this.state.moviesHaveLoaded
        ?
        <Spinner
          animation="border"
        >
        </Spinner>
        :
        <div className="moviesBox">
          <Container
          >
            <Row className="justify-content-md-center">
            {this.state.movies.map((movie: any) => {
              return (

                <Col>
                  <Container
                    key={movie.movieId}
                  >

                    <p> {movie.title}  </p>
                    <p> {movie.genres} </p>
                  </Container>

                </Col>

              )
            })
            }
            </Row>
          </Container>
        </div >
    )
  }

  // private renderMovies = (movies: any[]) => {
  //   return ();
  // }
}

export default MoviesList;
