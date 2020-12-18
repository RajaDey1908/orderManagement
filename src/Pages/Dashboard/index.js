import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  FormGroup,
  Button,
  Container,
  Table,
} from "reactstrap";
import Modal from "react-modal";
import "./style.css";
import FloatingInput from "../../Components/Validation/floatingInput";
import Validator from "../../Components/Validation/Validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import {
  makePostRequest,
  makeGetRequest,
  makePutRequest,
  makeDeleteRequest,
} from "../../services/http-connectors";
import config from "../../Config/config";
import { countryCodes } from "../../Config/countrycodes";
import TopSale from "./TopSale";
import CurrentSale from "./CurrentSale";
import Graph from "./Graph";
import SaleRatio from "./SaleRatio";

const customStyles = {
  content: {
    top: "20%",
    left: "20%",
    right: "20%",
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)'
  },
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeListing: "currentOrder",
      modalOpen: false,
      errors: {},
      fields: {
        orderDate: "",
        product: "",
        price: "",
        salePrice: "",
      },
    };
  }

  componentDidMount() {
    this.handleIntitiaLoad();
  }

  handleIntitiaLoad = async (e) => {
    let response = await makeGetRequest(config.GET_SETTING);
    // console.log("res", response);
    // if (response.ack === 1) {
    //     this.setState({
    //         OrderLists: response.data.menuDetails,
    //         currency: response.data.currency,
    //         orderStatus: response.data.orderStatus,
    //         orderDetails: response.data,
    //         orderId: orderId
    //     })
    // }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      errors: Validator.validateForm(
        null,
        this.state.fields,
        this.state.errors
      ),
    });
    if (this.state.errors.formIsValid) {
      console.log("form validate");
      console.log("this.state.fields", this.state.fields);
      let finalSalePrice = (this.state.fields.salePrice * 113.5) / 100;
      let data = {
        orderDate: this.state.fields.orderDate,
        product: this.state.fields.product,
        price: this.state.fields.price,
        // salePrice: this.state.fields.salePrice,
        salePrice: parseFloat(finalSalePrice).toFixed(2),
        // order_amount: parseFloat(this.state.fields.order_amount).toFixed(2)
      };
      console.log("data", data);
      // errors['salePrice'] = "Decimal Limit Upto Two Digit";
      //     errors['formIsValid'] = false;
      // ordersRef
      //   .push(data)
      //   .then(res => {
      //     // alert("Orders created");
      //     toast("Orders Added Successfully");
      //     this.setState({
      //       errors: {},
      //       fields: {
      //         store_id: "",
      //         orderId: "",
      //         order_amount: ""
      //       }
      //     });
      //     this.props.handleInitialLoad();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    } else {
      console.log(" form not validate");
    }
  };

  closeModal = async () => {
    this.setState({
      errors: {},
      fields: {
        orderDate: "",
        product: "",
        price: "",
        salePrice: "",
      },
      modalOpen: false,
    });
  };

  openModal = async () => {
    this.setState({
      modalOpen: true,
    });
  };

  inputChangeHandler = (value, name) => {
    let productPrice = "";
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
    this.setState({
      errors: Validator.validateForm(
        name,
        this.state.fields,
        this.state.errors
      ),
    });
    if (name == "product") {
      let productDetails = value.split("-");
      productPrice = productDetails[0];

      var newFields = { ...this.state.fields };
      newFields.price = productPrice;
      this.setState({ fields:newFields });

      // this.setState({
      //   fields: {
      //     price: productPrice,
      //   },
      // });
    }
  };

  render() {
    const { modalOpen } = this.state;
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    let minDate = new Date(moment());
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40],
        },

        {
          label: "My second dataset",
          backgroundColor: "rgba(155,231,91,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          //stack: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [45, 79, 50, 41, 16, 85, 20],
        },
      ],
    };
    // console.log(this.state.errors)
    return (
      <React.Fragment>
        <Container fluid={true} className="pl-0">
          <div className="commonGap">
            <Row>
              <Col xs={10} sm={10}>
                <h1 className="pb-2 mainTitle">Dashboards</h1>
              </Col>

              <Col xs={2} sm={2}>
                <div className="mb-2 mt-4">
                  <Button className="btn redButton" onClick={this.openModal}>
                    New Order
                  </Button>
                </div>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <div className="light-bg mt-5">
                  <Col sm={12}>
                    <h5>Top 20 Selling Products(Last 7 days)</h5>
                    <TopSale />
                  </Col>
                </div>
              </Col>

              <Col xs={12} sm={12} md={12} lg={12}>
                <div className="light-bg mt-5">
                  <Col sm={12}>
                    <h5>High vs Low</h5>
                    <SaleRatio />
                  </Col>
                </div>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6}>
                <div className="light-bg mt-5">
                  <Col sm={12}>
                    <h5>Sale in Last 3 Months</h5>
                    <CurrentSale />
                  </Col>
                </div>
              </Col>

              <Col xs={6} sm={6} md={6} lg={6}>
                <div className="light-bg mt-5">
                  <Col sm={12}>
                    <h5>Quantity vs Sale</h5>
                    <Graph data={data} />
                  </Col>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        <Modal isOpen={modalOpen} style={customStyles} contentLabel="New order">
          <form>
            <Form className="whiteBg p-4 mb-4">
              <h4 className="text-center mb-4">New Order</h4>
              <Row>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <div className="customDatePickerWidth">
                      <DatePicker
                        placeholderText="Order Date"
                        minDate={minDate}
                        maxDate={maxDate}
                        className="form-control"
                        selected={this.state.fields.orderDate}
                        onChange={(date) => {
                          this.inputChangeHandler(date, "orderDate");
                          // this.setState({ orderDate: date });
                        }}
                      />
                      <p className="text-danger">
                        <small>{this.state.errors["orderDate"]}</small>
                      </p>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <Label>Product </Label>
                    <div className="d-flex justify-content between">
                      <select
                        className="select-group form-control"
                        value={this.state.fields.product}
                        // onChange={this.handleChange}
                        onChange={(e) =>
                          this.inputChangeHandler(e.target.value, "product")
                        }
                      >
                        {countryCodes &&
                          countryCodes.map((data, index) => {
                            return (
                              <option value={data.dial_code + "-" + data.code}>
                                {data.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <p className="text-danger">
                      <small>{this.state.errors["product"]}</small>
                    </p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <Label> Price </Label>
                    <FloatingInput
                      type="text"
                      name="price"
                      value={this.state.fields.price}
                      disabled
                      // onChange={(e) =>
                      //   this.inputChangeHandler(e.target.value, "price")
                      // }
                      errorMessage={this.state.errors["price"]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12}>
                  <FormGroup>
                    <Label>Sale Price </Label>
                    <FloatingInput
                      type="text"
                      name="salePrice"
                      value={this.state.fields.salePrice}
                      onChange={(e) =>
                        this.inputChangeHandler(e.target.value, "salePrice")
                      }
                      errorMessage={this.state.errors["salePrice"]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mt-3 text-center width100">
                <Col xs={6} sm={6}>
                  <div className="mb-2 mt-4">
                    <Button
                      className="btn redButton"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
                <Col xs={6} sm={6}>
                  <div className="mb-2 mt-4">
                    <Button className="btn redButton" onClick={this.closeModal}>
                      Cancel
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}
