import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { IMovie } from './../interfaces'
import StarRatingComponent from 'react-star-rating-component';

interface IMoviesListProps {
  movie: IMovie,
  addRating: any,
  rating?: number,
}

interface IMoviesListState {
  rating: number,
}

class MoviesList extends Component<IMoviesListProps, IMoviesListState> {
  constructor(props: IMoviesListProps) {
    super(props);

    this.state = {
      rating: this.props.rating ? this.props.rating : 0,
    }
  }

  async onStarClick(nextValue: number, prevValue: number, name: string) {
    await this.setState({ rating: nextValue });
    this.props.addRating(this.props.movie.movieId, nextValue)
  }


  async componentDidMount() {
  }

  mapscore(score: number) { 
    const value = score.toString().substring(2,4) + '%';
    if (score < 0.5) {
      return ( <p style={{color:"red"}}> {score.toString().substring(2,4) + '%'} Match </p>) 
    } 
    return  ( <p style={{color:"green"}}> {score.toString().substring(2,4) + '%'} Match </p>) 
  }

  public render() {
    return (
      <Container style={{ padding: 0 }}>
        <div className="movieCard">
          <div className="movieCardText">
          <b> {this.props.movie.title} </b> {this.props.movie.score ? <b> {this.mapscore(this.props.movie.score)} </b>: ''} 
            <p> {this.props.movie.genres.join(', ')} </p>
            <Row>
              <Col xs="5">
                <div> {this.state.rating ===0 ? <div className="unratedText"> <p style={{textAlign: "center"}}> Unrated </p> </div> : <div className="ratedText"> <p style={{textAlign: "center"}}> Rated </p> </div> }  </div>
              </Col>
              <Col xs="7">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={this.state.rating}
              renderStarIcon={this.renderStarIcon}
              onStarClick={this.onStarClick.bind(this)}
            />
            </Col>
            </Row>
          </div>
        </div>
      </Container>
    )
  }

  private renderStarIcon(index: number, value: number) {
    return (
      <span>
        <i className={index <= value ? "fas fa-star" : "far fa-star"} />
      </span>
    );
  }
}

export default MoviesList;
