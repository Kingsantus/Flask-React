import React from "react";
import { Button, Card,Modal } from "react-bootstrap";

export default function Recipe({title, description, onClick, onDelete}) {
    return (
        <Card className="recipe">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button onClick={onClick} variant="primary">Update</Button>
                {' '}
                <Button onClick={onDelete} variant="danger">Delete</Button>
            </Card.Body>
        </Card>
    );
}