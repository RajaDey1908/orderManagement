import { handleErrorIfAvailable } from "../error-handler";
import { getToken } from "../interceptors/token-interceptor";
import config from "../../Config/config";

/**
 *
 *      General http methods
 *
 */

const structureQueryParams = (params) => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + "=" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

/**
 *
 * @param {string} url API url
 * @param {boolean} attachToken if token will be needed or not
 * @param {object} params parameters
 */
export const makeGetRequest = async (
  url,
  attachToken = false,
  params = null
) => {
  let queryString = "";
  if (params) {
    queryString = structureQueryParams(params);
  }
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // Attach auth token if required
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url + queryString, {
        method: "GET",
        headers: headers,
      })
        .then((res) => {
          handleErrorIfAvailable(res);
          return res.json();
        })
        .then((jsonResponse) => {
          if (jsonResponse.hasOwnProperty("error")) {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              reject(jsonResponse);
            }
          } else {
            resolve(jsonResponse);
          }
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

/**
 *
 * @param {string} url API url
 * @param {boolean} attachToken if token will be needed or not
 * @param {object} params parameters
 */
export const makePostRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  // Attach auth token if required
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log(e);
    }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          async (res) => {
            // console.log("res---", res)
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          }
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log("error", error);
            reject(error);
          }
        )
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });
    } catch (e) {
      reject();
    }
  });
};
