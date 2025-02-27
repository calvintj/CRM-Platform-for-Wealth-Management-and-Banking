import { useState, useEffect } from "react";
import fetchCustomerList from "../../services/customerList-services/fetchCustomerList";

export function useCustomerList() {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    fetchCustomerList(setCustomerList);
  }, []);

  return customerList;
}
