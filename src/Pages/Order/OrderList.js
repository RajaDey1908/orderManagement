import React, { useState } from "react";
import { Table } from "reactstrap";
import "./style.css";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader";
import firebase from "../../firebase";

const ordersRef = firebase.database().ref("/my-orders");
const stores = firebase.database().ref("/stores");

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
      ordersList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.handleInitialLoad();
  }

  handleInitialLoad = () => {
    ordersRef.on("value", snapshoots => {
      let ordersList = [];
      if (snapshoots.val()) {
        for (let key in snapshoots.val()) {
          ordersList.push({
            key,
            ...snapshoots.val()[key]
          });
        }
        this.setState({
          ordersList: ordersList,
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false
        });
      }
    });

    stores.on("value", snapshoots => {
      let storesList = [];
      if (snapshoots.val()) {
        for (let key in snapshoots.val()) {
          storesList.push({
            key,
            ...snapshoots.val()[key],
            ordersCount: 0
          });
        }
        this.setState({
          store: storesList
        });
      }
    });
  };

  render() {
    let count = 0;
    return (
      <>
        <Loader loaded={!this.state.isLoading}>
          <Table responsive>
            <thead className="red-bg align">
              <tr>
                <th> Serial No</th>
                <th>Order Id</th>
                <th>Ammount</th>
                <th>Store Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.ordersList &&
                this.state.ordersList.length > 0 &&
                this.state.ordersList.map((data, index) => {
                  count++;
                  return (
                    <tr>
                      <td>{count}</td>
                      <td>{data.orderId ? data.orderId : ""}</td>
                      <td>{data.order_amount ? data.order_amount : ""}</td>
                      <td>
                        {this.state.store &&
                          this.state.store.length > 0 &&
                          this.state.store.map((item, key) => {
                            if (data.store_id == item.key) {
                              return item.store_name;
                            } 
                          })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {this.state.ordersList.length < 1 ? (
            <>
              <div className="d-flex justify-content-center mt-3 text-center width100">
                <h6>No Order Found </h6>
              </div>
            </>
          ) : (
            <></>
          )}
        </Loader>
      </>
    );
  }
}

// export default OrderList;

// const mapStateToProps = state => ({
//   ...state.userData
// });

// const mapDispatchToProps = dispatch => {
//   return {
//       restaurantUpdate: payload => {
//           dispatch(restaurantUpdate(payload));
//       }

//   }
// }

export default connect(null, null)(OrderList);
