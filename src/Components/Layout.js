import React, { useState,useEffect } from 'react';

import { Container, Row, Col, Alert, Form, Button, Image, Jumbotron,Toast } from "react-bootstrap";
import Login from "./Login"
import Test from "./Test"
import '../styles/layout.css';
import Util from "../util/util"
import { LocalStorage } from "../util/localstorage"
// import login from './assets/login.png'; 

const Layout = () => {
    const initial = {
        email: "",
        password: "",
        category: "",
    }
    const [user, setUser] = useState(initial);
    const [userStage, setuserStage] = useState(0);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(localStorage.getItem("score"));
    const setValues = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    };
    const doLogin = (e) => {
        e.preventDefault();
        if(user.email!=="" && user.password !==""  && user.category!==""){
            console.log("user",user)
            const submit =user;
            submit.stage=1;
            setuserStage(1);
            LocalStorage.setItem("user", JSON.stringify(user))
        }else{
            setError(true);
            return false
        }
     
    
    }
    useEffect(() => {
        isSubmitted && setuserStage(2)
    }, [])
    return (
        <Container className="p-3" fluid>
            <Row >
            {isSubmitted &&
                     <Jumbotron classsName="jumbotron" fluid><h4>You have already submitted</h4></Jumbotron>
                    }
            {userStage== 1 &&
                    <Test category={user.category} />
                    }
                {userStage== 0 &&
                    <>
                        <Col  md={6} className="d-none d-md-block">
                            <Image src="../assets/login.png" />
                        </Col>
                        <Col sm={12} md={6} className="formBg align-items-center" >

                            <Jumbotron fluid>
                                <Form onSubmit={doLogin}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e) => setValues(e)} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" onChange={(e) => setValues(e)} />
                                    </Form.Group>


                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Select a category</Form.Label>
                                        <Form.Control as="select" name="category" onChange={(e) => setValues(e)}>
                                            {

                                                Util.getCategories() &&
                                                Util.getCategories().map((category, index) =>
                                                    <option key={index}>{category}</option>
                                                )}

                                        </Form.Control>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" >
                                        Submit
                                    </Button>
                                   {error &&  <Alert >Please fill all fields</Alert>}
                                </Form>
                            </Jumbotron>
                

                    </Col>
                    </>
                    }
            </Row>
        </Container>
    )
};

export default Layout;
