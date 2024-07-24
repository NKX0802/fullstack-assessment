import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
//import { savePost } from "../features/posts/postsSlice";
import axios from "axios";

export default function UpdatePostModal({ showUpdate, handleClose, postId, content }) { //postId
    const [postContent, setPostContent] = useState(content || "");
    const BASE_URL = "https://13f050e7-980e-4561-a7bc-3da8dc292838-00-1bdkm6skn8y6f.riker.replit.dev";

    const handleUpdate = async () => {
        console.log(postId)
        try {
            const response = await axios.put(`${BASE_URL}/posts/${postId}`, {
                content: postContent
            });
            console.log(response.data);
            //dispatch(savePost({ id: postId, content: postContent }));
            handleClose();
            setPostContent("");
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <>
            <Modal show={showUpdate} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                placeholder="Update your booking."
                                as="textarea"
                                rows={3}
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleUpdate}
                    >
                        Update Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
