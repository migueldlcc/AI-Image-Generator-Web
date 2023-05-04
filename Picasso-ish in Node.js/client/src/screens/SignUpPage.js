import React, { useState } from "react"; // { useEffect }
//import { generateArtworksRequest } from "../api";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Modal,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SignUpPage.css";
import { postSignUp } from "../api";

const SignUpPage = (props) => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const rules = [
    /[0-9]/, //password must contain a number
    /[a-z]/, //password must contain lowercase
    /[A-Z]/, //password must contain uppercase
    /[!@#$%^&*]/, //password must contain special char
    /^.{8,20}$/, //password length must be between 8 and 20 chars
    /[A-Z]/, //arbitrary rule to catch a space character
  ];

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

  const handleContinue = async (event) => {
    event.preventDefault();
    // if password follows the rules
    if (passValidate(password)) {
      // if the passwords match
      if (password === rePassword) {
        try {
          const response = await postSignUp(
            email,
            password,
            Fname,
            Lname,
            birthday
          );
          console.log(response);
          if (response === 200) {
            props.setLoggedIn(true);
            props.setEmail(email);
            navigate("/");
          } else if (response === 409) {
            setErrorMessage("That email is already in use.");
            setShowModal(true);
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrorMessage("Passwords do not match.");
        setShowModal(true);
      }
    } else {
      setErrorMessage(
        "Please make sure the password is between 8 and 20 characters long, contains a Capital Letter, a number, and a special character."
      );
      setShowModal(true);
    }
  };

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
            <h2 className="Create-Account-Text">Create Account</h2>
          </Col>
        </Row>
        <Form onSubmit={handleContinue}>
          <Row className="justify-content-center signUpForm">
            <Form.Group as={Col} md={2} controlId="Fname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md={2} controlId="Lname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-center signUpForm">
            <Form.Group as={Col} md={4} controlId="DoB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-center signUpForm">
            <Form.Group as={Col} md={4} controlId="Email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-center signUpForm">
            <Form.Group as={Col} md={4} controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain a capital
                letter, a number, and a special character, must not contain
                spaces or emoji.
              </Form.Text>
            </Form.Group>
          </Row>
          <Row className="justify-content-center signUpForm">
            <Form.Group as={Col} md={4} controlId="RePassword">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                onChange={(e) => setRePassword(e.target.value)}
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
            <p className="sign-in-text">
              Already have an account? <Link to="/sign-in">Sign in Now!</Link>
            </p>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>There was a problem signing up.</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUpPage;
