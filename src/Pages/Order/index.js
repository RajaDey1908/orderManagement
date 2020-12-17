import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import OrderList from "./OrderList";
import "./style.css";

export default class Order extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Container fluid={true} className="pl-0">
          <div className="commonGap">
            <Row>
              <Col lg="12">
                <h1 className="pb-2 mainTitle">Orders</h1>
                <h6 className=" pt-2 pb-3">
                  <b>Order List</b>
                </h6>
                <OrderList />
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
