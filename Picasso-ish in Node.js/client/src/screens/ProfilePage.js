import React, { useState, useEffect } from 'react';
import { postProfileRequest, updateProfileRequest, postSaved, postShared, postCards } from "../api";
import '../styles/HomePage.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function ProfilePage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    
    const [disabled, setDisabled] = useState(true);

    const [saved, setSaved] = useState([]);
    const [shared, setShared] = useState([]);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [cards, setCards] = useState([]);

    async function getCards() {
      // fuction that gets all the cards of the user and sets them to the cards state
      const dbCards = await postCards(props.Email);
      setCards(dbCards);
    }

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

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
      }

    async function getProfileAndSetEmail() {
        // function that gets all profile info, ans set the states for eav value
        const profile = await postProfileRequest(props.Email);
        setEmail(profile.p_email);
        setPassword(profile.p_password);
        setConfirmPassword(profile.p_password);
        setFirstName(profile.p_firstname);
        setLastName(profile.p_lastname);

        const dob = new Date(profile.p_dob);
        const year = dob.getFullYear();
        const month = dob.getMonth() + 1;
        const day = dob.getDate();
        setDateOfBirth(month + '/' + day + '/' + year);
    }

    async function getSavedImages() {
      //function that gets all images, adds them to an array and sets the state
      const imageList = [];
        const savedImg = await postSaved(props.Email);
        savedImg.forEach(image => {
            imageList.push(image);
          });
        setSaved(imageList);
    }

    async function getSharedImages() {
        //function that gets all images, adds them to an array and sets the state
        const imageSharedList = [];
          const sharedImg = await postShared(props.Email);
          sharedImg.forEach(image => {
            imageSharedList.push(image);
            });
          setShared(imageSharedList);
    }
    
    useEffect(() => {
        getProfileAndSetEmail();
        getSavedImages();
        getSharedImages();
        getCards();
    }, []);

    async function updateProfile() {
        console.log('in update');
        // if password follows the rules
        if (passValidate(password)) {
          // if the passwords match
          if (password === confirmPassword) {
            try {
                const response = await updateProfileRequest(email, password, firstName, lastName);
                console.log(response); // log response for debugging
                return true;
              } catch (error) {
                console.error(error);
                return false;
              }
          } else {
            setErrorMessage("Passwords do not match.");
            setShowModal(true);
            return false;
          }
        } else {
          setErrorMessage(
            "Please make sure the password is between 8 and 20 characters long, contains a Capital Letter, a number, and a special character."
          );
          setShowModal(true);
          return false;
        }
      };
    
    const toggleDisabled = async () => {
        // function that updates the profile info and changes the state
        if (!disabled) {
            const response = await updateProfile();
            if (response) {
                setDisabled(!disabled);
                setShowPassword(false);
                setShowConfirmPassword(false);
            }
        }
        else{
            setDisabled(!disabled);
        }
      };
  
    return (
    <>
      <Container>
        <br />
        <div class="row justify-content-center">
            <Card  border="secondary" style={{ width: '72rem', padding: "0"}}>
                <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Card.Text>
                    Edit your profile info by pressing the button below.
                </Card.Text>
                <br />
                <Form>
                <Form.Group controlId="profile">
                    <Row>
                        <Col md={6}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} disabled={true}/>
                        </ Col>
                        <br />
                        <Col md={5}>
                          <Form.Label>Password</Form.Label>
                          
                              <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                disabled={disabled}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                        </ Col>
                        <Col md={1}>
                          {showPassword ? <Form.Label>Hide</Form.Label> :<Form.Label>Show</Form.Label>}    
                          <Button variant="outline-secondary" onClick={togglePasswordVisibility} disabled={disabled}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>  
                        </Col>
                    </ Row>
                    <br />
                    <Row>
                        <Col md={6}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} disabled={disabled}  onChange={(e) => setFirstName(e.target.value)}/>
                        </ Col>
                        <br />
                        <Col md={5}>
                            <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={confirmPassword}
                                disabled={disabled}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                        </ Col>
                        <Col md={1}>
                          {showConfirmPassword ? <Form.Label>Hide</Form.Label> :<Form.Label>Show</Form.Label>}    
                          <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility} disabled={disabled}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>  
                        </Col>
                    </ Row>
                    <br />
                    <Row>
                        <Col md={6}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} disabled={disabled}  onChange={(e) => setLastName(e.target.value)}/>
                        </ Col>
                        <br />
                        <Col md={6}>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text"  value={dateOfBirth} disabled={true}/>
                        </ Col>
                    </ Row>
                </Form.Group>
                </ Form>
                <br />
                <br />
                <Card.Title>Cards</Card.Title>
                {cards.length === 0 ? (
                    <div className="col-12 text-center">
                        <h3>You have no cards saved</h3>
                    </div>)        
                    : (<Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Card Number</th>
                            <th>Expiry Date</th>
                            <th>CVV</th>
                          </tr>
                        </thead>
                        <tbody>
                        {cards.map((card, i) => (
                          <tr key={i}>
                            <td>{card.number}</td>
                            <td>{card.expiry}</td>
                            <td>{card.cvv}</td>
                          </tr>))}
                    </tbody>
                </Table>)}
                <br />
                <div class="d-grid gap-2 col-2 mx-auto">
                <Button variant={disabled ? "secondary" : "primary"} onClick={toggleDisabled}>
                    {disabled ? 'Change Info' : 'Submit Changes'}
                </Button>
                </div>
                </Card.Body>
            </Card>
        </div>
        <br />
        <div class="row justify-content-center">
            <Card  border="secondary" style={{ width: '72rem', padding: "0"}}>
                <Card.Body>
                    <Card.Title>Saved Images</Card.Title>
                    <Card.Text>
                        Go to your saved images by pressing the button below!
                    </Card.Text>
                    {cards.length === 0 ? (
                    <div className="col-12 text-center">
                        <h3>You have no saved images</h3>
                    </div>)        
                    : (<Row>
                        {saved.map((image, index) => ( 
                            <Col md={2} id="imagesWrapper" key={index}>
                                <Card.Img
                                    src={`data:image/png;base64,${image}`}
                                    alt={`Image ${index}`}
                                    fluid
                                />
                            </Col>
                        ))}
                    </Row>)}
                    <br />
                    <div class="d-grid gap-2 col-2 mx-auto">
                        <Button variant="secondary" as={Link} to="/saved-images">Show More</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
        <br />

        <div class="row justify-content-center">
            <Card border="secondary" style={{ width: '72rem', padding: "0" }}>
                <Card.Body>
                    <Card.Title>Shared Images</Card.Title>
                    <Card.Text>
                        Go to your shared images by pressing the button below!
                    </Card.Text>
                    {cards.length === 0 ? (
                    <div className="col-12 text-center">
                        <h3>You have no saved images</h3>
                    </div>)        
                    : (<Row>
                        {shared.map((image, index) => (
                            <Col md={2} id="imagesWrapper" key={index}>
                                <Card.Img
                                    src={`data:image/png;base64,${image}`}
                                    alt={`Image ${index}`}
                                    fluid
                                />
                            </Col>
                        ))}
                    </Row>)}
                    <br />
                    <div class="d-grid gap-2 col-2 mx-auto">
                        <Button variant="secondary" as={Link} to="/shared">Show More</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
        <br />
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>There was a updating you password.</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ProfilePage;