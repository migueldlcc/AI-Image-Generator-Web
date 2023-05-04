import React from 'react';
import { Col, Container, Row, Card, Image, Button, Form } from 'react-bootstrap';
//importing pictures of us 
import aleks from '../author_pictures/aleks.jpg';
import miguel from '../author_pictures/miguel.jpg';
import magnus from '../author_pictures/magnus.jpg';
import ian from '../author_pictures/ian.jpg';

const AboutUsPage = () => {
  return (
    
    <div style ={{backgroundColor: '#1A1E2E'}}> 
        <br></br>
        <Row>
            <Col>
                <Container className="py-5">
                    <Card className="mb-4">
                        <Card.Header className="py-3">
                            <h1 className="text-center" style={{ fontFamily: 'Consolas, monospace' }}>Hi, we are Picasso-Ish</h1>
                        </Card.Header>
                        <Card.Body>
                            <Form className="fs-5" style={{ fontFamily: 'Consolas, monospace'}}>
                                <Form.Label>  
                                    Our mission is to provide an easy
                                    and fun way for users to create custom images for their personal or
                                    professional projects. We believe that everyone should have access to
                                    high-quality design tools, regardless of their experience or budget.
                                </Form.Label>
                                <br></br>
                                <Form.Label>
                                    Our website is designed with simplicity and usability. We offer a wide range of templates generated from our users
                                    to help you get started, or you can create your own designs from scratch. Just let your imagination flow.
                                    Our goal is to make it easy for anyone to create stunning images that stand out online and offline. 
                                </Form.Label>
                                <br></br>
                                <Form.Label>
                                    Whether you're a small business owner, a social media influencer, or a
                                    creative professional, our image generator can help you achieve your
                                    goals by just writing some text. You can use our tool to create logos, banners, flyers, social
                                    media graphics, clothes designs and more. Our tool makes it easy to create high-quality images in seconds, 
                                    optimizing them so you can use them anywhere you need.
                                </Form.Label>
                                <br></br>
                                <Form.Label> 
                                    <b>Contact Us: </b>
                                    <br></br>
                                    Email: picasso_ish@gmail.com
                                    <br></br>
                                    Phone: 630-555-5555
                                    <br></br>
                                    Address: 30 N. Brainard St, Naperville USA 60540
                                    <br></br>
                                    <b>Social Media: </b>
                                    <br></br>                            
                                    Facebook: facebook.com/picasso_ish
                                    <br></br>
                                    Twitter: twitter.com/picasso_ish
                                    <br></br>
                                    Instagram: instagram.com/picasso_ish
                                    <br></br>
                                    LinkedIn: linkedin.com/company/picasso_ish
                                </Form.Label>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </Col>
        </Row>
        <Row>
            <Col>
                <Container className="py-5">
                    <Card className="mb-4">
                        <Card.Header className="py-3" style={{ fontFamily: 'Consolas, monospace' }}>
                            <h1 className="text-center">Meet the Team</h1>
                        </Card.Header>
                        <Card.Body>
                            <Form className="fs-5" style={{ fontFamily: 'Consolas, monospace' }}>
                                <Form.Label>  
                                    We are passionate about empowering individuals and businesses to create
                                    their own images without the need for expensive software or design
                                    skills. We believe that everyone has a creative spark, and we want to
                                    help you unleash it. Our team is constantly working to improve our tool
                                    and add new features, so you can keep creating amazing designs. 
                                </Form.Label>
                                <br></br>
                                <Form.Label>
                                    Thank you for choosing our Picasso-Ish for your creative needs. We
                                    are committed to providing the best possible experience for our users,
                                    and we would love to hear your feedback. If you have any suggestions or
                                    questions, please don't hesitate to contact us. We look forward to
                                    seeing what you create with our image generator! 
                                    As a small, self-funded, fully-distributed team and we're actively hiring!
                                    Come help us scale, explore, and build humanist infrastructure focused on amplifying 
                                    the human mind and spirit. If you're sure you can help, but don't see a position that fits, 
                                    feel free email us.
                                </Form.Label>
                                <br></br>
                            </Form>
                        </Card.Body>
                        <Row>
                            <Col>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col md="9" lg="7" xl="10" className="mt-5">
                                            <Card style={{ borderRadius: '15px' }}>
                                            <Card.Body className="p-4">
                                                <div className="d-flex text-black">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                    style={{ width: '180px', borderRadius: '10px' }}
                                                    src={aleks}
                                                    alt='Generic placeholder image'
                                                    fluid />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <Card.Title>Aleks Aagesen</Card.Title>
                                                    <Card.Text>CEO</Card.Text>

                                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>
                                                    <div>
                                                        <p className="small text-muted mb-1">Articles</p>
                                                        <p className="mb-0">41</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="small text-muted mb-1">Followers</p>
                                                        <p className="mb-0">976</p>
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-1">Rating</p>
                                                        <p className="mb-0">8.5</p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>  
                            <Col>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col md="9" lg="7" xl="10" className="mt-5">
                                            <Card style={{ borderRadius: '15px' }}>
                                            <Card.Body className="p-4">
                                                <div className="d-flex text-black">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                    style={{ width: '180px', borderRadius: '10px' }}
                                                    src={ian}
                                                    alt='Generic placeholder image'
                                                    fluid />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <Card.Title>Ian Gugel</Card.Title>
                                                    <Card.Text>CEO</Card.Text>

                                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>
                                                    <div>
                                                        <p className="small text-muted mb-1">Articles</p>
                                                        <p className="mb-0">41</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="small text-muted mb-1">Followers</p>
                                                        <p className="mb-0">976</p>
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-1">Rating</p>
                                                        <p className="mb-0">8.5</p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    
                                </Container>
                            </Col>  
                        </Row>
                        <Row>
                            <Col>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col md="9" lg="7" xl="10" className="mt-5">
                                            <Card style={{ borderRadius: '15px' }}>
                                            <Card.Body className="p-4">
                                                <div className="d-flex text-black">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                    style={{ width: '180px', borderRadius: '10px' }}
                                                    src={magnus}
                                                    alt='Generic placeholder image'
                                                    fluid />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <Card.Title>Magnus Meyer</Card.Title>
                                                    <Card.Text>CEO</Card.Text>

                                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>
                                                    <div>
                                                        <p className="small text-muted mb-1">Articles</p>
                                                        <p className="mb-0">41</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="small text-muted mb-1">Followers</p>
                                                        <p className="mb-0">976</p>
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-1">Rating</p>
                                                        <p className="mb-0">8.5</p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>  
                            <Col>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col md="9" lg="7" xl="10" className="mt-5">
                                            <Card style={{ borderRadius: '15px' }}>
                                            <Card.Body className="p-4">
                                                <div className="d-flex text-black">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                    style={{ width: '180px', borderRadius: '10px' }}
                                                    src={miguel}
                                                    alt='Generic placeholder image'
                                                    fluid />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <Card.Title>Miguel de la Cruz</Card.Title>
                                                    <Card.Text>CEO</Card.Text>

                                                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>
                                                    <div>
                                                        <p className="small text-muted mb-1">Articles</p>
                                                        <p className="mb-0">41</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="small text-muted mb-1">Followers</p>
                                                        <p className="mb-0">976</p>
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-1">Rating</p>
                                                        <p className="mb-0">8.5</p>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    
                                </Container>
                            </Col>  
                        </Row>
                        <br></br>
                        <br></br>
                    </Card>
                </Container>
            </Col>
        </Row>
        <br></br>
    </div>
  );
}
export default AboutUsPage;