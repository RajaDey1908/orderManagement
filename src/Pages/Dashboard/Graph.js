import React, { useState } from "react";
import {
  Row,
} from "reactstrap";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";


export default class Graph extends React.Component {
  render() {
      const {data}= this.props
    return (
      <React.Fragment>
        <Row>
          <Bar ref="chart" data={data} />
        </Row>
      </React.Fragment>
    );
  }
}
