import config from "../../config/config";

/**
 *
 * Checks for header Url
 *
 */
export const GetHeaderPermission = () => {
    let locationPathName = window.location.pathname
    return new Promise((resolve, reject) => {
        let checkUrls = ["/login", "/signupOrLoginPage", "/register"]
        if (!checkUrls.includes(locationPathName)) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
};

/**
 *
 * Get Current Location
 *
 */
export const GetCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        let data = {}
        navigator.geolocation.getCurrentPosition(function (position) {
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=address' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + config.googleApiKey)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (JSON.parse(JSON.stringify(responseJson)).status == "OK") {
                        let locationDetails = JSON.parse(JSON.stringify(responseJson))
                        let locationName = locationDetails.results[0].formatted_address
                        data = {
                            locationName: locationName,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                        resolve(data);
                    } else {
                        reject(data);
                    }
                })
                .catch(e => {
                    console.log("XHR GET Error: ", e);
                    reject(data);
                });
        });
    });
};
