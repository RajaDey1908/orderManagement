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
                <td>2513</td>
                <td>David Alba</td>
                <td>StreetName 10, 1325</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </React.Fragment>
    );
  }
}