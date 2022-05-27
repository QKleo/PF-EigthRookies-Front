import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";

axios.defaults.baseURL = "http://localhost:3001";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};
export default function CreateProductScreen() {
  const navigate = useNavigate();

  const [{ loading, error, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });
      await axios.post(
        `/createProduct`,
        {
          name,
          description,
          price,
          image,
          image2,
          image3,
          image4,
          category
        }
        // {
        //   headers: { Authorization: `Bearer ${userInfo.token}` },
        // }
      );
      dispatch({
        type: "CREATE_SUCCESS",
      });
      toast.success("Product created successfully");
      navigate("/products");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "CREATE_FAIL" });
    }
  };
  return (
    <Container className="small-container">
      {/* <Helmet>
        <title>Edit Product ${productId}</title>
      </Helmet> */}
      <h1>Create Product</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image File</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image2">
          <Form.Label>Image2 File</Form.Label>
          <Form.Control
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image3">
          <Form.Label>Image3 File</Form.Label>
          <Form.Control
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image4">
          <Form.Label>Image4 File</Form.Label>
          <Form.Control
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button disabled={loadingCreate} type="submit">
            Create
          </Button>
          {loadingCreate && <LoadingBox></LoadingBox>}
        </div>
      </Form>
    </Container>
  );
}
