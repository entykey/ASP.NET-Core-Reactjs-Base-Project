import * as React from "react";
//import 'isomorphic-fetch';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Col, Container, Row } from 'reactstrap';
//import Col from "react-bootstrap/Col";

export class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }

    // Handle all changes in the state
    handleOnChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    // Return JS object as ASP expect, ready for parsing to JSON
    prepareFormData(data = this.state) {
        return {
            UserName: data.userName.trim(),
            FullName: data.fullName.trim(),
            Email: data.email.trim(),
            Password: data.password.trim(),
            ConfirmPassword: data.confirmPassword.trim()
        };
    }

    registerUser(event) {
        // When pressing Enter, the page shouldn't reload
        event.preventDefault();

        var data = JSON.stringify(this.prepareFormData());

        console.log('form submitted ✅');

        // Send POST request with data submited from form
        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        })
            .then(this.checkStatus);
    }

    // Tell fetch() that 4xx and 5xx are client and server errors respectively,
    // since it hasn't clue yet; redirect to pages depending of response's status code
    checkStatus = (res) =>  {
        if (res.status >= 200 && res.status < 300) {
            this.props.history.push('/login');
        } else {
            let error = new Error(res.statusTest);
            console.log(error);
            this.props.history.push('/error');
        }
    }

    render() {
        return (
            <Container>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                        {/*<form onSubmit={this.registerUser}>*/}
                            <Form onSubmit={this.registerUser} horizontal>
                                <FormGroup>
                                    <Col componentClass={Label} sm={2}>Username</Col>
                                    <Col sm={5}>
                                        <Input type="text" placeholder="Username" id="userName" onChange={this.handleOnChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={Label} sm={2}>Full Name</Col>
                                    <Col sm={5}>
                                        <Input type="text" placeholder="Full Name" id="fullName" onChange={this.handleOnChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={Label} sm={2}>Email</Col>
                                    <Col sm={5}>
                                        <Input type="email" placeholder="Email" id="email" onChange={this.handleOnChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={Label} sm={2}>Password</Col>
                                    <Col sm={5}>
                                        <Input type="password" placeholder="Password" id="password" onChange={this.handleOnChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={Label} sm={2}>Confirm Password</Col>
                                    <Col sm={5}>
                                        <Input type="password" pattern={this.state.password} placeholder="Confirm Password" id="confirmPassword" onChange={this.handleOnChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit">Register</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        {/*</form>*/}
                    </Col>
                    <Col xs={6} md={4}>
                        {/*Helpful way to see how state changes dynamically so I left it here*/}
                        {/*<FormGroup>*/}
                        {/*    <ControlLabel>Hello, stranger! Are you ok with this info:</ControlLabel>*/}
                        {/*    <FormControl.Static>Username: {this.state.userName}</FormControl.Static>*/}
                        {/*    <FormControl.Static> Full Name: {this.state.fullName}</FormControl.Static>*/}
                        {/*    <FormControl.Static>Email: {this.state.email}</FormControl.Static>*/}
                        {/*</FormGroup>*/}
                    </Col>
                </Row>
            </Container>
        );
    }
}