import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const CategoryCard = ({ category }) => {
  return (
    <Col xs={6} md={3}>
      <Card style={{ width: '18rem' }}>
        <img
          className="card-image-top img-responsive"
          style={{ maxHeight: '200px' }}
          srcSet={category.image.childImageSharp.fluid.srcSet}
          alt={category.title}
        />
        <Card.Body>
          <Card.Title>{category.title}</Card.Title>
          <Button className="mx-auto" variant="primary" href={category.slug}>
            Act Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CategoryCard;
