import React, { useState } from "react"; //, { useState, useEffect }
//import { generateArtworksRequest } from "../api";
import "../styles/SignInPage.css";
import { Button, Form, Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { postSignIn } from "../api";

const SignInPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate();

  const handleContinue = async (event) => {
    event.preventDefault();

    if (passValidate(password)) {
      try {
        const response = await postSignIn(email, password);
        console.log(response);
        if (response != "Profile exists") {
          setSignInError("The email or password is incorrect.");
        } else {
          props.setLoggedIn(true);
          props.setEmail(email);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSignInError("The email or password is incorrect.");
    }
    /*
    if (userExists == true) {
      
    } */
  };

  const passValidate = (str) => {
    var pass = true;
    var i = 0;
    while (i < rules.length && pass === true) {
      var rule = rules[i];
      if (!rule.test(str)) {
        pass = false;
      }
      if (i === 5) {
        //special case for handling a space character
        if (str.includes(" ")) {
          pass = false;
        }
      }
      i++;
    }

    return pass;
  };

  const rules = [
    /[0-9]/, //password must contain a number
    /[a-z]/, //password must contain lowercase
    /[A-Z]/, //password must contain uppercase
    /[!@#$%^&*]/, //password must contain special char
    /^.{8,20}$/, //password length must be between 8 and 20 chars
    /[A-Z]/, //arbitrary rule to catch a space character
  ];

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={2}>
            <Image src="../images/logo-black.png" fluid />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <h2 className="Sign-In-Text">Sign In</h2>
            <p className="danger">{signInError}</p>
          </Col>
        </Row>
        <Form onSubmit={handleContinue}>
          <Row className="justify-content-center signInForm">
            <Form.Group
              as={Col}
              md={4}
              onChange={(e) => setEmail(e.target.value)}
            >
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="email" required />
            </Form.Group>
          </Row>
          <Row className="justify-content-center signInForm">
            <Form.Group as={Col} md={4}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Col md={1}>
              <Button type="submit">Continue</Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col md={{ span: 3, offset: 5 }}>
            <p className="new-account-text">
              New to Picasso-ish? <Link to="/sign-up">Create Account Now!</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignInPage;
