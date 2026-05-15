import axios, { AxiosRequestConfig } from 'axios';
import { ToastAndroid } from 'react-native';
import useAuthStore from '../store/useAuthStore';
import { HEADERS_WITH_FORMDATA, HEADERS_WITH_JSON, HEADERS_WITH_TOKEN_AND_FORMDATA, HEADERS_WITH_TOKEN_AND_JSON } from './headers';

interface MakeRequestParams {
  pathname: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  values?: any;
  params?: Record<string, any>;
  showMessage?: boolean;
  show_success_message?: boolean;
  show_error_message?: boolean;
  success_message?: string;
  error_message?: string;
  token?: boolean;
  isFormData?: boolean;
  abortController?: AbortController;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  message?: string;
  error?: { isOperational: boolean; status: string; statusCode: number };
  payload?: T;
  data?: T;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export const makeRequest = async <T>({
  pathname,
  method = 'POST',
  values,
  params,
  showMessage = false,
  show_success_message = true,
  show_error_message = true,
  success_message,
  error_message,
  token = false,
  isFormData = false,
  abortController,
}: MakeRequestParams): Promise<ApiResponse<T> | undefined> => {
  try {
    const { token: AuthToken } = useAuthStore.getState();
    const fetchObj =
      method.toLowerCase() === "get"
        ? {}
        : { data: values };

    // console.log(`${API_URL}/${pathname}`,params)

    const response = await axios({
      method,
      url: `${API_URL}/${pathname}`,
      headers: {
        ...(isFormData
          ? token
            ? HEADERS_WITH_TOKEN_AND_FORMDATA(AuthToken || "")
            : HEADERS_WITH_FORMDATA
          : token
            ? HEADERS_WITH_TOKEN_AND_JSON(AuthToken || "")
            : HEADERS_WITH_JSON),
      },
      params,
      ...fetchObj,
    } as AxiosRequestConfig);

    // console.log('Response Keys:', Object.keys(response));
    // console.log(response.status)

    const { status, message } = response.data;
    // console.log(response.data,'API Response:');

    if (showMessage) {
      if (status === 'success' && show_success_message) {
        ToastAndroid.show(success_message ?? message, ToastAndroid.SHORT);
      } else if (status === 'warning' && show_error_message) {
        ToastAndroid.show(error_message ?? message, ToastAndroid.SHORT);
      }
    }

    return response.data;
  } catch (err: any) {
    console.log("RAW ERROR in makeRequest:", err, pathname);

    if (axios.isAxiosError(err)) {
      const apiData = err.response?.data;
      const statusCode = err.response?.status ?? 500;
      const backendMessage =
        (apiData && (apiData.message || apiData.error || apiData.title)) ||
        "Unknown API error";

      // console.log("AxiosError details:", {
      //   code: err.code,
      //   url: err.config?.url,
      //   status: statusCode,
      //   headers: err.response?.headers,
      //   data: apiData,
      // });

      throw {
        isAxios: true,
        code: statusCode,
        message: backendMessage,
        details: apiData,
      };
    }

    throw {
      isAxios: false,
      code: 500,
      message: err?.message || "Something went wrong",
    };
  }
}