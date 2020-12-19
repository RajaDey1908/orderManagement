import React, { useState } from "react";
import {
  Row,
  Table,
} from "reactstrap";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

export default class TopSale extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Table responsive className="tableUnic">
            <thead className="red-bg">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Ammount</th>
              </tr>
            </thead>
            <tbody>
              {this.props.topSaleProduct &&
                this.props.topSaleProduct.map((data, key) => {
                  return (
                    <tr>
                      <td>
                        {data.productDetails && data.productDetails.length > 0
                          ? data.productDetails[0]
                            ? data.productDetails[0].name
                            : ""
                          : ""}
                      </td>
                      <td>
                        {data.count}
                      </td>
                      <td>
                      {data.totalAmount}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
      </React.Fragment>
    );
  }
}
