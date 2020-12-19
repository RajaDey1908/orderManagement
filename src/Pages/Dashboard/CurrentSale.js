import React, { useState } from "react";
import { Row, Table } from "reactstrap";
import "./style.css";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

export default class CurrentSale extends React.Component {
  render() {
    var lastMonth = moment().subtract(1, "month").format("MMM YYYY");
    var firstPrevious = moment().subtract(2, "month").format("MMM YYYY");
    var secondPrevious = moment().subtract(3, "month").format("MMM YYYY");

    return (
      <React.Fragment>
        <Row>
          <Table responsive className="tableUnic">
            <tbody>
              <tr>
                <td>{lastMonth}</td>
                <td>
                  {"$"}
                  {this.props.currentProduct.productsLast &&
                  this.props.currentProduct.productsLast.length > 0
                    ? this.props.currentProduct.productsLast[0]
                      ? this.props.currentProduct.productsLast[0].totalAmount
                      : ""
                    : ""}
                </td>
              </tr>

              <tr>
                <td>{firstPrevious}</td>
                <td>
                  {"$"}
                  {this.props.currentProduct.productsFirstPrevious &&
                  this.props.currentProduct.productsFirstPrevious.length > 0
                    ? this.props.currentProduct.productsFirstPrevious[0]
                      ? this.props.currentProduct.productsFirstPrevious[0]
                          .totalAmount
                      : ""
                    : ""}
                </td>
              </tr>

              <tr>
                <td>{secondPrevious}</td>
                <td>
                  {"$"}
                  {this.props.currentProduct.productsSecondPrevious &&
                  this.props.currentProduct.productsSecondPrevious.length > 0
                    ? this.props.currentProduct.productsSecondPrevious[0]
                      ? this.props.currentProduct.productsSecondPrevious[0]
                          .totalAmount
                      : ""
                    : ""}
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </React.Fragment>
    );
  }
}
