import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import UpdatePostModal from "./UpdatePostModal";
import { useState } from "react";
//import { Link } from "react-router-dom";


export default function ProfilePostCard({ content, postId }) {
    //const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const handleShowUpdate = () => setShowUpdate(true)
    const handleCloseUpdate = () => setShowUpdate(false);
    const BASE_URL = "https://13f050e7-980e-4561-a7bc-3da8dc292838-00-1bdkm6skn8y6f.riker.replit.dev";

    const handleDelete = async () => {
        const response = await axios.delete(`${BASE_URL}/posts/${postId}`)

        console.log(response.data)
    };

    // const UpdatePostModal = async () => {
    //     const response = await axios.put(`${BASE_URL}/posts/${postId}`)
    //     console.log(response.data)
    // }

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col>
                <strong>Bookings</strong>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleShowUpdate}>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <UpdatePostModal showUpdate={showUpdate} handleClose={handleCloseUpdate} postId={postId} content={content} />
                    <Button variant="danger" onClick={handleDelete} >
                        <i className="bi bi-trash"></i>
                    </Button>

                </div>
            </Col>
        </Row>
    );
}
