import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import "./blog.css";
const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsSnapshot = await firestore.collection("blogs").get();
        const blogsData = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection("blogs").add({
        title,
        content,
        author,
        // Add other blog details here based on your form
      });

      setTitle("");
      setContent("");
      setAuthor("");

      const blogsSnapshot = await firestore.collection("blogs").get();
      const blogsData = blogsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <Container style={{ marginBottom: "50px" }}>
      <h2 className="blog-header">Create Blog</h2>
      <Form
        onSubmit={handleSubmit}
        className="blog-form"
        style={{ width: "500px" }}
      >
        <Form.Group controlId="blogTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title"
            className="blog-input"
          />
        </Form.Group>
        <Form.Group controlId="blogContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter Content"
            rows={5}
            className="blog-input"
          />
        </Form.Group>
        <Form.Group controlId="blogAuthor">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter Your Name"
            className="blog-input"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="submit-btn"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Form>

      <h2 className="blog-header">Blog Posts</h2>
      <ListGroup className="blog-list">
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Author: {blog.author}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default BlogComponent;
