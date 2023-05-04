import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import ImageModal from "../Components/ImageModal";
import "../styles/ImageCard.css";
import { getOneArtworksRequest, updateLikesRequest } from "../api";

const ImageCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [heartColor, setHeartColor] = useState("Gray");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageId, setSelectedImageId] = useState("1");
  const [image, setImage] = useState("");
  const [imageDict, setImageDict] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  /* Handle the likes by the user */
  const handleLike = async (index) => {
    let clickedImage = index;
    clickedImage = index.split(',')[1]; // Base64 image link
    let keyValue;
    let updatedLikes;
    for (let key in imageDict) {
      if (imageDict[key] === clickedImage) {
        keyValue = key; // When a match is found for the image id, assign the corresponding keyValue and exit the loop
        break;
      }
    }
    setSelectedImageId(keyValue);
    if (isLiked) { // Image not liked
      setHeartColor("Gray");
      updatedLikes = likes - 1; // New like
      setLikes(updatedLikes);
      setIsLiked(false);
    } else {  // Image liked
      setHeartColor("Red");
      updatedLikes = likes + 1; // New like
      setLikes(updatedLikes);
      setIsLiked(true);
    }
    await updateLikesRequest(updatedLikes, keyValue); // Update the image likes in the database
  };

  /* Set color of the heart */
  const heartHover = () => {
    if (!isLiked) {
      setHeartColor("Gray");
    }
  };

  /* Fetch images in the explore page */
  const fetchImage = async () => {
    setImageLoading(true);
    const imageData = await getOneArtworksRequest(); // JSON object with one random image from the database
    const imageLinks = imageData.map((data) => data.link); //get the links of the images
    const imageLikes = imageData[0].likes; //get imagelikes
    imageData.forEach((data) => { // Iterate over each item in the imageData
      imageDict[data.id] = data.link; // imageDict has as keys the id property of each item in the imageData, and as values the link property of each item in the imageData
    });

    setLikes(imageLikes);
    setImageDict(imageDict);
    setImage(imageLinks);
    setImageLoading(false);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  /* Selected image by the user. Compares the image clicked to the value of each key in the imageDict to get the id of the image selected */
  const handleImageClick = (index) => {
    let clickedImage = index;
    clickedImage = index.split(",")[1]; // Base64 image link
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

  return (
    <div>
      <Card>
        <>
          {imageLoading && (
            <Spinner
              animation="border"
              variant="secondary"
              justify-content="center"
            />
          )}
          <Card.Img
            className="imgCard"
            variant="top"
            onClick={() => {
              const clickedImage = `data:image/png;base64,${image[0]}`;
              setSelectedImage(clickedImage);
              setShowModal(true);
              handleImageClick(clickedImage);
            }}
            src={`data:image/png;base64,${image[0]}`}
            onLoad={handleLoading}
            style={{ display: imageLoading ? "none" : "block" }}
          />
        </>
        <Card.Body>
          <div className="d-flex">
            <HeartFill
              id="heart"
              color={heartColor}
              onClick={() => {
                const clickedImage = `data:image/png;base64,${image[0]}`;
                setSelectedImage(clickedImage);
                handleLike(clickedImage);
              }}
              onMouseEnter={() => setHeartColor("Red")}
              onMouseLeave={heartHover}
            />
            <p id="likes">{likes}</p>
          </div>
        </Card.Body>
      </Card>
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

export default ImageCard;
