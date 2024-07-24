import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProfilePostCard from "./ProfilePostCard";
import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function ProfileMidBody() {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    //const loading = useSelector((state) => state.posts.loading)

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            dispatch(fetchPostsByUser(userId));
        }
    }, [dispatch]);

    useEffect(() => {
        console.log(posts)

    })

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <p className="mt-2" style={{ margin: 0, fontWeight: "bold", fontSize: "120px" }}>
                <strong>Home Page</strong>
            </p>

            <br />
            <p style={{ marginBottom: "2px" }}></p>
            <Nav variant="underline" defaultActiveKey="/home" justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Your bookings</Nav.Link>
                </Nav.Item>
            </Nav>
            {posts.map((post) => (
                <ProfilePostCard
                    key={post.id}
                    content={post.content}
                    postId={post.id}
                />
            ))}
        </Col>
    );
}
