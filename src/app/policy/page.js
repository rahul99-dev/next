//const { default: Detail } = require("./detail");
"use client "
import Detail from "./detail";
import PolicyData from "./policyData";




// Next.js fetch API in action
// async function loadPosts() {
//   debugger
//   // const acmeurl = process.env.REACT_APP_API;
//   // const apiUrl = `${acmeurl}/Policy/6548dd4a4d750ba8433cdaf`;
//   //const url = ${process.env.REACT_APP_API}+"/Policy/6548dd4a4d750ba8433cdaf"
//   const res = await fetch("https://netpolicyapi.azurewebsites.net/api/Policy/654a0dcbc7409b51abdd9ed0");
//   // const res = await fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8");
//   console.log("res",res)
//   return res.json();
// }


const Page =  () => {
  debugger

    // Call loadPosts and wait for its response
    //const response = await loadPosts();
  //loadPosts();
  const Tabs = {

    lobTab : [
      {
          "divId": "div_ProducerName",
          "control_type": "textbox",
          "control_name": "producerName",
          "is_required": true,
          "control_default_value": "John",
          "control_placeholder": "Enter Producer Name",
          "control_label": "Producer Name",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_ProducerOfficeAddress",
          "control_type": "textbox",
          "control_name": "producerOfficeAddress",
          "is_required": true,
          "control_default_value": "Street1",
          "control_placeholder": "Enter Producer Office Address",
          "control_label": "Producer Office Address",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_PolicyEffectiveDate",
          "control_type": "textbox",
          "control_name": "policyEffectiveDate",
          "is_required": false,
          "control_default_value": "10/12/2023",
          "control_placeholder": "Enter Policy Effective Date",
          "control_label": "Policy Effective Date",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_ProducerCode",
          "control_type": "textbox",
          "control_name": "producerCode",
          "is_required": true,
          "control_default_value": "23151",
          "control_placeholder": "Enter Producer Code",
          "control_label": "Producer Code",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_ProducerOfficeCode",
          "control_type": "textbox",
          "control_name": "producerOfficeCode",
          "is_required": true,
          "control_default_value": "2151",
          "control_placeholder": "Enter Producer Office Code",
          "control_label": "Producer Office Code",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_PolicyExpirationDate",
          "control_type": "textbox",
          "control_name": "policyExpirationDate",
          "is_required": true,
          "control_default_value": "10/12/2024",
          "control_placeholder": "Enter Policy Expiration Date",
          "control_label": "Policy Expiration Date",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_ProducerType",
          "control_type": "textbox",
          "control_name": "producerType",
          "is_required": true,
          "control_default_value": "New",
          "control_placeholder": "Enter Producer Type",
          "control_label": "Producer Type",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_PaymentSchedule",
          "control_type": "textbox",
          "control_name": "paymentSchedule",
          "is_required": true,
          "control_default_value": "Prepaid",
          "control_placeholder": "Enter Payment Schedule",
          "control_label": "Payment Schedule",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_BusinessEstablishedDate",
          "control_type": "textbox",
          "control_name": "businessEstablishedDate",
          "is_required": true,
          "control_default_value": "10/12/2021",
          "control_placeholder": "Enter Business Established Date",
          "control_label": "Business Established Date",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_FINNumber",
          "control_type": "textbox",
          "control_name": "finNumber",
          "is_required": true,
          "control_default_value": "2121234",
          "control_placeholder": "Enter FIN Number",
          "control_label": "FIN Number",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_LegalEntity",
          "control_type": "textbox",
          "control_name": "legalEntity",
          "is_required": true,
          "control_default_value": "Corporation",
          "control_placeholder": "Enter Legal Entity",
          "control_label": "Legal Entity",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_SICCode",
          "control_type": "textbox",
          "control_name": "sicCode",
          "is_required": true,
          "control_default_value": "12345",
          "control_placeholder": "Enter SIC Code",
          "control_label": "SIC Code",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_InsuredBusinessAddress",
          "control_type": "textbox",
          "control_name": "insuredBusinessAddress",
          "is_required": true,
          "control_default_value": "street2453",
          "control_placeholder": "Enter Insured Business Address",
          "control_label": "Insured Business Address",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_NatureOfBusiness",
          "control_type": "textbox",
          "control_name": "natureofBusiness",
          "is_required": true,
          "control_default_value": "service",
          "control_placeholder": "Enter Nature of Business",
          "control_label": "Nature of Business",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_DescriptionofSICCode",
          "control_type": "textbox",
          "control_name": "descriptionofSICCode",
          "is_required": true,
          "control_default_value": "12345",
          "control_placeholder": "Enter Description of SIC Code",
          "control_label": "Description of SIC Code",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_BusinessContactNumber",
          "control_type": "textbox",
          "control_name": "businessContactNumber",
          "is_required": true,
          "control_default_value": "2134567890",
          "control_placeholder": "Enter Business Contact Number",
          "control_label": "Business Contact Number",
          "control_onchange": null,
          "control_onblur": null
      },
      {
          "divId": "div_DescriptionofNatureofBusiness",
          "control_type": "textbox",
          "control_name": "descriptionofNatureofBusiness",
          "is_required": true,
          "control_default_value": "its good",
          "control_placeholder": "Enter Description of Nature of Business",
          "control_label": "Description of Nature of Business",
          "control_onchange": null,
          "control_onblur": null
      }
  ],
  
   claimTab : [
    {
        "divId": "div_Name",
        "control_type": "textbox",
        "control_name": "name",
        "is_required": false,
        "control_default_value": "242",
        "control_label": "Claim Id",
        "control_placeholder": "Enter Claim Id",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimId",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_City",
        "control_type": "textbox",
        "control_name": "city",
        "is_required": false,
        "control_default_value": "NY",
        "control_label": "City",
        "control_placeholder": "Enter City",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimCity",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_Country",
        "control_type": "textbox",
        "control_name": "country",
        "is_required": false,
        "control_default_value": "US",
        "control_label": "Country",
        "control_placeholder": "Enter Country",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimCountry",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_ClaimNumber",
        "control_type": "textbox",
        "control_name": "claimNumber",
        "is_required": false,
        "control_default_value": "14242",
        "control_label": "Claim Number",
        "control_placeholder": "Enter Claim Number",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimNumber",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_AccidentDate",
        "control_type": "textbox",
        "control_name": "accidentDate",
        "is_required": false,
        "control_default_value": "11/10/2015",
        "control_label": "Accident Date",
        "control_placeholder": "Enter Accident Date",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimAccidentDate",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_AccidentQuarter",
        "control_type": "textbox",
        "control_name": "accidentQuarter",
        "is_required": false,
        "control_default_value": "20",
        "control_label": "Accident Quarter",
        "control_placeholder": "Enter Accident Quarter",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimAccidentQuarter",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_RegisterDate",
        "control_type": "textbox",
        "control_name": "registerDate",
        "is_required": false,
        "control_default_value": "12/03/2015",
        "control_label": "Register Date",
        "control_placeholder": "Enter Register Date",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimRegisterDate",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_Status",
        "control_type": "textbox",
        "control_name": "status",
        "is_required": false,
        "control_default_value": "CLOSE WITHOUT PAYMENT",
        "control_label": "Status",
        "control_placeholder": "Enter Status",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "claimStatus",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    }
  ],
  
  policyTab : [
    {
        "divId": "div_NameInsured",
        "control_type": "textbox",
        "control_name": "Named Insured",
        "is_required": false,
        "control_default_value": "Heather Buckland",
        "control_placeholder": "Enter Named Insured",
        "control_label": "Named Insured",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "name",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_PolicyType",
        "control_type": "textbox",
        "control_name": "Policy Type",
        "is_required": false,
        "control_default_value": "NEW POLICY",
        "control_placeholder": "Enter Policy Type",
        "control_label": "Policy Type",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "transactionType",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_PolicyExpirationDate",
        "control_type": "textbox",
        "control_name": "Policy Expiration Date",
        "is_required": false,
        "control_default_value": "02/03/2019",
        "control_placeholder": "Enter Policy Expiration Date",
        "control_label": "Policy Expiration Date",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "expirationDate",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_PolicyNumber",
        "control_type": "textbox",
        "control_name": "Policy Number",
        "is_required": false,
        "control_default_value": "QRCC-161609-01",
        "control_placeholder": "Enter Policy Number",
        "control_label": "Policy Number",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "policyNumber",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_TransactionType",
        "control_type": "textbox",
        "control_name": "Transaction Type",
        "is_required": false,
        "control_default_value": "NEW POLICY",
        "control_placeholder": "Enter Transaction Type",
        "control_label": "Transaction Type",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "transactionType",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_PolicyEffectiveDate",
        "control_type": "textbox",
        "control_name": "Policy Effective Date",
        "is_required": false,
        "control_default_value": "01/03/2019",
        "control_placeholder": "Enter Policy Effective Date",
        "control_label": "Policy Effective Date",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "effectiveDate",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_CIANumber",
        "control_type": "textbox",
        "control_name": "CIA Number",
        "is_required": false,
        "control_default_value": "QRCC-161609-01",
        "control_placeholder": "Enter CIA Number",
        "control_label": "CIA Number",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "policyNumber",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_TransactionStatus",
        "control_type": "textbox",
        "control_name": "Transaction Status",
        "is_required": false,
        "control_default_value": "QRCC-161609-01",
        "control_placeholder": "Enter Transaction Status",
        "control_label": "Transaction Status",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "transactionStatus",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    },
    {
        "divId": "div_ProducerCode",
        "control_type": "textbox",
        "control_name": "Producer Code",
        "is_required": false,
        "control_default_value": "QRCC-161609-01",
        "control_placeholder": "Enter Producer Code",
        "control_label": "Producer Code",
        "control_onchange": null,
        "control_onblur": null,
        "control_pre_render": null,
        "control_post_render": null,
        "api_entity_name": "producerCode",
        "api_pre_render_endpoint": null,
        "api_post_render_endpoint": null,
        "api_onblur_endpoint": null,
        "error": " "
    }
  ]
  }

const policy = [
  {
      "divId": "divAccountName",
      "control_type": "tag",
      "control_name": "accountName",
      "is_required": false,
      "control_default_value": " ",
      "control_placeholder": "",
      "h2_tag_value": "Account Name",
      "p_tag_value": "John Doe",
      "control_label": "Account Name",
      "control_onchange": null,
      "control_onblur": null,
      "control_pre_render": null,
      "control_post_render": null,
      "api_entity_name": "accountName",
      "api_pre_render_endpoint": null,
      "api_post_render_endpoint": null,
      "api_onblur_endpoint": null,
      "error": ""
  },
  {
      "divId": "divPolicyType",
      "control_type": "tag",
      "control_name": "policyType",
      "is_required": false,
      "control_default_value": " ",
      "control_placeholder": "",
      "h2_tag_value": "Policy Type",
      "p_tag_value": "Auto Insurance",
      "control_label": "Policy Type",
      "control_onchange": null,
      "control_onblur": null,
      "control_pre_render": null,
      "control_post_render": null,
      "api_entity_name": "policyType",
      "api_pre_render_endpoint": null,
      "api_post_render_endpoint": null,
      "api_onblur_endpoint": null,
      "error": ""
  },
  {
      "divId": "divPolicyPremium",
      "control_type": "tag",
      "control_name": "policyPremium",
      "is_required": false,
      "control_default_value": " ",
      "control_placeholder": "",
      "h2_tag_value": "Policy Premium",
      "p_tag_value": "$500,000",
      "control_label": "Policy Premium",
      "control_onchange": null,
      "control_onblur": null,
      "control_pre_render": null,
      "control_post_render": null,
      "api_entity_name": "policyPremium",
      "api_pre_render_endpoint": null,
      "api_post_render_endpoint": null,
      "api_onblur_endpoint": null,
      "error": ""
  },
  {
      "divId": "divPolicyStatus",
      "control_type": "tag",
      "control_name": "policyStatus",
      "is_required": false,
      "control_default_value": " ",
      "control_placeholder": "",
      "h2_tag_value": "Policy Status",
      "p_tag_value": "Active",
      "control_label": "Policy Status",
      "control_onchange": null,
      "control_onblur": null,
      "control_pre_render": null,
      "control_post_render": null,
      "api_entity_name": "policyStatus",
      "api_pre_render_endpoint": null,
      "api_post_render_endpoint": null,
      "api_onblur_endpoint": null,
      "error": ""
  },
  {
      "divId": "divLineOfBusiness",
      "control_type": "tag",
      "control_name": "lineofBusiness",
      "is_required": false,
      "control_default_value": " ",
      "control_placeholder": "",
      "h2_tag_value": "Line Of Business",
      "p_tag_value": "General Liability",
      "control_label": "Line Of Business",
      "control_onchange": null,
      "control_onblur": null,
      "control_pre_render": null,
      "control_post_render": null,
      "api_entity_name": "lineofBusiness",
      "api_pre_render_endpoint": null,
      "api_post_render_endpoint": null,
      "api_onblur_endpoint": null,
      "error": ""
  }
]

 // const posts = await loadPosts();
 return <PolicyData />;
};


export default Page;
