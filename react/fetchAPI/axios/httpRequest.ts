import axiosClient from "./axios";
import { camelCase, snakeCase } from "lodash";

// For translation

function toCamelCaseKey(obj: any) {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCaseKey(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCaseKey(obj[key]),
      }),
      {}
    );
  }
  return obj;
};
function toSnakeCaseKey(obj: any) {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCaseKey(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: toSnakeCaseKey(obj[key]),
      }),
      {}
    );
  }
  return obj;
}

const httpRequest = async ({
  url,
  method,
  params,
  data,
  successMessage,
  ...rest
}: any) => {
  let result;
  try {
    const response = await axiosClient.request({
      url,
      method,
      params,
      data,
      ...rest,
    });
    const { headers, data: responseData } = response;
    result = toCamelCaseKey(responseData);

    // const contentType = headers['content-type'];

    if (successMessage) {
      // store.dispatch(
      //   showToast({
      //     type: "success",
      //     message: t(successMessage),
      //   })
      // );
    }
    return result;
  } catch (error) {
    // if (error.status === 401) {
    //   await store.dispath(getMe());
    // }
    // store.dispatch(
    //   showToast({
    //     type: "danger",
    //     message: error.message
    //   })
    // );
    return;
  }
};

export default httpRequest;
