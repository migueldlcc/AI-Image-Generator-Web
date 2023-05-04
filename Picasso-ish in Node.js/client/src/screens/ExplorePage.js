import React, { useState } from 'react';
import {
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import '../styles/ExplorePage.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageCard from '../Components/ImageCard';

const ExplorePage = (props) => {
  const [Filter, setFilter] = useState('Random');
  const [items, setItems] = useState(Array.from({ length: 20 }));
  
  const fetchData = () => {
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <div>
      <Container>
        <Row className="mb-2" id="filterDropdown">
          <DropdownButton variant="outline-secondary" title={Filter} size="lg">
            <Dropdown.Item onClick={() => setFilter('Most Liked')}>
              Most Liked
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Least Liked')}>
              Least Liked
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('New')}>New</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Random')}>
              Random
            </Dropdown.Item>
          </DropdownButton>
        </Row>
        <Row className="justify-content-center">
          <Col md={3}>
            <h2>Explore Page!</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={5}>
            <p>
              Get inspiration for new artwork, find something that you may want
              to purchase, or just look what can be found just for fun!
            </p>
          </Col>
        </Row>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more items to load</p>}
        >
          <Row>
            {items.map((item, index) => (
              <Col key={index} md={4} id="imagesWrapper">
                <ImageCard
                  Cart={props.Cart}
                  setCart={props.setCart}
                  Email={props.Email}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default ExplorePage;
