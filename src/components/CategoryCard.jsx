import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const CategoryCard = ({ category }) => {
  return (
    <Card>
      <img
        className="card-image-top img-fluid"
        style={{ height: '200px', width: 'auto' }}
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
  );
};

export default CategoryCard;
