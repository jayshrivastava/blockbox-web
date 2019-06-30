import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import ApiCallService from './../services/apiCallService'
import { IMovie } from './../interfaces'


interface IMoviesListProps {
  movie: IMovie;
  // rating?: 
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
    return (
      <Container style={{padding: 0}}>
        <div className="movieCard">
          <div className="movieCardText"> 
          <p> <b> {this.props.movie.title} </b> </p>
          <p> {this.props.movie.genres.join(', ')} </p>
          </div>
        </div>
      </Container>


    )
  }
}

export default MoviesList;
