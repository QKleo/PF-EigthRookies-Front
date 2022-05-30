import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import Button from "react-bootstrap/Button";
import s from "./createProductScreen.module.css"

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
      <div className={s.display}>
            <img src="https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png" 
            alt="" className={s.imgContainer}/>
      

      <Form onSubmit={submitHandler} className={s.form}>
      <h1 className={s.formh1}>Create Product</h1>
        <Form.Group className={s.inputContainer} controlId="name">
          <Form.Label className={s.formh2}>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>

        <Form.Group className={s.inputContainer} controlId="description">
          <Form.Label className={s.formh2}>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>

        <Form.Group className={s.inputContainer} controlId="name">
          <Form.Label className={s.formh2}>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>
        <Form.Group className={s.inputContainer} controlId="image">
          <Form.Label className={s.formh2}>Image File</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>
        <Form.Group className={s.inputContainer} controlId="image2">
          <Form.Label className={s.formh2}>Image2 File</Form.Label>
          <Form.Control
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>
        <Form.Group className={s.inputContainer} controlId="image3">
          <Form.Label className={s.formh2}>Image3 File</Form.Label>
          <Form.Control
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>
        <Form.Group className={s.inputContainer} controlId="image4">
          <Form.Label className={s.formh2}>Image4 File</Form.Label>
          <Form.Control
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>
        <Form.Group className={s.inputContainer} controlId="category">
          <Form.Label className={s.formh2}>Category</Form.Label>
          <Form.Control
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={s.input}
          />
        </Form.Group>

        <div className={s.buttonContainer}>
          <Button disabled={loadingCreate} type="submit" className={s.button}>
            Create
          </Button>
          {loadingCreate && <LoadingBox></LoadingBox>}
        </div>
      </Form>
      </div>
    </Container>
  );
}
