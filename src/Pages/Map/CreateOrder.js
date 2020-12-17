import React, { Component } from "react";
import { Row, Col, Form, Label, FormGroup, Button } from "reactstrap";
import "./style.css";
import FloatingInput from "../../Components/Validation/floatingInput";
import Validator from "../../Components/Validation/Validator";
import firebase from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ordersRef = firebase.database().ref("/my-orders");

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLat: "22.595770",
      defaultLng: "88.263641",
      errors: {},
      fields: {
        store_id: "",
        orderId: "",
        order_amount: ""
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

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      errors: Validator.validateForm(null, this.state.fields, this.state.errors)
    });
    if (this.state.errors.formIsValid) {
      console.log("form validate");
      let data = {
        store_id: this.state.fields.store_id,
        orderId: this.state.fields.orderId,
        order_amount: parseFloat(this.state.fields.order_amount).toFixed(2)
      };
      ordersRef
        .push(data)
        .then(res => {
          // alert("Orders created");
          toast("Orders Added Successfully");
          this.setState({
            errors: {},
            fields: {
              store_id: "",
              orderId: "",
              order_amount: ""
            }
          });
          this.props.handleInitialLoad();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(" form not validate");
    }
  };

  render = () => {
    return (
      <Form className="whiteBg p-4 mb-4">
         <FontAwesomeIcon icon={faTimes} onClick={this.props.handleRedirect} />
          <h4 className="text-center mb-4">Add Order</h4>
        <Row>        

          <Col xs={12} sm={12}>
            <FormGroup>
              <Label for="exampleEmail">Select Store</Label>
              <select
                className="select-group form-control"
                name="store_id"
                id="store_id"
                value={this.state.fields.store_id}
                onChange={e =>
                  this.inputChangeHandler(e.target.value, "store_id")
                }
              >
                <option value=""></option>
                {this.props.state.markers &&
                  this.props.state.markers.map((data, index) => {
                    return (
                      <option key={data.key} value={data.key}>
                        {data.store_name}
                      </option>
                    );
                  })}
              </select>
              <p className="text-danger">
                <small>{this.state.errors["store_id"]}</small>
              </p>
            </FormGroup>
          </Col>
          <Col xs={12} sm={12}>
            <FormGroup>
              <Label>Order Id </Label>
              <FloatingInput
                type="text"
                name="orderId"
                value={this.state.fields.orderId}
                onChange={e =>
                  this.inputChangeHandler(e.target.value, "orderId")
                }
                errorMessage={this.state.errors["orderId"]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <FormGroup>
              <Label>Order Amount </Label>
              <FloatingInput
                type="text"
                name="order_amount"
                value={this.state.fields.order_amount}
                onChange={e =>
                  this.inputChangeHandler(e.target.value, "order_amount")
                }
                errorMessage={this.state.errors["order_amount"]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <div className="mb-2 mt-4">
              <Button className="btn redButton" onClick={this.handleSubmit}>
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  };
}

export default CreateOrder;
