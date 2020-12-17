import { handleErrorIfAvailable } from "../error-handler";
import { getToken } from "../interceptors/token-interceptor";
import config from "../../config/config";


/**
 *
 *      General http methods
 *
 */

const structureQueryParams = params => {
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
  params = null,
  disableLanguageHeader = false
) => {
  let queryString = "";
  if (params) {
    queryString = structureQueryParams(params);
  }
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
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
  // Add language to header if not disabled
  //   if (!disableLanguageHeader) {
  //     try {
  //       const currentLanguage = await getCurrentLanguage();
  //       if (currentLanguage) {
  //         headers["language"] = currentLanguage;
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url + queryString, {
        method: "GET",
        headers: headers
      })
        .then(res => {
          handleErrorIfAvailable(res);
          return res.json();
        })
        .then(jsonResponse => {
          if (jsonResponse.hasOwnProperty("error")) {
            if (jsonResponse.error === false) {
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          } else {
            resolve(jsonResponse);
          }
        })
        .catch(e => {
          console.log("XHR GET Error: ", e);
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
  params = {},
  disableLanguageHeader = false
) => {

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
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
  // Add language to header if not disabled
  // if (!disableLanguageHeader) {
  //   try {
  //     const currentLanguage = await getCurrentLanguage();
  //     if (currentLanguage) {
  //       headers["language"] = currentLanguage;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url, {
        method: 'POST',
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
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log('error', error);
            reject(error);
          },
        )
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
    } catch (e) {
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
export const makePutRequest = async (url, attachToken = false, params = {}) => {
  console.log('PUT -> url', url, params);

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers['Authorization'] = 'Bearer ' + authToken;
      }
    } catch (e) { }
  }
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          (res) => {
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            reject(error);
          },
        )
        .catch((error) => {
          reject(error);
        });
    } catch (e) {
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
export const makeDeleteRequest = async (
  url,
  attachToken = false,
  params = {},
  disableLanguageHeader = false
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
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
  // Add language to header if not disabled
  //   if (!disableLanguageHeader) {
  //     try {
  //       const currentLanguage = await getCurrentLanguage();
  //       if (currentLanguage) {
  //         headers["language"] = currentLanguage;
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(params)
      })
        .then(
          (res) => {
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            reject(error);
          },
        )
        .catch((error) => {
          reject(error);
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
export const uploadFile = async (url, attachToken = false, formData, disableLanguageHeader = true) => {
  let headers = {};
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
  // Add language to header if not disabled
  //   if (!disableLanguageHeader) {
  //     try {
  //       const currentLanguage = await getCurrentLanguage();
  //       if (currentLanguage) {
  //         headers["language"] = currentLanguage;
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: formData
      })
        .then(
          res => {
            handleErrorIfAvailable(res);
            return res.json();
          },
          error => {
            reject(error);
          }
        )
        .then(
          jsonResponse => {
            resolve(jsonResponse);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
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
export const socialLoginRequest = async (
  url,
  params = null,
) => {
  // console.log('params---', params);
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return new Promise((resolve, reject) => {
    try {
      fetch(config.baseURL + "app" + url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params),
      })
        .then(
          async (res) => {
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log('error', error);
            reject(error);
          },
        )
        .catch((e) => {
          console.log("error---", e)
          reject(e);
        });
    } catch (e) {
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
export const makePostRequestMultipart = async (
  url,
  attachToken = false,
  formData,
) => {
  let headers = {
    // Accept: 'application/json',
    //  'Content-Type': 'multipart/form-data',
  };

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
        method: 'POST',
        headers: headers,
        body: formData,
      })
        .then(
          async (res) => {
            // console.log("res---", res)
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log('error', error);
            reject(error);
          },
        )
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
    } catch (e) {
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
export const makePutRequestMultipart = async (
  url,
  attachToken = false,
  formData,
) => {
  let headers = {
    // Accept: 'application/json',
    //  'Content-Type': 'multipart/form-data',
  };

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
        method: 'PUT',
        headers: headers,
        body: formData,
      })
        .then(
          async (res) => {
            // console.log("res---", res)
            handleErrorIfAvailable(res);
            return res.json();
          },
          (error) => {
            reject(error);
          },
        )
        .then(
          (jsonResponse) => {
            resolve(jsonResponse);
          },
          (error) => {
            console.log('error', error);
            reject(error);
          },
        )
        .catch((error) => {
          console.log('error', error);
          reject(error);
        });
    } catch (e) {
      reject();
    }
  });
};
