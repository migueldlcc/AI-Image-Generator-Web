import React from "react";
import { Card, Container, ProgressBar, Image, Col, Row } from "react-bootstrap";
import {useState, useEffect} from "react";
import { getLargeImagesRequest, postOrderintoImageTable } from '../api';
import { useLocation } from 'react-router-dom';

const DownloadedImagePage = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageInCart, setImagesInCart] = useState([]);
    const location = useLocation();
    const orderId = useState(location.state.prompt); // Order id generated in the checkout that was passed with the navigate hook

    /* Display image once is bought */
    const showImage = async () => {
        const cart = props.Cart;
        const images = [];
        const now = Date.now(); // Current date
        for (let i = 0; i <  cart.length; i++) { // Loop through each item in the cart
            const data = await getLargeImagesRequest(cart[i]); // Get the images in the cart
            const linkSource = `data:image/png;base64,${data}`; // Image data in base64 format
            const downloadLink = document.createElement("a"); // Element to create the download link for the image
            downloadLink.href = linkSource; // Download link for each image
            downloadLink.download = `image_${now}_${i}.png`; //File name of the iamge
            downloadLink.click(); //Initiates the download of the image with the click() method
            images.push(data);
        }
        setImagesInCart(images);
        console.log(imageInCart);
        props.setCart([]); // Set the cart to empty once the image is purchased and downloaded
        await postOrderintoImageTable(props.Email, orderId, props.Cart); // Updates database with the order id, the images in cart bought, and the user that purchased them
    };
      
    useEffect(() => {
        setTimeout(() => {
        setIsLoading(false);
        }, 3000);
        showImage();
    }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Container>
            <br />
            <Row className="justify-content-center">
                <h1>Thank you for your purchase! Order id: #{orderId}</h1>
            </Row>
            <br />
            {isLoading ? (
                <ProgressBar animated now={100} className="w-100" />
            ) : (
                <Card>
                    <Card.Body>
                        <Row>
                            {imageInCart.map((image, index) => (
                                <Col md={3} id="imagesWrapper" key={index}>
                                    <Image
                                    src={`data:image/png;base64,${image}`}
                                    alt={`Image ${index}`}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
                
            )}
        </Container>
        
    </div>
  );
}

export default DownloadedImagePage;