import React, { useState } from "react";
import {
  Row,
  Table,
} from "reactstrap";
import "./style.css";


export default class SaleRatio extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Table responsive className="tableUnic">
            <thead className="red-bg">
              <tr>
                <th>Total Sale Till Date</th>
                <th>Highest Selling Product</th>
                <th>Lowest Selling Product</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {this.props.saleRatio.totalAmount &&
                  this.props.saleRatio.totalAmount.length > 0
                    ? this.props.saleRatio.totalAmount[0]
                      ? this.props.saleRatio.totalAmount[0].totalAmount
                      : ""
                    : ""}
                </td>
                <td>
                  {this.props.saleRatio.highestSellingProduct &&
                  this.props.saleRatio.highestSellingProduct.length > 0
                    ? this.props.saleRatio.highestSellingProduct[0]
                      ? this.props.saleRatio.highestSellingProduct[0]
                          .productDetails
                        ? this.props.saleRatio.highestSellingProduct[0]
                            .productDetails[0].name
                          ? this.props.saleRatio.highestSellingProduct[0]
                              .productDetails[0].name
                          : ""
                        : ""
                      : ""
                    : ""}
                </td>
                <td>
                  {this.props.saleRatio.lowestSellingProduct &&
                  this.props.saleRatio.lowestSellingProduct.length > 0
                    ? this.props.saleRatio.lowestSellingProduct[0]
                      ? this.props.saleRatio.lowestSellingProduct[0]
                          .productDetails
                        ? this.props.saleRatio.lowestSellingProduct[0]
                            .productDetails[0].name
                          ? this.props.saleRatio.lowestSellingProduct[0]
                              .productDetails[0].name
                          : ""
                        : ""
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
