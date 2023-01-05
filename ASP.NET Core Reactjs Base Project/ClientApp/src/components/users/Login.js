﻿import * as React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
//import 'isomorphic-fetch';
import { Form, FormGroup, Input, Label, Button, Col, Container, Row } from 'reactstrap';
import { setAccessToken, setUser, isLoggedIn } from '../../utils/helpers';

export class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            password: '',
            loggedIn: isLoggedIn()
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }

    handleOnChange = event => {
        this.setState({ [event.target.id]: event.target.value, errors: [] });
    }

    prepareFormData(data = this.state) {
        return {
            UserName: data.userName.trim(),
            Password: data.password.trim()
        };
    }
    // fetch way: (bug: cannot set cookie)
    loginUser = event => {
        // When pressing Enter, the page shouldn't reload
        event.preventDefault();

        var data = JSON.stringify(this.prepareFormData());
        console.log('form submitted ✅');

        // Send POST request with data submited from form
        fetch('https://localhost:7084/api/Users/Login', {     // fetch('/api/users/login'
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        })
            .then(this.checkStatus);
    }
    // axios way: (good)
    handleSubmit = async (e) => {
        e.preventDefault();

        console.log('[handleSubmit] form submitted ✅');
        var data = JSON.stringify(this.prepareFormData());

        try {
            const response = await axios.post(
                "https://localhost:7084/api/Users/Login",
                //JSON.stringify({ user, pwd }),
                data,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            ).then(this.checkStatus); // set localstorage & navigate to "/", rerender NavMenu.js
            
            //setSuccess(true);
            // clear state and controlled inputs
            //setUser("");
            //setPwd("");
            //setMatchPwd("");
        } catch (err) {
            if (!err?.response) {
                //setErrMsg("No Server Response");
                console.log("No Server Response");
            } else if (err.response?.status === 409) {
                //setErrMsg("Username Taken");
                console.log("Username Taken");
            } else {
                //setErrMsg("Registration Failed");
                console.log("Registration Failed");
            }
            //errRef.current.focus();
        }
    };

    // Tell fetch() that 4xx and 5xx are client and server errors respectively,
    // since it hasn't clue yet; redirect to pages depending of response's status code
    checkStatus = (res) => {
        if (res.status >= 200 && res.status < 300) {
            console.table(res);
            setAccessToken(res.access_token);
            setUser(this.state.userName);
            this.setState({ loggedIn: true });
            this.props.history.push('/example');
        } else {
            let error = new Error(res.statusTest);
            console.log(error);
            this.props.history.push('/error');
        }
    }

    render() {
        if (this.state.loggedIn) {
            return <Navigate to="/" />;
        }

        return (
            <Container>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                        <Form onSubmit={this.handleSubmit} horizontal>
                            <FormGroup>
                                <Col componentClass={Label} sm={2}>Username</Col>
                                <Col sm={5}>
                                    <Input type="text" placeholder="Username" id="userName" onChange={this.handleOnChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={Label} sm={2}>Password</Col>
                                <Col sm={5}>
                                    <Input type="password" placeholder="Password" id="password" onChange={this.handleOnChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">Login</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col xs={6} md={4}>
                    </Col>
                </Row>
            </Container>
        );
    }
}