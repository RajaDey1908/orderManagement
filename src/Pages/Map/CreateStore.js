import React, { Component } from "react";
import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";
import "./style.css";
import firebase from "../../firebase";
import FloatingInput from "../../Components/Validation/floatingInput";
import Validator from "../../Components/Validation/Validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stores = firebase.database().ref("/stores");
const storage = firebase.storage();

class CreateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLat: "22.595770",
      defaultLng: "88.263641",
      uploadProductImage: {},
      productImageErrorMassage: "",
      productImageValidationFlag: false,
      errors: {},
      fields: {
        store_name: "",
        latitude: "",
        longitude: ""
      }
    };
  }

  inputChangeHandler = (value, name) => {
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
    this.setState({
      errors: Validator.validateForm(name, this.state.fields, this.state.errors)
    });
  };

  handleImageUpload = async event => {
    if (event.target.files && event.target.files[0]) {
      console.log("image", event.target.files[0]);
      if (
        event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/jpg" ||
        event.target.files[0].type == "image/png"
      ) {
        let img = event.target.files[0];
        this.setState({
          uploadProductImage: img,
          productImageErrorMassage: "",
          productImageValidationFlag: false
        });
      } else {
        this.setState({
          productImageErrorMassage: "Image type must be png, jpg or jpeg",
          productImageValidationFlag: false
        });
      }
    }
  };

  formRef = React.createRef();
  handleSubmit = async e => {
    e.preventDefault();
    e.persist();
    this.setState({
      errors: Validator.validateForm(null, this.state.fields, this.state.errors)
    });

    if (this.state.uploadProductImage.name) {
      this.setState({
        productImageErrorMassage: "",
        productImageValidationFlag: true
      });
    } else {
      this.setState({
        productImageErrorMassage: "Plese Select Store Image",
        productImageValidationFlag: false
      });
      return;
    }
    if (this.state.errors.formIsValid) {
      console.log(" in if");
      // return
      let data = {
        store_name: this.state.fields.store_name,
        latitude: this.state.fields.latitude,
        longitude: this.state.fields.longitude
      };
      console.log("data", data);
      const uploadTask = storage
        .ref(`/images/${this.state.uploadProductImage.name}`)
        .put(this.state.uploadProductImage);
      //initiates the firebase side uploading
      uploadTask.on(
        "state_changed",
        snapShot => {
          console.log(snapShot);
        },
        err => {
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(this.state.uploadProductImage.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
              stores
                .push({ ...data, store_image: fireBaseUrl })
                .then(res => {
                  console.log(res);
                  // this.formRef.current.reset();
                  toast("Store Added Successfully");
                  this.setState({
                    uploadProductImage: {},
                    productImageErrorMassage: "",
                    productImageValidationFlag: false,
                    errors: {},
                    fields: {
                      store_name: "",
                      latitude: "",
                      longitude: ""
                    }
                  });
                  e.target.reset();
                  this.props.handleInitialLoad();
                })
                .catch(err => {
                  console.log(err);
                });
            });
        }
      );
    } else {
      console.log(" in else");
    }
  };

  render = () => {
    return (
      <Form
        className="whiteBg p-4 mb-4"
        ref={this.formRef}
        onSubmit={this.handleSubmit}
      >
         <FontAwesomeIcon icon={faTimes} onClick={this.props.handleRedirect} />
          <h4 className="text-center mb-4">Create Store</h4>
        <Row>
          <Col xs={12} sm={12}>
            <FormGroup>
              <Label>Store Name</Label>
              <FloatingInput
                type="text"
                name="store_name"
                value={this.state.fields.store_name}
                onChange={e =>
                  this.inputChangeHandler(e.target.value, "store_name")
                }
                errorMessage={this.state.errors["store_name"]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <FormGroup>
              <Label>Latitude</Label>
              <FloatingInput
                type="text"
                name="latitude"
                id="exampleAddress"
                value={this.state.fields.latitude}
                onChange={e =>
                  this.inputChangeHandler(e.target.value, "latitude")
                }
                errorMessage={this.state.errors["latitude"]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <FormGroup>
              <Label>Longitude</Label>
              <FloatingInput
                type="text"
                name="longitude"
                id="exampleAddress"
                value={this.state.fields.longitude}
                onChange={e =>
                  this.inputChangeHandler(e.target.value, "longitude")
                }
                errorMessage={this.state.errors["longitude"]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <FormGroup>
              <Label>Store Image</Label>
              <Input
                type="file"
                name="productImage"
                id="exampleFile"
                accept=".png, .jpg, .jpeg"
                onChange={this.handleImageUpload}
              />
              <p className="text-danger">
                <small>{this.state.productImageErrorMassage}</small>
              </p>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12}>
            <div className="mb-2 mt-4">
              <Button className="btn redButton">Submit</Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  };
}

export default CreateStore;
