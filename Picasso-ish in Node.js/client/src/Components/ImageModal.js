import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Image,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Overlay,
} from "react-bootstrap";
import { getSmallImages, putSaveImage } from "../api";
import { putShareImage } from "../api";
import { postSaveShareStutus } from "../api";
import { getSmallImagesRequest } from "../api";
import { useNavigate } from "react-router";
import { postImageOwner } from "../api";

const ImageModal = (props) => {
  const [isCreator, setIsCreator] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);

  const { showModal, handleClose, selectedImage, cartId } = props;

  const currentCart = props.Cart;
  //const [cartImage, setCartImage] = useState('');
  const navigate = useNavigate();

  const checkOwner = async () => {
    try {
      const owner = await postImageOwner(props.Email, cartId);
      setIsCreator(owner);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkOwner();
  }, [cartId]);

  const getSaveShareStatus = async () => {
    try {
      const bothStatus = await postSaveShareStutus(cartId);
      const savedStatus = bothStatus[0].i_saved;
      const sharedStatus = bothStatus[0].i_shared;

      if (savedStatus === 0) {
        setSaved(false);
      } else {
        setSaved(true);
      }

      if (sharedStatus === 0) {
        setShared(false);
      } else {
        setShared(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSaveShareStatus();
  }, [cartId]);

  const handleSave = async () => {
    if (props.Email === "") {
      alert("Please sign in");
      navigate("/sign-in");
      return;
    }

    try {
      await putSaveImage(cartId);
      console.log(props.Email);
      console.log("image saved");
      setSaved(!saved);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async () => {
    if (props.Email === "") {
      alert("Please sign in");
      navigate("/sign-in");
      return;
    }

    try {
      await putShareImage(cartId);
      console.log("image shared");
      setShared(!shared);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCart = async () => {
    if (!currentCart.includes(cartId)) {
      currentCart.push(cartId);
      props.setCart(currentCart);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
      console.log("added image to cart");
    } else {
      console.log("item alreay in cart");
      alert("The item has already been added to your cart!");
    }
    console.log("The current cart: ", currentCart);
    //console.log(response);
    //setCartImage(response);
  };

  const saveTooltip = (
    <Tooltip id="save-tooltip">
      Only the original user that generated the image can save.
    </Tooltip>
  );
  const shareTooltip = (
    <Tooltip id="share-tooltip">
      Only the original user that generated the image can share.
    </Tooltip>
  );

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Selected Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="Upper">
          <Image src={selectedImage} />
        </Row>
        <Row className="Lower justify-content-center">
          <Col>
            <OverlayTrigger placement="top" overlay={saveTooltip}>
              <span className="d-inline-block">
                <Button
                  className="btn-size"
                  variant="danger"
                  onClick={() => handleSave()}
                  disabled={!isCreator}
                >
                  {saved ? "Unsave" : "Save"}
                </Button>
              </span>
            </OverlayTrigger>
          </Col>
          <Col>
            <OverlayTrigger placement="top" overlay={shareTooltip}>
              <span className="d-inline-block">
                <Button
                  className="btn-size"
                  variant="info"
                  onClick={() => handleShare()}
                  disabled={!isCreator}
                >
                  {shared ? "Unshare" : "Share"}
                </Button>
              </span>
            </OverlayTrigger>
          </Col>
          <Col>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="add-to-cart-tooltip">
                  {showAdded ? "Image added to cart" : "Add to cart"}
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  className="btn-size"
                  variant="success"
                  onClick={() => handleAddCart()}
                >
                  Add to cart
                </Button>
              </span>
            </OverlayTrigger>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
