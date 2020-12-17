import React, { Component } from "react";
import "./style.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLat: "22.595770",
      defaultLng: "88.263641"
    };
  }

  render = () => {
    return (
      <>
        <GoogleMap
          defaultZoom={11}
          defaultCenter={{
            lat: parseFloat(this.state.defaultLat),
            lng: parseFloat(this.state.defaultLng)
          }}
        >
          {this.props.markers &&
            this.props.markers.length > 0 &&
            this.props.markers.map((item, key) => {
              return (
                <Marker
                  icon={{
                    url: item.store_image,
                    anchor: new google.maps.Point(17, 46),
                    scaledSize: new google.maps.Size(40, 50)
                  }}
                  label={item.storeDetails}
                  title={item.store_name}
                  position={{
                    lat: parseFloat(item.latitude),
                    lng: parseFloat(item.longitude)
                  }}
                />
              );
            })}
        </GoogleMap>
      </>
    );
  };
}

const TrackingMap = withScriptjs(withGoogleMap(Map));

export default TrackingMap;
