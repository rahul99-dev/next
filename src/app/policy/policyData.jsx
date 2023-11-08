"use client";
import React, { useEffect, useState } from "react";
import policyData from "../ui-control-config/policy.json";
import policyTab from "../ui-control-config/policyTab.json";
import claimTab from "../ui-control-config/claimTab.json";
import lobTab from "../ui-control-config/lobTab.json";
import Detail from "./detail";

const PolicyData = () => {
  const [apiData, setApiData] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://netpolicyapi.azurewebsites.net/api/Policy/654a0dcbc7409b51abdd9ed0"
      ); // Replace with your API endpoint
      if (response.ok) {
        const result = await response.json();
        setApiData(result);
        return result;
        //setData(result);
      } else {
        // Handle error or set state accordingly
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    apiData && (
      <Detail
        lobTabData={lobTab}
        claimTabData={claimTab}
        policyTabData={policyTab}
        formData={policyData}
        apiData={apiData}
      />
    )
  );
};

export default PolicyData;
