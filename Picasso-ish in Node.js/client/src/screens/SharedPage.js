import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import '../styles/ExplorePage.css';
import { postTwelveSharedImages } from '../api';
import ImageModal from '../Components/ImageModal';

const SharedPage = (props) => {
  const [images, setImages] = useState([]);
  const [iterations, setIterations] = useState(0);
  const [allImages, setAllImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState('1');
  const [selectedImage, setSelectedImage] = useState('');
  const [imageDict, setImageDict] = useState({});

  async function getImages() {
    const imageList = [];
    const twelveImages = await postTwelveSharedImages(props.Email, iterations);
    const imageLinks = twelveImages.map((data) => data.link);
    if (twelveImages.length === images.length) {// Check if twelveImages is equal to images
      setAllImages(true);
    } else {
      const startIndex = 12 * iterations; // Calculate the start index to drop elements
      const remainingImages = imageLinks.slice(startIndex); // Get the remaining images after dropping elements
      remainingImages.forEach((image) => {
        imageList.push(image); // add each image to an array
      });
      twelveImages.forEach((data) => {
        imageDict[data.id] = data.link;
      });
      setImageDict(imageDict);
      setImages((prevImages) => [...prevImages, ...imageList]); // add new images to the array containong all images
      setIterations(iterations + 1);
      
      if (remainingImages.length < 12) {
        setAllImages(true);
      }
    }
  }

  const handleImageClick = (index) => {
    let clickedImage = index;
    clickedImage = index.split(',')[1];
    let keyValue;
    for (let key in imageDict) {
      if (imageDict[key] === clickedImage) {
        keyValue = key;
        break;
      }
    }
    setSelectedImageId(keyValue);
    console.log(`Clicked image id: ${keyValue}`);
  };

  useEffect(() => { // to call the function on the initial render
    getImages();
  }, []);

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-center">
            <Col md={3}>
              <h2>Your Shared Images</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={2}>
              <p>Review all your shared art!</p>
            </Col>
          </Row>
          <Row>
            {images.map((image, index) => (
              <Col md={3} id="imagesWrapper" key={index} style={{paddingLeft: "56px"}}> {/*Map out the images based on their index*/}
                <Image
                  src={`data:image/png;base64,${image}`}
                  alt={`Image ${index}`}
                  onClick={() => {
                    const clickedImage = `data:image/png;base64,${image}`;
                    setSelectedImage(clickedImage);
                    setShowModal(true);
                    handleImageClick(clickedImage);
                  }}
                  class="img-fluid mx-auto"
                  fluid
                />
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center" md={2}>
            {!allImages && (
                <Button onClick={getImages}> More</Button>
            )}
            {allImages && (
               <div class="text-center">
                <p style={{fontSize: "20px" }}>No more shared images</p>
              </div>
            )}
          </Row>
          <br />
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
    </>
  );
};

export default SharedPage;
