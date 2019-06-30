import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IMovie } from './../interfaces'


interface IMoviesListProps {
    onSubmit: any;
    searchEnabled: boolean;
}

interface IMoviesListState {
}

class MoviesList extends Component<IMoviesListProps, IMoviesListState> {
    constructor(props: IMoviesListProps) {
        super(props);

        this.state = {
        }
    }

    public onChange = async (e: any) => {
        e.preventDefault()
    }


    async componentDidMount() {

    }

    public render() {
        return (
            <Container>
                <Row >
                    <Col>
                        <Form onSubmit={this.props.onSubmit}>
                            <Row>
                                <Col md="9">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control 
                                        type="text" 
                                        name="query" 
                                        ref="query" 
                                        placeholder="Search Movies" 
                                        onChange={this.onChange} 
                                        disabled={!this.props.searchEnabled}/>
                                    </Form.Group>
                                </Col>
                                <Col md="3">
                                    <Button variant="dark" type="submit" disabled={!this.props.searchEnabled}>
                                        Search
                                     </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MoviesList;