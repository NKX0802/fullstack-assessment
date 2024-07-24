import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function AuthPage() {
    const url = "https://4f3ae960-ca72-4a57-a1da-ec5cced86bf3-00-3d19cvllx45vf.picard.replit.dev"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("signup");
    const handleShowLogin = () => setModalShow("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) navigate("/profile");
    }, [authToken, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("login was succesful, token saved");
            }
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col>
                <p className="mt-100" style={{ fontSize: 200, fontWeight: "bold" }}>
                    Khai Booking
                </p>
                <p className="mt-5" style={{ fontSize: 70, fontWeight: "bold" }}>
                    Book your room today.
                </p>
                <Col>
                    <Button className="rounded-pill" style={{ fontSize: 50, fontWeight: "bold" }} onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p className="mt-5" style={{ fontSize: 70, fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button
                        className="rounded-pill"
                        variant="outline-primary"
                        style={{ fontSize: 50, fontWeight: "bold" }}
                        onClick={handleShowLogin}
                    >
                        Sign in
                    </Button>
                </Col>
                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "signup"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>

                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "signup" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmai">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <p style={{ fontSize: 15 }}>
                                By signing up, you agree to the Terms of Service and Privacy
                                Policy, including Cookie Use. Khai Booking may use your contact
                                information, including your email address and phone number for
                                purposes outlined in our Privacy Policy, like keeping your
                                account secure and personalising our services, including ads.
                            </p>
                            <Button className="rounded-pill" type="submit">
                                {modalShow === "signup" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row >
    );
}
