import React, { useState, useEffect } from 'react';
import { generateArtworksRequest, getArtworksRequest } from '../api';
import '../styles/HomePage.css';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Spinner,
} from 'react-bootstrap';
import ImageModal from '../Components/ImageModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

const HomePage = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [image, setImage] = useState('');
  const [imageDict, setImageDict] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageId, setSelectedImageId] = useState('1');

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm === '') { // Case to handle when the searh bar is empty of text
      alert('Add some text');
      return;
    }
    if (props.Email === 'jonathan@gmail.com') { // Prevents from generarting the images if the user is not signed in
      alert('Please sign in');
      navigate('/sign-in');
      return;
    }
    setIsLoading(true); // Spinner on
    const imageUrls = await generateArtworksRequest(searchTerm, props.Email); // JSON object with the generated the images requested by the user
    setIsLoading(false); // Spinner off
    navigate(`/showimage/${searchTerm}`, {
      state: {
        prompt: searchTerm,
        urls: imageUrls,
      },
    });
  };

  /* Fetch images in the home page */
  const fetchImage = async () => {
    setImageLoading(true); // Spinner on
    const imageData = await getArtworksRequest(); // JSON object with nine random images from the database
    const imageLinks = imageData.map((data) => data.link); // Get the links of the images
    imageData.forEach((data) => { // Iterate over each item in the imageData 
      imageDict[data.id] = data.link; // imageDict has as keys the id property of each item in the imageData, and as values the link property of each item in the imageData
    });
    setImageDict(imageDict);
    setImage(imageLinks);
    setImageLoading(false); // Spinner off
  };

  useEffect(() => {
    fetchImage();
  }, []);

  /* Reset the imageDict every time the user clicks to see new nine images */
  const clearAndFetch = () => {
    const dictKeys = Object.keys(imageDict); // Array with the keys of imageDict
    for (let i = 0; i < 9; i++) {
      delete imageDict[dictKeys[i]];
    }
    fetchImage();
  };

  /* Selected image by the user. Compares the image clicked to the value of each key in the imageDict to get the id of the image selected */
  const handleImageClick = (index) => {
    let clickedImage = index;
    clickedImage = index.split(',')[1]; // Base64 image link
    let keyValue;
    for (let key in imageDict) {
      if (imageDict[key] === clickedImage) {
        keyValue = key; // When a match is found, assign the corresponding keyValue and exit the loop
        break;
      }
    }
    setSelectedImageId(keyValue);
    console.log(`Clicked image id: ${keyValue}`);
  };

  const handleLoading = () => {
    setImageLoading(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <Image src="../images/logo-black.png" fluid />
          </Col>
        </Row>
      </Container>
      <Form>
        <Row className="justify-content-md-center">
          <Col md={{ span: 5, offset: 3 }}>
            <Form.Control
              type="search"
              placeholder="What are you looking for today?"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Col>
          <Col>
            <Button variant="outline-primary" onClick={handleSearch}>
              Search
            </Button>
            <div className={`spinner-layout ${isLoading ? 'active' : ''}`}>
              <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border text-light" variant="primary" />
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      <Container id="images-container">
        <Row className="ImagesWrapper">
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[0]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[0]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[1]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[1]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
          <Col
            id="imageWrapper"
            s
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[2]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[2]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
        </Row>
        <Row className="ImagesWrapper">
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[3]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[3]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[4]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[4]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[5]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[5]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
        </Row>
        <Row className="ImagesWrapper">
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[6]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[6]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[7]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[7]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
          <Col
            id="imageWrapper"
            md={4}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[8]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
          >
            <>
              {imageLoading && (
                <Spinner
                  animation="border"
                  variant="secondary"
                  justify-content="center"
                />
              )}
              <Image
                src={`data:image/png;base64,${image[8]}`}
                alt={`Image 0`}
                fluid
                onLoad={handleLoading}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          </Col>
        </Row>
        <Row className="justify-content-md-center" id="smd-btn-row">
          <Col md={{ span: 5, offset: 3 }}>
            <Button variant="primary" onClick={() => clearAndFetch()}>
              Show me different!
            </Button>
          </Col>
        </Row>
      </Container>
      <ImageModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        selectedImage={selectedImage}
        Cart={props.Cart}
        Email={props.Email}
        setCart={props.setCart}
        cartId={selectedImageId}
      />
    </div>
  );
};

export default HomePage;
