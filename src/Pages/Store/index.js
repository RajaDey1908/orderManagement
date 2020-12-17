import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Store from "./Store";

import "./style.css";

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeListing: "currentOrder"
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid={true} className="pl-0">
          <div className="commonGap">
            <Row>
              <Col lg="12">
                <h1 className="pb-2 mainTitle">Stores</h1>
                <h6 className=" pt-2 pb-3">
                  <b>Store List</b>
                </h6>
                <Store />
              </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
