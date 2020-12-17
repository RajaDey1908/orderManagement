import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "./style.css";
import { connect } from "react-redux";
import TrackingMap from "./TrackingMap";
import CreateStore from "./CreateStore";
import CreateOrder from "./CreateOrder";
import firebase from "../../firebase";
import config from "../../Config/config";

const stores = firebase.database().ref("/stores");
const ordersRef = firebase.database().ref("/my-orders");

let positions = [];
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      formType: null
    };
  }

  componentDidMount() {
    this.handleInitialLoad();
    const { params } = this.props.match;
    if (params.formType) {
      this.setState({ formType: params.formType });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.formType !== this.props.match.params.formType) {
      this.setState({ formType: this.props.match.params.formType });
    }
  }
  setOrdersCount = () => {
    const { markers } = this.state;
    ordersRef.on("value", snapshoots => {
      let ordersList = [];
      if (snapshoots.val()) {
        for (let key in snapshoots.val()) {
          ordersList.push({
            key,
            ...snapshoots.val()[key]
          });
        }
        let storesList = [...markers];
        ordersList.map((order, index) => {
          let findIndex = storesList.findIndex(m => m.key === order.store_id);
          if (findIndex != -1) {
            // let finalCount= parseInt(storesList[findIndex].ordersCount) + parseInt(1);
            // storesList[findIndex].ordersCount =finalCount.toString()
            storesList[findIndex].ordersCount =
              storesList[findIndex].ordersCount + 1;
          }
        });

        let finalStoresList = [...markers];
        storesList.map((item, key) => {
          let storeDetails =
            item.store_name + "( " + item.ordersCount.toString() + " )";
          finalStoresList[key].storeDetails = storeDetails;
        });
        
        this.setState({
          // markers: storesList
          markers: finalStoresList
        });
      }
    });
  };
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
        this.setState(
          {
            markers: storesList
          },
          () => {
            this.setOrdersCount();
          }
        );
      }
    });
  };

  handleRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    // console.log(this.state.markers);
    const mapColSize = this.state.formType ? 8 : 12;
    let gMapUrl =
      "https://maps.googleapis.com/maps/api/js?key=" +
      config.googleApiKey +
      "&v=3.exp&libraries=geometry,drawing,places";
    return (
      <React.Fragment>
        {/* <ToastContainer /> */}
        <Container fluid={true} className="pl-0">
          {/* <div className="commonGap"> */}
          <div className="bottomSection p-5">
            <Row>
              <Col xs={mapColSize} sm={mapColSize}>
                <div style={{ height: "100%", width: "100%" }}>
                  <TrackingMap
                    key="map"
                    restaurantDetails={this.props.restaurantDetails}
                    markers={this.state.markers}
                    props={this.props}
                    googleMapURL={gMapUrl}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>
              </Col>

              {this.state.formType === "create-store" && (
                <Col xs={4} sm={4}>
                  <CreateStore
                    handleInitialLoad={this.handleInitialLoad}
                    handleRedirect={this.handleRedirect}
                  />
                </Col>
              )}

              {this.state.formType === "create-order" && (
                <Col xs={4} sm={4}>
                  <CreateOrder
                    state={this.state}
                    handleInitialLoad={this.handleInitialLoad}
                    handleRedirect={this.handleRedirect}
                  />
                </Col>
              )}
            </Row>
            {/* </div> */}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userData
});

export default connect(mapStateToProps, null)(Map);
