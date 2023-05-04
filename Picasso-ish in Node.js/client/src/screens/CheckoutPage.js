import {
  Form,
  Card,
  Button,
  Col,
  Container,
  Row,
  ListGroup,
  ListGroupItem,
  Modal,
  Image,
} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { postCreditCard, insertCard } from '../api';
import { useNavigate } from 'react-router';
import creditCardType from 'credit-card-type';
import visaLogo from './creditCardImages/visaLogo.png';
import mastercardLogo from './creditCardImages/masterCardLogo.png';
import amexLogo from './creditCardImages/americanExpressLogo.png';
import jcbLogo from './creditCardImages/jcbLogo.png';
import unionpayLogo from './creditCardImages/unionPayLogo.png';
import discoverLogo from './creditCardImages/discoverLogo.png';
import maestroLogo from './creditCardImages/maestroLogo.png';
import dinersClubLogo from './creditCardImages/dinersClubLogo.png';
import {
  getSmallImagesRequest,
  postLastOrderRequest,
} from '../api';
import { XCircle } from 'react-bootstrap-icons';
import '../styles/CheckoutPage.css';

export const countries = [
  { value: 'US', text: 'United States' },
  { value: 'CA', text: 'Canada' },
  { value: 'MX', text: 'Mexico' },
];
export const usStates = [
  { value: 'AL', text: 'Alabama' },
  { value: 'AK', text: 'Alaska' },
  { value: 'AZ', text: 'Arizona' },
  { value: 'AR', text: 'Arkansas' },
  { value: 'CA', text: 'California' },
  { value: 'CO', text: 'Colorado' },
  { value: 'CT', text: 'Connecticut' },
  { value: 'DE', text: 'Delaware' },
  { value: 'FL', text: 'Florida' },
  { value: 'GA', text: 'Georgia' },
  { value: 'HI', text: 'Hawaii' },
  { value: 'ID', text: 'Idaho' },
  { value: 'IL', text: 'Illinois' },
  { value: 'IN', text: 'Indiana' },
  { value: 'IA', text: 'Iowa' },
  { value: 'KS', text: 'Kansas' },
  { value: 'KY', text: 'Kentucky' },
  { value: 'LA', text: 'Louisiana' },
  { value: 'ME', text: 'Maine' },
  { value: 'MD', text: 'Maryland' },
  { value: 'MA', text: 'Massachusetts' },
  { value: 'MI', text: 'Michigan' },
  { value: 'MN', text: 'Minnesota' },
  { value: 'MS', text: 'Mississippi' },
  { value: 'MO', text: 'Missouri' },
  { value: 'MT', text: 'Montana' },
  { value: 'NE', text: 'Nebraska' },
  { value: 'NV', text: 'Nevada' },
  { value: 'NH', text: 'New Hampshire' },
  { value: 'NJ', text: 'New Jersey' },
  { value: 'NM', text: 'New Mexico' },
  { value: 'NY', text: 'New York' },
  { value: 'NC', text: 'North Carolina' },
  { value: 'ND', text: 'North Dakota' },
  { value: 'OH', text: 'Ohio' },
  { value: 'OK', text: 'Oklahoma' },
  { value: 'OR', text: 'Oregon' },
  { value: 'PA', text: 'Pennsylvania' },
  { value: 'RI', text: 'Rhode Island' },
  { value: 'SC', text: 'South Carolina' },
  { value: 'SD', text: 'South Dakota' },
  { value: 'TN', text: 'Tennessee' },
  { value: 'TX', text: 'Texas' },
  { value: 'UT', text: 'Utah' },
  { value: 'VT', text: 'Vermont' },
  { value: 'VA', text: 'Virginia' },
  { value: 'WA', text: 'Washington' },
  { value: 'WV', text: 'West Virginia' },
  { value: 'WI', text: 'Wisconsin' },
  { value: 'WY', text: 'Wyoming' },
];
export const canadaStates = [
  { value: 'AB', text: 'Alberta' },
  { value: 'BC', text: 'British Columbia' },
  { value: 'MB', text: 'Manitoba' },
  { value: 'NB', text: 'New Brunswick' },
  { value: 'NL', text: 'Newfoundland and Labrador' },
  { value: 'NT', text: 'Northwest Territories' },
  { value: 'NS', text: 'Nova Scotia' },
  { value: 'NU', text: 'Nunavut' },
  { value: 'ON', text: 'Ontario' },
  { value: 'PE', text: 'Prince Edward Island' },
  { value: 'QC', text: 'Quebec' },
  { value: 'SK', text: 'Saskatchewan' },
  { value: 'YT', text: 'Yukon' },
];
export const mexicoStates = [
  { value: 'AGU', text: 'Aguascalientes' },
  { value: 'BCN', text: 'Baja California' },
  { value: 'BCS', text: 'Baja California Sur' },
  { value: 'CAM', text: 'Campeche' },
  { value: 'CHP', text: 'Chiapas' },
  { value: 'CHH', text: 'Chihuahua' },
  { value: 'COA', text: 'Coahuila' },
  { value: 'COL', text: 'Colima' },
  { value: 'DIF', text: 'Mexico City' },
  { value: 'DUR', text: 'Durango' },
  { value: 'GUA', text: 'Guanajuato' },
  { value: 'GRO', text: 'Guerrero' },
  { value: 'HID', text: 'Hidalgo' },
  { value: 'JAL', text: 'Jalisco' },
  { value: 'MEX', text: 'Mexico State' },
  { value: 'MIC', text: 'Michoacán' },
  { value: 'MOR', text: 'Morelos' },
  { value: 'NAY', text: 'Nayarit' },
  { value: 'NLE', text: 'Nuevo León' },
  { value: 'OAX', text: 'Oaxaca' },
  { value: 'PUE', text: 'Puebla' },
  { value: 'QUE', text: 'Querétaro' },
  { value: 'ROO', text: 'Quintana Roo' },
  { value: 'SLP', text: 'San Luis Potosí' },
  { value: 'SIN', text: 'Sinaloa' },
  { value: 'SON', text: 'Sonora' },
  { value: 'TAB', text: 'Tabasco' },
  { value: 'TAM', text: 'Tamaulipas' },
  { value: 'TLA', text: 'Tlaxcala' },
  { value: 'VER', text: 'Veracruz' },
  { value: 'YUC', text: 'Yucatán' },
  { value: 'ZAC', text: 'Zacatecas' },
];
export const logos = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  'american-express': amexLogo,
  jcb: jcbLogo,
  unionpay: unionpayLogo,
  discover: discoverLogo,
  maestro: maestroLogo,
  'diners-club': dinersClubLogo,
};

const CheckoutPage = (props) => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [expirationDate, setExpirationDate] = useState('');
  const [isValidDate, setIsValidDate] = useState(true);
  const [cvc, setCvc] = useState('');
  const [isValidCvc, setIsValidCvc] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('US');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validation, setValidation] = useState('');
  const [validationState, setValidationState] = useState(false);
  const [imageInCart, setImagesInCart] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [cartPrice, setCartPrice] = useState(0.00);
  const [discount, setDiscount] = useState((props.cartPrice * 0.1).toFixed(2));
  const [disabled, setDisabled]= useState(false);
  const navigate = useNavigate();

  /* Display the cart */
  const getCart = async () => {
    const cart = props.Cart;
    const images = [];
    setCartEmpty(true);
    setCartPrice((cart.length * 5).toFixed(2));
    for (var i = 0; i < cart.length; i++) { // Loop through every item in the cart
      setCartEmpty(false);
      const response = await getSmallImagesRequest(cart[i]); // JSON object the 64x64 images that user added to cart
      images.push(response);
    }
    setImagesInCart(images);
  };
  useEffect(() => {
    getCart();
  }, []);

  /* Remove an item from the cart */
  const handleRemove = (imgIndex) => {
    const cart = props.Cart;
    const index = Number(imgIndex.index);
    cart.splice(index, 1);
    imageInCart.splice(index, 1);
    const initialPrice = ((cart.length * 5)).toFixed(2); // Initial price of the cart
    const newDiscount = (((cart.length * 5) * 0.1)).toFixed(2); // Discount price
    const newPrice = ((cart.length * 5) - ((cart.length * 5) * 0.1)).toFixed(2); // New price of the cart with discount applied
    if (discountApplied === true) { //Discount applied by the user
        setCartPrice(newPrice);
        setDiscount(newDiscount);
    } else {
        setCartPrice(initialPrice);
        setDiscount(newDiscount);
    }
  };

  /* Handle whether or not the discount has been applied or not */
  const handleDiscountClick = () => {
    const cart = props.Cart;
    const newDiscount = (cartPrice * 0.1).toFixed(2); // Discount price
    const newPrice = (cartPrice - discount).toFixed(2); // New price of the cart with discount
    setCartPrice(cart.length * 5);
    if (discountApplied === false && discountCode === 'WELCOME10') { // Discount not yet applied and the code matches 
      setDiscount(newDiscount);
      setCartPrice(newPrice);
      setDiscountApplied(true);
    } else if (discountApplied === true && discountCode === 'WELCOME10') { // Discount already applied and the code matches
      alert('Discount already applied');
      setCartPrice(cartPrice);
      return;
    } else {
      alert('Wrong discount');
      setCartPrice((cart.length * 5).toFixed(2)); // Initial price
      return;
    }
  };

  /* Handle the discount code inserted is the correct one */
  const handleDiscountCode = (event) => {
    const cart = props.Cart;
    const code = event.target.value;
    if (code !== 'WELCOME10') { // Discount code does not match 
      setCartPrice((cart.length * 5).toFixed(2)); // set the price back to the original price
      setDiscountApplied(false);
    }
    setDiscountCode(code);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleDiscountClick();
    }
  };

  const handleExpirationDate = (event) => {
    const date = event.target.value;
    const currentDate = new Date(); // Today's date
    const [month, year] = date.split('/');
    const enteredDate = new Date(`${month}/01/${year}`); // Date entered by user
    // Validate MM/YY format. '(0[1-9]|1[0-2])' matches the month, '\/' matches the slash character and '\d{2}' matches the year, which is two digits
    if (/^(0[1-9]|1[0-2])\/\d{2}/.test(date) && enteredDate >= currentDate) {  // Test if the input matches the pattern and that the enteredDate is greater or equal to the currentDate
      console.log('Valid date');
      setExpirationDate(date);
      setIsValidDate(true);
      return true;
    } else {
      console.log('Invalid date');
      setExpirationDate(date);
      setIsValidDate(false);
      return false;
    }
  };

  const handleCvcChange = (event) => {
    const data = event.target.value;
    if (/^\d{3}/.test(data)) { // Test if the input matches the pattern of a three-digit number
      setCvc(data);
      setIsValidCvc(true);
    } else {
      setCvc(data);
      setIsValidCvc(false);
    }
  };

  const handleCardNumber = (event) => {
    const data = event.target.value;
    setCardNumber(data);
    var card = creditCardType(data); // Type of card
    if (/^\d{4}$/.test(data)) { // Test if the input matches the pattern of a four-digit number
      if (card[0]) {
        console.log('Valid Card');
        setIsValidNumber(true);
        setCardType(card[0].type);
      } else {
        console.log('Invalid Card');
        setIsValidNumber(false);
      }
    } else {
      setIsValidNumber(false);
    }
  };

  /* Handle user checkout */
  const handleCheckout = async () => {
    if (props.Email === 'jonathan@gmail.com') { // Prevents from checking out if the user is not signed in
        alert('Please sign in');
        navigate('/sign-in');
        return;
    }
    if (props.Cart.length === 0) { // Prevents from checking out if the cart is empty
        alert('Cart is empty');
        return;
    }
    if (address === '') { // Prevents from checking out if the address is not added
        alert('Add an address');
        return;
    };
    if (cvc === '' || cardNumber === '' || expirationDate === '' ) { // Prevents from checking out if cvc, card number, or expiration date fields are empty
        alert('Cannot checkout due to empty fields');
        return;
    };
    if (isValidCvc === false) { // Prevents from checking out if the cvc is not valid
        alert('Invalid CVC');
        return;
    };
    if (isValidDate === false) { // Prevents from checking out if the expiration date is not valid
        alert('Invalid expiration date');
        return;
    };
    if (isValidNumber === false) { // Prevents from checking out if the card number is not valid
        alert('Invalid card number');
        return;
    };
    try {
        const validate = await postCreditCard(cardNumber, cvc, expirationDate, address); // Validate that a card exists in our database
        if (validate != 'Credit card exists') { // If card does not exists
          setValidation("The credit card does not exist in our database. Please add a card.");
          setValidationState(false);
        } else {
          const orderNumber = await postLastOrderRequest(cartPrice, props.Email); // insert order in the database 
          setValidationState(true);
          navigate("/downloadedimage", {
            state: {
              prompt: orderNumber,
            }
          });
        }
    } catch (error) {
        console.log(error);
    }    
  };

  /* Handle card if it is not in the database*/
  const handleCard = async () => {
    if (props.Email === 'jonathan@gmail.com') { // Prevents from inserting card if the user is not signed in
      alert('Please sign in');
      navigate('/sign-in');
      return;
    }
    if (address === '') { // Prevents from inserting card if the address is not added
      alert('Add an address');
      return;
    }
    if (cvc === '' || cardNumber === '' || expirationDate === '') { // Prevents from inserting card if cvc, card number, or expiration date fields are empty
      alert('Cannot checkout due to empty fields');
      return;
    }
    if (isValidCvc === false) { // Prevents from inserting card if the cvc is not valid
      alert('Invalid CVC');
      return;
    }
    if (isValidDate === false) { // Prevents from inserting card if the expiration date is not valid
      alert('Invalid expiration date');
      return;
    }
    if (isValidNumber === false) { // Prevents from inserting card if the card number is not valid
      alert('Invalid card number');
      return;
    }
    await insertCard(cardNumber, cvc, expirationDate, cardType, address, props.Email); // Insert card into database
    console.log('Card added');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md="6" className="mb-4">
          <Card className="mb-4">
            <Card.Header className="py-3">
              <h2 className="mb-0">Billing details</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={firstName}
                        disabled={disabled}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>

                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={lastName}
                        disabled={disabled}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={address}
                        disabled={disabled}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        type="text"
                        value={country}
                        disabled={disabled}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        {countries.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.text}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Label>Town/City</Form.Label>
                      <Form.Control
                        type="text"
                        value={city}
                        disabled={disabled}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Col>
                    <Col>
                      {country === 'US' && (
                        <div>
                          <Form.Label>State/Province</Form.Label>
                          <Form.Select
                            type="text"
                            value={province}
                            disabled={disabled}
                            onChange={(e) => setProvince(e.target.value)}
                          >
                            <option value="">--</option>
                            {usStates.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.text}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      )}
                      {country === 'CA' && (
                        <div>
                          <Form.Label>State/Province</Form.Label>
                          <Form.Select
                            type="text"
                            value={province}
                            disabled={disabled}
                            onChange={(e) => setProvince(e.target.value)}
                          >
                            <option value="">--</option>
                            {canadaStates.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.text}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      )}
                      {country === 'MX' && (
                        <div>
                          <Form.Label>State/Province</Form.Label>
                          <Form.Select
                            type="text"
                            value={province}
                            disabled={disabled}
                            onChange={(e) => setProvince(e.target.value)}
                          >
                            <option value="">--</option>
                            {mexicoStates.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.text}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      )}
                    </Col>
                    <Col>
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={zipCode}
                        disabled={disabled}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        value={email}
                        disabled={disabled}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={phone}
                        disabled={disabled}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Form.Check
                    type="checkbox"
                    label="Shipping address is the same as my billing address"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Save this information for next time"
                    defaultChecked
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </Col>

        <Col md="6">
          <Card>
            <Card.Header>
              <h2 className="mb-0">Order Summary</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Row>
                    <ListGroup>
                      <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>${cartPrice}</span>
                      </ListGroupItem>
                      <br />
                      {cartEmpty ? (
                        <div>Your cart is empty.</div>
                      ) : (
                        <div>
                          <InfiniteScroll
                            dataLength={imageInCart.length}
                            next={() => {}}
                            hasMore={false}
                            loader={<h4>Loading...</h4>}
                          >
                            {imageInCart.map((image, index) => (
                              <div className="checkoutImages" key={index}>
                                <Image
                                  src={`data:image/png;base64,${image}`}
                                  alt={`Image ${index}`}
                                  className="cartImage"
                                />
                                <Button
                                  className="removeButtons"
                                  variant="danger"
                                  onClick={() => handleRemove({ index })}
                                >
                                  <XCircle color="white" size={25} />
                                </Button>
                              </div>
                            ))}
                          </InfiniteScroll>
                        </div>
                      )}
                      <br />
                      <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Discount
                        {discountCode === 'WELCOME10' && (
                          <span>-${discount}</span>
                        )}
                      </ListGroupItem>
                      <br />
                      <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Taxes
                        <span>Free</span>
                      </ListGroupItem>
                      <br />
                      <ListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <div>
                          <strong>Total amount</strong>
                        </div>

                        <span>
                          <strong onChange={handleDiscountCode}>
                            ${cartPrice}
                          </strong>
                        </span>
                      </ListGroupItem>
                      <br />
                    </ListGroup>
                    <Form.Control
                      className="discount-code"
                      type="text"
                      placeholder="DISCOUNT CODE"
                      value={discountCode}
                      disabled={disabled}
                      onChange={handleDiscountCode}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="d-grid gap-2 col-4 mx-auto">
                      <br />
                      <Button
                        variant="success"
                        className="btn btn-primary  d-flex justify-content-between align-items-center"
                        onClick={handleDiscountClick}
                      >
                        Apply Discount
                      </Button>
                    </div>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Header>
              <h2 className="mb-4">Payment</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <img
                  alt="Credit Card Logos"
                  title="Credit Card Logos"
                  src="https://www.shift4shop.com/images/credit-card-logos/cc-lg-4.png"
                  width="413"
                  height="59"
                  border="0"
                />
                <br />
                <br />
                <Form.Check
                  type="radio"
                  name="flexRadioDefault"
                  label="Credit card"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  name="flexRadioDefault"
                  label="Debit card"
                />
                <br />
                <Row>
                  <Col>
                    <Form.Label>Name on card</Form.Label>
                    <Form.Control
                      type="text"
                      value={cardHolderName}
                      disabled={disabled}
                      onChange={(e) => setCardHolderName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Card Number</Form.Label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control
                        type="text"
                        value={cardNumber}
                        disabled={disabled}
                        style={{
                          borderColor: isValidNumber ? 'initial' : 'red',
                        }}
                        maxLength="4"
                        onChange={handleCardNumber}
                      />
                      {isValidNumber && cardType && (
                        <img
                          src={logos[cardType]}
                          alt={cardType}
                          style={{ width: '60px', marginLeft: '10px' }}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Label>Expiration date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={expirationDate}
                      disabled={disabled}
                      style={{ borderColor: isValidDate ? 'initial' : 'red' }}
                      maxLength="5"
                      onChange={handleExpirationDate}
                    />
                  </Col>
                  <Col>
                    <Form.Label>CVC</Form.Label>
                    <Form.Control
                      type="password"
                      value={cvc}
                      disabled={disabled}
                      style={{ borderColor: isValidCvc ? 'initial' : 'red' }}
                      maxLength="3"
                      onChange={handleCvcChange}
                    />
                  </Col>
                </Row>
                <br />
                <div className="d-grid gap-2 col-7 mx-auto">
                  <Button
                    variant="success"
                    className="btn btn-primary btn-lg btn-block d-flex justify-content-between align-items-center"
                    onClick={handleCheckout}
                  >
                    Complete checkout and pay
                  </Button>
                  <Row className="justify-content-center">
                    <Col md={6}>
                      {validationState === false && (
                        <p className="danger">{validation}</p>
                      )}
                    </Col>
                  </Row>
                </div>

                <br />
                <div>
                  <Link onClick={() => setShowModal(true)}>+ Add Card</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} size="xl" onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Add Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Name on card</Form.Label>
              <Form.Control
                type="text"
                value={cardHolderName}
                disabled={disabled}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Card Number</Form.Label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Control
                  type="text"
                  value={cardNumber}
                  disabled={disabled}
                  style={{ borderColor: isValidNumber ? 'initial' : 'red' }}
                  maxLength="4"
                  onChange={handleCardNumber}
                />
                {isValidNumber && cardType && (
                  <img
                    src={logos[cardType]}
                    alt={cardType}
                    style={{ width: '60px', marginLeft: '10px' }}
                  />
                )}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Expiration date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={expirationDate}
                disabled={disabled}
                style={{ borderColor: isValidDate ? 'initial' : 'red' }}
                maxLength="5"
                onChange={handleExpirationDate}
              />
            </Col>
            <Col>
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="password"
                value={cvc}
                disabled={disabled}
                style={{ borderColor: isValidCvc ? 'initial' : 'red' }}
                maxLength="3"
                onChange={handleCvcChange}
              />
            </Col>
          </Row>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCard();
              handleClose();
            }}
          >
            Add Card
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
