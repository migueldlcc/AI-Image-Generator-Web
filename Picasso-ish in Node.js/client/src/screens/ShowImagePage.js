import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { generateArtworksRequest, getLastImagesRequest } from '../api';
import '../styles/ShowImagePage.css';
import ImageModal from '../Components/ImageModal';

const ShowImagePage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation(); 
  const [searchTerm, setSearchTerm] = useState(location.state.prompt); // prompt generated in the homepage that was passed with the navigate hook
  const [imageUrl, setImageUrl] = useState(['', '', '', '']); // Initial state of 4 empty strings
  const [showModal, setShowModal] = useState(false);
  const [imageDict, setImageDict] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageId, setSelectedImageId] = useState('1');

  /* Fetch images in the show image page */
  const fetchImage = async () => {
    const message = location.state.urls; // image links generated in the homepage that were passed with the navigate hook
    const imageData = await getLastImagesRequest(); // JSON object with four last images in the database
    imageData.map((data) => data.link); //get the links of the images
    imageData.forEach((data) => { // Iterate over each item in the imageData
      imageDict[data.id] = data.link; // imageDict has as keys the id property of each item in the imageData, and as values the link property of each item in the imageData
    });
    setImageDict(imageDict);
    setImageUrl(message);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  /* Selected image by the user. Compares the image clicked to the value of each key in the imageDict to get the id of the image selected */
  const handleClick = (index) => {
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

  /* Handle regeneration */
  const handleRegeneration = async () => {
    console.log(`Image regenerated is a ${searchTerm}`);
    if (searchTerm === '') { // Case to handle when the searh bar is empty of text
      alert('Add some text');
      return;
    }
    setIsLoading(true); // Spinner on
    await generateArtworksRequest(searchTerm, props.Email); // JSON object with the generated the images requested by the user
    setIsLoading(false); // Spinner off
    const imageData = await getLastImagesRequest(); // JSON object with four last images in the database
    const imageLinks = imageData.map((data) => data.link); //get the links of the images
    imageData.forEach((data) => { // Iterate over each item in the imageData
      imageDict[data.id] = data.link; // imageDict has as keys the id property of each item in the imageData, and as values the link property of each item in the imageData
    });
    setImageDict(imageDict);
    setImageUrl(imageLinks);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleRegeneration();
    }
  };

  return (
    <div>
      <Form id="search-bar">
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
            <Button
              id="search-button"
              variant="outline-primary"
              onClick={handleRegeneration}
            >
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

      <Container
        className="d-flex justify-content-center "
        id="image-container"
      >
        <Row>
          <Col
            md={3}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${imageUrl[0]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleClick(clickedImage);
            }}
          >
            <Image
              id="image1"
              src={`data:image/png;base64,${imageUrl[0]}`}
              alt={`Image 1`}
              fluid
            />
          </Col>
          <Col
            md={3}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${imageUrl[1]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleClick(clickedImage);
            }}
          >
            <Image
              id="image2"
              src={`data:image/png;base64,${imageUrl[1]}`}
              alt={`Image 2`}
              fluid
            />
          </Col>
          <Col
            md={3}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${imageUrl[2]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleClick(clickedImage);
            }}
          >
            <Image
              id="image3"
              src={`data:image/png;base64,${imageUrl[2]}`}
              alt={`Image 3`}
              fluid
            />
          </Col>
          <Col
            md={3}
            onClick={() => {
              const clickedImage = `data:image/png;base64,${imageUrl[3]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleClick(clickedImage);
            }}
          >
            <Image
              id="image4"
              src={`data:image/png;base64,${imageUrl[3]}`}
              alt={`Image 4`}
              fluid
            />
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

export default ShowImagePage;
