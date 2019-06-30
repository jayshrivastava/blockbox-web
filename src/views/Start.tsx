import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import SearchBar from "./../components/searchBar"
import ApiCallService from "./../services/apiCallService"
import MoviesList from "./../components/moviesList";
import { IMovie } from "./../interfaces"
import Switch from "react-switch";

interface StartStates {
    movies: IMovie[],
    moviesHaveLoaded: boolean,
    recommendationsSwitchChecked: boolean,
}

class Start extends Component<any, StartStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: [],
            moviesHaveLoaded: false,
            recommendationsSwitchChecked: false,
        };
    }

    async componentDidMount() {
        let response = await ApiCallService.sendRequest('GET', '/movies/search/');

        this.setState({
            movies: response.body,
            moviesHaveLoaded: true,
        })

    }

    public searchBarOnSubmitFunction = async (e: any) => {
        e.preventDefault();

        this.setState({
            moviesHaveLoaded: false,
        })

        let response = await ApiCallService.sendRequest('GET', '/movies/search/' + encodeURIComponent(e.target.elements.query.value));

        this.setState({
            movies: response.body,
            moviesHaveLoaded: true,
        })
    }

    public recommendationsSwitchOnChangeHandler = async () => {
        this.setState({
            recommendationsSwitchChecked: !this.state.recommendationsSwitchChecked,
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
                            searchEnabled={true}
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
                                />

                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Row className="moviesListRow">
                    <MoviesList
                        movies={this.state.movies}
                        moviesHaveLoaded={this.state.moviesHaveLoaded}
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
