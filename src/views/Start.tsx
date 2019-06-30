import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import MoviesList from "./../components/moviesList";

interface StartStates { }

class Start extends Component<any, StartStates> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container className='start-container'>
                <Row>
                    <Col>
                        <p> React Bootstrap </p>
                    </Col>
                    <Col>
                        <p> React Bootstrap </p>
                    </Col>
                    <Col>
                        <p> React Bootstrap </p>
                    </Col>
                </Row>
                <MoviesList> </MoviesList>
            </Container>
         );
    }
}

export default Start;
