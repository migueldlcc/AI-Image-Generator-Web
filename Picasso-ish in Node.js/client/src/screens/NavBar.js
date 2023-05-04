import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Row,
  Col,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navBar.css";
import HomePage from "./HomePage";
import ExplorePage from "./ExplorePage";
import ProfilePage from "./ProfilePage";
import SavedImagesPage from "./SavedImagesPage";
import SharedPage from "./SharedPage";
import OrderHistoryPage from "./OrderHistoryPage";
import ShowImagePage from "./ShowImagePage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import CheckoutPage from "./CheckoutPage";
import AboutUsPage from "./AboutUsPage";
import DownloadedImagePage from "./DownloadedImagePage.js";
import { PersonCircle, Cart4, XCircle } from "react-bootstrap-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSmallImagesRequest } from "../api";

function CollapsibleExample() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [Email, setEmail] = useState("jonathan@gmail.com");
  const [Cart, setCart] = useState([]);
  const [show, setShow] = useState(false);
  const [ImagesInCart, setImagesInCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartEmpty, setCartEmpty] = useState(true);

  const handleLogout = () => {
    setLoggedIn(false);
    window.location.reload(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const Images = [];
    setCartEmpty(true);
    setCartPrice(Cart.length * 5);
    for (var i = 0; i < Cart.length; i++) {
      setCartEmpty(false);
      const response = await getSmallImagesRequest(Cart[i]);
      Images.push(response);
    }
    setImagesInCart(Images);
    setShow(true);
  };

  const handleRemove = (imgIndex) => {
    console.log("index:", imgIndex);
    const index = Number(imgIndex.index);
    const removedFromCart = Cart.splice(index, 1);
    const removedFromImages = ImagesInCart.splice(index, 1);
    console.log("removed: ", removedFromCart);
    handleShow();
  };

  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Picasso-ish
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/explore">
                Explore
              </Nav.Link>
              <Col md={10}>
                <Nav.Link as={Link} to="/aboutus">
                  About Us
                </Nav.Link>
              </Col>
            </Nav>
            <Nav>
              <Row>
                <Col align="end">
                  {LoggedIn ? (
                    <div>
                      <NavDropdown
                        title={<PersonCircle color="white" size={45} />}
                      >
                        <NavDropdown.Item as={Link} to="/profile">
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/saved-images">
                          Saved Images
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/shared">
                          Shared
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/orderhistory">
                          Order History
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  ) : (
                    <div className="d-flex logonWrapper">
                      <Col md={10}>
                        <Nav.Link as={Link} to="/sign-in">
                          Sign in
                        </Nav.Link>
                      </Col>
                      <Col md={10}>
                        <Nav.Link as={Link} to="/sign-up">
                          Sign up
                        </Nav.Link>
                      </Col>
                    </div>
                  )}
                </Col>
                <Col align="end">
                  <Button variant="dark" onClick={handleShow}>
                    <Cart4 color="white" size={45} />
                  </Button>
                </Col>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartEmpty ? (
            <div>Your cart is empty.</div>
          ) : (
            <div>
              <div className="collumnLabelParent">
                <h4 className="collumnLabel left">Images</h4>
                <h4 className="collumnLabel middle">Price</h4>
                <h4 className="collumnLabel right">Remove?</h4>
              </div>
              <InfiniteScroll
                dataLength={ImagesInCart.length}
                next={() => {}}
                hasMore={false}
                loader={<h4>Loading...</h4>}
              >
                {ImagesInCart.map((image, index) => (
                  <div className="Images" key={index}>
                    <Image
                      src={`data:image/png;base64,${image}`}
                      alt={`Image ${index}`}
                      className="cartImage"
                    />
                    <h4 className="priceImage">$5</h4>
                    <Button
                      className="removeButton"
                      variant="danger"
                      onClick={() => handleRemove({ index })}
                    >
                      <XCircle color="white" size={25} />
                    </Button>
                  </div>
                ))}
              </InfiniteScroll>
              <h4 className="subtotal">Subtotal: ${cartPrice}</h4>
              <Button as={Link} to="/checkout" onClick={handleClose}>
                Checkout
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage Email={Email} Cart={Cart} setCart={setCart} />}
          />
          <Route
            exact
            path="/showimage/:id"
            element={
              <ShowImagePage
                Email={Email}
                Cart={Cart}
                setCart={setCart}
                CartPrice={cartPrice}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <ExplorePage Cart={Cart} setCart={setCart} Email={Email} />
            }
          />
          <Route path="/profile" element={<ProfilePage Email={Email} />} />
          <Route
            path="/saved-images"
            element={
              <SavedImagesPage Email={Email} Cart={Cart} setCart={setCart} />
            }
          />
          <Route
            path="/orderhistory"
            element={<OrderHistoryPage Email={Email} />}
          />
          <Route
            path="/shared"
            element={<SharedPage Email={Email} Cart={Cart} setCart={setCart} />}
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                Email={Email}
                Cart={Cart}
                setCart={setCart}
                cartPrice={cartPrice}
              />
            }
          />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route
            path="/downloadedimage"
            element={
              <DownloadedImagePage
                Email={Email}
                Cart={Cart}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <SignInPage setLoggedIn={setLoggedIn} setEmail={setEmail} />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUpPage setLoggedIn={setLoggedIn} setEmail={setEmail} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default CollapsibleExample;
