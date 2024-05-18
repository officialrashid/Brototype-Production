// useMutation.js

import { useState } from "react";
import axios from "../utils/baseUrl/studentBaseUrl";

const useMutation = ({ url, method = 'POST' }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
  });

  const fn = async (data: any) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const response = await axios({ url, method, data, });
      setState({ isLoading: false, error: "" });
      console.log(response,"usemuation errr");
      
      return response;
    } catch (error) {
      console.log("frontend error il keri makkleee");
      
      return error
    }
  };

  return { mutate: fn, ...state };
};

export default useMutation;
