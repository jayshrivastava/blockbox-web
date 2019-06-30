import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import SearchBar from "./../components/searchBar"
import ApiCallService from "./../services/apiCallService"
import MoviesList from "./../components/moviesList";
import { IMovie, IUser} from "./../interfaces"
import Switch from "react-switch";
import store from "store";

interface StartStates {
    movies: IMovie[],
    moviesHaveLoaded: boolean,
    recommendationsSwitchChecked: boolean,
    user: IUser,
    disableAll: boolean;
}

class Start extends Component<any, StartStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: [],
            moviesHaveLoaded: false,
            recommendationsSwitchChecked: false,
            user: { _id: '', ratingsIndexedByMovieId: {} },
            disableAll: false,
        };
    }

    async addRating(movieId: string, rating: number ) {
        const user = this.state.user;

        if (!user.ratingsIndexedByMovieId){
            user.ratingsIndexedByMovieId = {}
        }
        user.ratingsIndexedByMovieId[movieId] = rating / 5;

        const userUpdateRatingsResponse = ApiCallService.updateRatingsForUser({
            id: this.state.user._id,
            ratingsIndexedByMovieId: user.ratingsIndexedByMovieId
        });

        this.setState({ user })
    }

    async componentDidMount() {
        // set initial movies
        let moviesResponse = await ApiCallService.getMovies();

        // get/set user
        const userId = store.get("blockboxUserId");
        let user: IUser;
        let userResponse;
        if (!userId) {
            userResponse = await ApiCallService.createUser();
            store.set("blockboxUserId", { _id: userResponse.body._id });
        } else {
            userResponse = await ApiCallService.getUserById(userId._id);
        }
        user = userResponse.body

        // set state
        await this.setState({
            movies: moviesResponse.body,
            moviesHaveLoaded: true,
            user,
        });
    }

    public searchBarOnSubmitFunction = async (e: any) => {
        e.preventDefault();

        this.setState({
            moviesHaveLoaded: false,
            disableAll: true,
        })

        let response = await ApiCallService.searchMovies(e.target.elements.query.value);

        this.setState({
            movies: response.body,
            moviesHaveLoaded: true,
            disableAll: false,
        })
    }

    public recommendationsSwitchOnChangeHandler = async () => {
        await this.setState({
            recommendationsSwitchChecked: !this.state.recommendationsSwitchChecked,
            moviesHaveLoaded: false,
            disableAll: true,
        })

        // if no movies have been rated, send an empty array to the movies list
        if (this.state.user.ratingsIndexedByMovieId === undefined && this.state.recommendationsSwitchChecked) {
            await this.setState({
                movies: [],
                moviesHaveLoaded: true,
                disableAll: false,
            })
            return;
        }

        const movies = this.state.recommendationsSwitchChecked ? await ApiCallService.getRecommendations(this.state.user._id) :  await ApiCallService.getMovies();

        this.setState({
            movies: movies.body,
            moviesHaveLoaded: true,
            disableAll: false,
        })
    }

    render() {
        return (
            <Container className='start-container'>
                <Row className='header'>
                    <Col sm="12" md="9">
                        <p className="titleText"> Blockbox Movie Recommender </p>
                    </Col>

                </Row>
                <Row className='tools'>
                    <Col md="3">
                        <p style={{textAlign: 'left', paddingTop: '1%', fontSize: "1.2em" }}> <b>{this.state.recommendationsSwitchChecked ? "Recommended for You " : "Movies Search"}  </b> </p>
                    </Col>
                    <Col md="5">
                        <SearchBar
                            onSubmit={this.searchBarOnSubmitFunction.bind(this)}
                            searchEnabled={!this.state.disableAll}
                        />
                    </Col>
                    <Col md="4">
                        <Row>
                        <Col sm="8" >
                            <p style={{textAlign: 'right', paddingTop: '2%', }}>
                            Toggle Recommender: 
                            </p>
                        </Col>
                            <Col sm="4" >
                                <Switch
                                    onChange={this.recommendationsSwitchOnChangeHandler}
                                    checked={this.state.recommendationsSwitchChecked}
                                    onColor="#343a40"
                                    offColor="#343a40"
                                    onHandleColor="#2693e6"
                                    handleDiameter={30}
                                    uncheckedIcon={this.renderCheckedIcon('Off')}
                                    checkedIcon={this.renderCheckedIcon('On')}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={40}
                                    width={100}
                                    className="react-switch"
                                    id="material-switch"
                                    disabled={this.state.disableAll}
                                />

                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Row className="moviesListRow">
                    <MoviesList
                        movies={this.state.movies}
                        moviesHaveLoaded={this.state.moviesHaveLoaded}
                        ratedMovies={this.state.user.ratingsIndexedByMovieId ? this.state.user.ratingsIndexedByMovieId : {}}
                        addRating={this.addRating.bind(this)}
                    />

                </Row>
            </Container>
        );
    }

    public renderCheckedIcon = (text: string) => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    color: "white",
                    paddingRight: 2,
                }}
                >
                {text}
            </div>
        )
    }

}

export default Start;
