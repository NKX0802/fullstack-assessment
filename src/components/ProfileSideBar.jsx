import { Button, Col } from "react-bootstrap";
import IconButton from "../components/IconButton";
import NewPostModal from "./NewPostModal";
import { useState } from "react";

export default function ProfileSideBar({ handleLogout }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col
            sm={3}
            className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
            style={{ position: "sticky", top: 0 }}
        >
            <IconButton className="bi bi-house" text="Home Page" />
            <IconButton
                className="bi bi-door-closed"
                style={{ fontSize: 2000 }}
                text="Logout"
                onClick={handleLogout}
            />
            <Button className="rounded-pill w-100 mb-100" onClick={handleShow}>
                Add Booking
            </Button>
            <NewPostModal show={show} handleClose={handleClose} />
        </Col>
    );
}
