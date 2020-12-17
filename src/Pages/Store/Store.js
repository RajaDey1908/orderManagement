import React, { useState } from "react";
import { Table } from "reactstrap";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader";
import firebase from "../../firebase";

const stores = firebase.database().ref("/stores");

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.handleInitialLoad();
  }

  handleInitialLoad = () => {
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
          store: storesList,
          isLoading: false
        });
      }else{
        this.setState({
          isLoading: false
        });
      }
    });
  };

  render() {
    const { store } = this.state;

    return (
      <>
        <Loader loaded={!this.state.isLoading}>
          <Table responsive>
            <thead className="red-bg">
              <tr>
                <th>Store Name</th>
                <th>Image</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {store &&
                store.map((data, index) => {
                  return (
                    <tr>
                      <td>{data.store_name ? data.store_name : ""}</td>
                      <td>
                        {data.store_image ? (
                          <img
                            src={data.store_image}
                            alt="image"
                            style={{ width: "80px", height: "80px" }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{data.latitude ? data.latitude : ""}</td>
                      <td>{data.longitude ? data.longitude : ""}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {store.length < 1 ? (
            <>
              <div className="d-flex justify-content-center mt-3 text-center width100">
                <h6>No Store Found </h6>
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

export default Store;
