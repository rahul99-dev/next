"use client"; 
import React, {useEffect, useState} from "react";
import policyData from '../ui-control-config/policy.json'
import policyTab from '../ui-control-config/policyTab.json'
import claimTab from '../ui-control-config/claimTab.json'
import lobTab from '../ui-control-config/lobTab.json'


const Detail = (props) => {
  // const lobTabData =props.Tabs.lobTab;
  // const claimTabData = props.Tabs.claimTab;
  // const policyTabData = props.Tabs.policyTab;
  // console.log("lobTabs",props.Tabs)
  // const formData = props.policy;

  const lobTabData =lobTab;
  const claimTabData = claimTab;
  const policyTabData = policyTab;
  const formData = policyData;
 

  const [formDataState, setFormDataState] = useState({
    policyTab: {},
    claimTab: {},
    lobTab: {},
  });

    useEffect(() => {
      // Create a copy of the existing formDataState
      let updatedFormData = { ...formDataState };
    
      // Iterate through the policyTabData and set default values for the policyTab
      policyTabData.forEach((data) => {
        if (data.control_name && data.control_default_value) {
          updatedFormData = {
            ...updatedFormData,
            policyTab: {
              ...updatedFormData.policyTab,
              [data.control_name]: data.control_default_value,
            },
          };
        }
      });
    
      // Iterate through the claimTabData and set default values for the claimTab
      claimTabData.forEach((data) => {
        if (data.control_name && data.control_default_value) {
          updatedFormData = {
            ...updatedFormData,
            claimTab: {
              ...updatedFormData.claimTab,
              [data.control_name]: data.control_default_value,
            },
          };
        }
      });
    
      // Iterate through the lobTabData and set default values for the lobTab
      lobTabData.forEach((data) => {
        if (data.control_name && data.control_default_value) {
          updatedFormData = {
            ...updatedFormData,
            lobTab: {
              ...updatedFormData.lobTab,
              [data.control_name]: data.control_default_value,
            },
          };
        }
      });
    
      // Update the formDataState with the new values
      setFormDataState(updatedFormData);
    }, [policyTabData, claimTabData, lobTabData]);
    
  
    const renderPolicyTabContent = (divId) => {
  
      // Find the corresponding data object for the specified divId
      if (divId.endsWith("__label")) {
        // Remove the "_label" portion
        const originalDivId = divId.replace(/__label$/, '');
  
        // Find the corresponding data object for the modified divId
        const data = policyTabData.find((item) => item.divId === originalDivId);
        if (!data) {
          return ""; // Return null if data not found
        }
        if (data && typeof data.control_label === 'string' && data.control_label.trim() !== '') {
          return (
            <div key={divId}>
              {data.control_label}{data.is_required ? "*" : ""}
            </div>
          );
        }
      }
      // Check if divId ends with "_label"
      else if (divId.endsWith("__error")) {
        // Remove the "_label" portion
        const originalDivId = divId.replace(/__error$/, '');
  
        // Find the corresponding data object for the modified divId
        const data = policyTabData.find((item) => item.divId === originalDivId);
        if (!data) {
          return ""; // Return null if data not found
        }
        if (data && typeof data.error === 'string' && data.error.trim() !== '') {
          return (
            <div key={divId}>
              {data.error}
            </div>
          );
        }
      }
      else {
        const data = policyTabData.find(item => item.divId === divId);
  
        if (!data) {
          return null; // Return null if data not found
        }
  
        // Render the content based on the control_type
        switch (data.control_type) {
          case "textbox":
            return (
              <div key={divId}>
                {/* <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label> */}
                <input
                  type="text"
                  id={data.control_name}
                  name={data.control_name}
                  placeholder={data.control_placeholder}
                  defaultValue={data.control_default_value}
                  //onChange={data.control_onchange}
                  onChange={(e) => handleInputChange(e,'policyTab', divId)}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
              </div>
            );
  
          case "number":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <input className='input-box'
                  type="number" // Use type "number" for number input fields
                  id={data.control_name}
                  name={data.control_name}
                  placeholder={data.control_placeholder}
                  defaultValue={data.control_defualt_value}
                  //onChange={data.control_onchange}
                  onChange={(e) => handleInputChange(e, divId)}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
              </div>
            );
  
          case "dropdown":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <select
                  id={data.control_name}
                  name={data.control_name}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                >
                  <option value="">Select an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            );
  
          case "checkbox":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <input className='checkbox'
                  type="checkbox"
                  id={data.control_name}
                  name={data.control_name}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
  
              </div>
            );
  
          case "button":
            return (
              <button className='button' type="submit">{data.button_label}</button>
            );
  
  
          // Add cases for "h2" and "p" content
          case "content":
            return (
              <div key={divId}>
                {data.content.h2 && <h2>{data.content.h2}</h2>}
                {data.content.p && <p>{data.content.p}</p>}
              </div>
            );
  
          default:
            return null;
        }
      }
  
    };
  
    const renderClaimTabContent = (divId) => {
      // Find the corresponding data object for the specified divId
      if (divId.endsWith("__label")) {
        // Remove the "_label" portion
        const originalDivId = divId.replace(/__label$/, '');
  
        // Find the corresponding data object for the modified divId
        const data = claimTabData.find((item) => item.divId === originalDivId);
        if (!data) {
          return ""; // Return null if data not found
        }
        if (data && typeof data.control_label === 'string' && data.control_label.trim() !== '') {
          return (
            <div key={divId}>
              {data.control_label}{data.is_required ? "*" : ""}
            </div>
          );
        }
      }
      // Check if divId ends with "_label"
      else if (divId.endsWith("__error")) {
        // Remove the "_label" portion
        const originalDivId = divId.replace(/__error$/, '');
  
        // Find the corresponding data object for the modified divId
        const data = claimTabData.find((item) => item.divId === originalDivId);
        if (!data) {
          return ""; // Return null if data not found
        }
        if (data && typeof data.error === 'string' && data.error.trim() !== '') {
          return (
            <div key={divId}>
              {data.error}
            </div>
          );
        }
      }
      else {
        const data = claimTabData.find(item => item.divId === divId);
  
        if (!data) {
          return null; // Return null if data not found
        }
  
        // Render the content based on the control_type
        switch (data.control_type) {
          case "textbox":
            return (
              <div key={divId}>
                {/* <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label> */}
                <input
                  type="text"
                  id={data.control_name}
                  name={data.control_name}
                  placeholder={data.control_placeholder}
                  defaultValue={data.control_default_value}
                  //onChange={data.control_onchange}
                  onChange={(e) => handleInputChange(e,'claimTab', divId)}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
              </div>
            );
  
          case "number":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <input className='input-box'
                  type="number" // Use type "number" for number input fields
                  id={data.control_name}
                  name={data.control_name}
                  placeholder={data.control_placeholder}
                  defaultValue={data.control_defualt_value}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
              </div>
            );
  
          case "dropdown":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <select
                  id={data.control_name}
                  name={data.control_name}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                >
                  <option value="">Select an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            );
  
          case "checkbox":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <input className='checkbox'
                  type="checkbox"
                  id={data.control_name}
                  name={data.control_name}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
  
              </div>
            );
  
          case "button":
            return (
              <button className='button' type="submit">{data.button_label}</button>
            );
  
  
          // Add cases for "h2" and "p" content
          case "content":
            return (
              <div key={divId}>
                {data.content.h2 && <h2>{data.content.h2}</h2>}
                {data.content.p && <p>{data.content.p}</p>}
              </div>
            );
  
          default:
            return null;
        }
      }
  
    };
  
    const renderLobTabContent = (divId) => {
      // Find the corresponding data object for the specified divId
      //const data = lobTabData.find(item => item.divId === divId);
  
  
      // Check if divId ends with "_label"
      if (divId.endsWith("__label")) {
        // Remove the "_label" portion
        const originalDivId = divId.replace(/__label$/, '');
  
        // Find the corresponding data object for the modified divId
        const data = lobTabData.find((item) => item.divId === originalDivId);
        if (!data) {
          return ""; // Return null if data not found
        }
        if (data && typeof data.control_label === 'string' && data.control_label.trim() !== '') {
          return (
            <div key={divId}>
              {data.control_label}{data.is_required ? "*" : ""}
            </div>
          );
        }
      }
      // Check if divId ends with "_label"
      else if (divId.endsWith("__error")) {
        // Remove the "_label" portion
        const originalDivId = divId.replace(/__error$/, '');
  
        // Find the corresponding data object for the modified divId
        const data = lobTabData.find((item) => item.divId === originalDivId);
        if (!data) {
          return ""; // Return null if data not found
        }
        if (data && typeof data.error === 'string' && data.error.trim() !== '') {
          return (
            <span key={divId}>
              {data.error}
            </span>
          );
        }
      }
      else {
        // Find the corresponding data object for the specified divId
        const data = lobTabData.find(item => item.divId === divId);
  
  
  
        if (!data) {
          return null; // Return null if data not found
        }
  
        // Render the content based on the control_type
        switch (data.control_type) {
          case "textbox":
            return (
              <div key={divId}>
                {/* <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label> */}
                <input
                  type="text"
                  id={data.control_name}
                  name={data.control_name}
                  placeholder={data.control_placeholder}
                  defaultValue={data.control_default_value}
                  //onChange={data.control_onchange}
                  onChange={(e) => handleInputChange(e,'lobTab', divId)}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
              </div>
            );
  
          case "number":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <input
                  type="number" // Use type "number" for number input fields
                  id={data.control_name}
                  name={data.control_name}
                  placeholder={data.control_placeholder}
                  defaultValue={data.control_defualt_value}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
              </div>
            );
  
          case "dropdown":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <select
                  id={data.control_name}
                  name={data.control_name}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                >
                  <option value="">Select an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            );
  
          case "checkbox":
            return (
              <div key={divId}>
                <label htmlFor={data.control_name}>{data.control_label} {data.is_required ? '*' : ''}:</label>
                <input className='checkbox'
                  type="checkbox"
                  id={data.control_name}
                  name={data.control_name}
                  onChange={data.control_onchange}
                  onBlur={data.control_onblur}
                  required={data.is_required ? true : false} // Conditionally add "required" attribute
                />
  
              </div>
            );
  
          case "button":
            return (
              <button className='button' type="submit">{data.button_label}</button>
            );
  
  
          // Add cases for "h2" and "p" content
          case "content":
            return (
              <div key={divId}>
                {data.content.h2 && <h2>{data.content.h2}</h2>}
                {data.content.p && <p>{data.content.p}</p>}
              </div>
            );
  
          default:
            return null;
        }
      }
  
    };
  
  
    const renderTagContent = (divId, tag) => {
      // Find the corresponding data object for the specified divId
      const data = formData.find((item) => item.divId === divId);
  
      if (!data) {
        return null; // Return null if data not found
      }
  
      let content;
      if (tag === 'h2') {
        content = data.h2_tag_value;
      } else if (tag === 'p') {
        content = data.p_tag_value;
      }
  
      if (content) {
        return <>{content}</>;
      }
  
      return null; // Return null if the requested tag is not in the data
    };

    const handleInputChange = (e, tabName, divId) => {
      debugger;
      const { name, value, type, checked } = e.target;
      const inputValue = type === 'checkbox' ? checked : value;
  
      setFormDataState((prevData) => ({
        ...prevData,
        [tabName]: {
          ...prevData[tabName],
          [name]: inputValue,
        },
      }));
    };
  
    const handleSave = () => {
      debugger
      // Serialize formDataState to JSON
      const formDataJSON = convertToJSON(formDataState);
  
      // Perform the save operation, send formDataJSON to a server API or handle it as needed
      console.log('Form data JSON to be saved:', formDataJSON);
  
      // You can also add validation logic before saving if needed
      // ...
    };
  
  
    const convertToJSON = (formDataState) => {
      debugger
      const formDataJSON = {};
      for (const key in formDataState) {
        formDataJSON[key] = formDataState[key];
      }
      return formDataJSON;
    };

  return (

    <>

<div className="main-hd my-4">
        <div className="pagetitle">
        <h1>Policy</h1>
        <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item active">Policy : 3212</li>
      </ol>
    </nav>
        </div>
        {/* <div className="third-div">
      <div className="backpage_button" >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" ><path className="Back_icon" fill="none" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
        <h1>Back</h1>
      </div>
    </div> */}
      </div>
      {/* -----------policy detail boxes-------------- */}
      <div className="policy_details_sec mb-3">
        <div className="policy_detail_item mb-3">
          <div className="detail_logo">
            <img src='assets/img/policy-detail-icons/icon1.png' alt="Logo" />
          </div>
          {/* <div className="content">
        <h2 className='text-space'>
          <div id='div1'>
            {renderDivContent('div1')}
          </div>
        </h2>
        <p>
          <div id='div1'>
          {renderDivContent('div1')}
            {formData.insured}
          </div>
        </p>
        <h2 className='text-space'>Account Name</h2>
        <p>{formData.insured}</p>
      </div> */}

          <div className="content">
            <h2 className="text-space">
              <div id="divAccountName">
                {renderTagContent("divAccountName", "h2")}
              </div>
            </h2>
            <p>
              <div id="divAccountName">
                {renderTagContent("divAccountName", "p")}
              </div>
            </p>
          </div>

        </div>
        <div className="policy_detail_item mb-3">
          <div className="detail_logo">
            <img src='assets/img/policy-detail-icons/icon2.png' alt="Logo" />
          </div>
          {/* <div className="content">
        <h2 className='text-space'>Policy Type</h2>
        <p>{formData.renewalStatus}</p>
      </div> */}

          <div className="content">
            <h2 className="text-space">
              <div id="divPolicyType">
                {renderTagContent("divPolicyType", "h2")}
              </div>
            </h2>
            <p>
              <div id="divPolicyType">
                {renderTagContent("divPolicyType", "p")}
              </div>
            </p>
          </div>
        </div>
        <div className="policy_detail_item mb-3">
          <div className="detail_logo">
            <img src='assets/img/policy-detail-icons/icon3.png' alt="Logo" />
          </div>
          {/* <div className="content">
        <h2 className='text-space'>Policy Premium</h2>
        <p>${formData.amount.toLocaleString()}</p>
      </div> */}

          <div className="content">
            <h2 className="text-space">
              <div id="divPolicyPremium">
                {renderTagContent("divPolicyPremium", "h2")}
              </div>
            </h2>
            <p>
              <div id="divPolicyPremium">
                {renderTagContent("divPolicyPremium", "p")}
              </div>
            </p>
          </div>

        </div>
        <div className="policy_detail_item mb-3">
          <div className="detail_logo">
            <img src='assets/img/policy-detail-icons/icon4.png' alt="Logo" />
          </div>
          {/* <div className="content">
        <h2 className='text-space'>Policy Status</h2>
        <p>{formData.statusCode}</p>
      </div> */}
          <div className="content">
            <h2 className="text-space">
              <div id="divPolicyStatus">
                {renderTagContent("divPolicyStatus", "h2")}
              </div>
            </h2>
            <p>
              <div id="divPolicyStatus">
                {renderTagContent("divPolicyStatus", "p")}
              </div>
            </p>
          </div>
        </div>
        <div className="policy_detail_item mb-3">
          <div className="detail_logo">
            <img src='assets/img/policy-detail-icons/icon5.png' alt="Logo" />
          </div>
          {/* <div className="content">
        <h2 className='text-space'>Line Of Business</h2>
        <p>{formData.typeOfLoss}</p>
        <p>General Liability</p>
      </div> */}

          <div className="content">
            <h2 className="text-space">
              <div id="divLineOfBusiness">
                {renderTagContent("divLineOfBusiness", "h2")}
              </div>
            </h2>
            <p>
              <div id="divLineOfBusiness">
                {renderTagContent("divLineOfBusiness", "p")}
              </div>
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------policy detail form--------------------- */}

      <div class="container-fluid-lg mb-4 custom_tab_style1_outer">
        <div class="row">
          <div class="col-lg-12">
            <ul class="nav nav-tabs custom_tab_style1" id="myPolicyTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="policy-tab" data-bs-toggle="tab" data-bs-target="#policy" type="button" role="tab" aria-controls="policy" aria-selected="true">Policy</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="claim-tab" data-bs-toggle="tab" data-bs-target="#claim" type="button" role="tab" aria-controls="claim" aria-selected="false">Claim</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="policy" role="tabpanel" aria-labelledby="policy-tab">
                <div class="member_card_style_policy">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            {/* <h4>Policy</h4> */}
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_NameInsured__label'>
                                        {renderPolicyTabContent('div_NameInsured__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_NameInsured'>
                                      {renderPolicyTabContent('div_NameInsured')}
                                    </div>
                                    <span>
                                      <div id='div_NameInsured__error'>
                                        {renderPolicyTabContent('div_NameInsured__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="name"
                                  name="name"
                                  type="text"
                                //   value={formData.insured}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_PolicyType__label'>
                                        {renderPolicyTabContent('div_PolicyType__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_PolicyType'>
                                      {renderPolicyTabContent('div_PolicyType')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyType__error'>
                                        {renderPolicyTabContent('div_PolicyType__error')}
                                      </div>
                                    </span>
                                  </div>

                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderPolicyTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderPolicyTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderPolicyTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_PolicyNumber__label'>
                                        {renderPolicyTabContent('div_PolicyNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_PolicyNumber'>
                                      {renderPolicyTabContent('div_PolicyNumber')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyNumber__error'>
                                        {renderPolicyTabContent('div_PolicyNumber__error')}
                                      </div>
                                    </span>
                                  </div>

                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_TransactionType__label'>
                                        {renderPolicyTabContent('div_TransactionType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_TransactionType'>
                                      {renderPolicyTabContent('div_TransactionType')}
                                    </div>
                                    <span>
                                      <div id='div_TransactionType__error'>
                                        {renderPolicyTabContent('div_TransactionType__error')}
                                      </div>
                                    </span>
                                  </div>
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderPolicyTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderPolicyTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderPolicyTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_CIANumber__label'>
                                        {renderPolicyTabContent('div_CIANumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_CIANumber'>
                                      {renderPolicyTabContent('div_CIANumber')}
                                    </div>
                                    <span>
                                      <div id='div_CIANumber__error'>
                                        {renderPolicyTabContent('div_CIANumber__error')}
                                      </div>
                                    </span>
                                  </div>

                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_TransactionStatus__label'>
                                        {renderPolicyTabContent('div_TransactionStatus__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_TransactionStatus'>
                                      {renderPolicyTabContent('div_TransactionStatus')}
                                    </div>
                                    <span>
                                      <div id='div_TransactionStatus__error'>
                                        {renderPolicyTabContent('div_TransactionStatus__error')}
                                      </div>
                                    </span>
                                  </div>
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderPolicyTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerCode'>
                                      {renderPolicyTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderPolicyTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_abc_code__label'>
                                        {renderPolicyTabContent('div_abc_code__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_abc_code'>
                                      {renderPolicyTabContent('div_abc_code')}
                                    </div>
                                    <span>
                                      <div id='div_abc_code__error'>
                                        {renderPolicyTabContent('div_abc_code__error')}
                                      </div>
                                    </span>
                                  </div>
                                  
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_ved_code__label'>
                                        {renderPolicyTabContent('div_ved_code__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ved_code'>
                                      {renderPolicyTabContent('div_ved_code')}
                                    </div>
                                    <span>
                                      <div id='div_ved_code__error'>
                                        {renderPolicyTabContent('div_ved_code__error')}
                                      </div>
                                    </span>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="detail_item">
                                    <div className="detail_title">
                                      <div id='div_extended_family_name__label'>
                                        {renderPolicyTabContent('div_extended_family_name__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_extended_family_name'>
                                      {renderPolicyTabContent('div_extended_family_name')}
                                    </div>
                                    <span>
                                      <div id='div_extended_family_name__error'>
                                        {renderPolicyTabContent('div_extended_family_name__error')}
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="claim" role="tabpanel" aria-labelledby="claim-tab">
                <div class="member_card_style_policy">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            {/* <h4>Claim</h4> */}
                            <div className="policydetail_sec">
                              {/* <div className="main-hd mb-3">
      <div className="pagetitle">
        <h1> Claims</h1>
      </div>
      <div className="third-div">

      </div>
    </div> */}
                              <form className="px-2 form_dtl">
                                <div className="row">
                                  <div className="col-sm-12 col-md-4 col-lg-4 ">
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_Name__label'>
                                          {renderClaimTabContent('div_Name__label')}
                                        </div>
                                        <span class="mendatory-field"></span>
                                      </div>
                                      <div id='div_Name'>
                                        {renderClaimTabContent('div_Name')}
                                      </div>
                                      <span>
                                        <div id='div_Name__error'>
                                          {renderClaimTabContent('div_Name__error')}
                                        </div>
                                      </span>
                                    </div>
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_City__label'>
                                          {renderClaimTabContent('div_City__label')}
                                        </div>
                                        <span class="mendatory-field"></span>
                                      </div>
                                      <div id='div_City'>
                                        {renderClaimTabContent('div_City')}
                                      </div>
                                      <span>
                                        <div id='div_City__error'>
                                          {renderClaimTabContent('div_City__error')}
                                        </div>
                                      </span>
                                    </div>
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_Country__label'>
                                          {renderClaimTabContent('div_Country__label')}
                                        </div>
                                        <span class="mendatory-field"></span></div>
                                      <div id='div_Country'>
                                        {renderClaimTabContent('div_Country')}
                                      </div>
                                      <span>
                                        <div id='div_Country__error'>
                                          {renderClaimTabContent('div_Country__error')}
                                        </div>
                                      </span>
                                    </div>

                                  </div>
                                  <div className="col-sm-12 col-md-4 col-lg-4">
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_ClaimNumber__label'>
                                          {renderClaimTabContent('div_ClaimNumber__label')}
                                        </div>
                                        <span class="mendatory-field"></span></div>
                                      <div id='div_ClaimNumber'>
                                        {renderClaimTabContent('div_ClaimNumber')}
                                      </div>
                                      <span>
                                        <div id='div_ClaimNumber__error'>
                                          {renderClaimTabContent('div_ClaimNumber__error')}
                                        </div>
                                      </span>
                                    </div>
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_AccidentDate__label'>
                                          {renderClaimTabContent('div_AccidentDate__label')}
                                        </div>
                                        <span class="mendatory-field"></span></div>
                                      <div id='div_AccidentDate'>
                                        {renderClaimTabContent('div_AccidentDate')}
                                      </div>
                                      <span>
                                        <div id='div_AccidentDate__error'>
                                          {renderClaimTabContent('div_AccidentDate__error')}
                                        </div>
                                      </span>
                                    </div>
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_AccidentQuarter__label'>
                                          {renderClaimTabContent('div_AccidentQuarter__label')}
                                        </div>
                                        <span class="mendatory-field"></span></div>
                                      <div id='div_AccidentQuarter'>
                                        {renderClaimTabContent('div_AccidentQuarter')}
                                      </div>
                                      <span>
                                        <div id='div_AccidentQuarter__error'>
                                          {renderClaimTabContent('div_AccidentQuarter__error')}
                                        </div>
                                      </span>
                                    </div>

                                  </div>
                                  <div className="col-sm-12 col-md-4 col-lg-4">
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_RegisterDate__label'>
                                          {renderClaimTabContent('div_RegisterDate__label')}
                                        </div>
                                        <span class="mendatory-field"></span></div>
                                      <div id='div_RegisterDate'>
                                        {renderClaimTabContent('div_RegisterDate')}
                                      </div>
                                      <span>
                                        <div id='div_RegisterDate__error'>
                                          {renderClaimTabContent('div_RegisterDate__error')}
                                        </div>
                                      </span>
                                    </div>
                                    <div className="detail_item">
                                      <div className="detail_title">
                                        <div id='div_Status__label'>
                                          {renderClaimTabContent('div_Status__label')}
                                        </div>
                                        <span class="mendatory-field"></span></div>
                                      <div id='div_Status'>
                                        {renderClaimTabContent('div_Status')}
                                      </div>
                                      <span>
                                        <div id='div_Status__error'>
                                          {renderClaimTabContent('div_Status__error')}
                                        </div>
                                      </span>
                                    </div>

                                  </div>
                                  <div className="col-sm-12 mb-3"></div>
                                  <div className="account_detail_button col-sm-12 text-end">
                                    {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------policy detail lob tabs--------------------- */}
      <div class="container-fluid-lg mb-4 custom_tab_style1_outer">
        <div class="row">
          <div class="col-lg-12">
            <ul class="nav nav-tabs custom_tab_style1" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="property-tab" data-bs-toggle="tab" data-bs-target="#property" type="button" role="tab" aria-controls="property" aria-selected="false">Property</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link " id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">General Libility</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="auto-tab" data-bs-toggle="tab" data-bs-target="#auto" type="button" role="tab" aria-controls="auto" aria-selected="false">Auto</button>
              </li>

              <li class="nav-item" role="presentation">
                <button class="nav-link" id="Worker-Compensation-tab" data-bs-toggle="tab" data-bs-target="#Worker-Compensation" type="button" role="tab" aria-controls="Worker-Compensation" aria-selected="false">Worker-Compensation</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="professional-tab" data-bs-toggle="tab" data-bs-target="#professional" type="button" role="tab" aria-controls="professional" aria-selected="false">Professional Libility</button>
              </li>


              <li class="nav-item" role="presentation">
                <button class="nav-link" id="cyber-tab" data-bs-toggle="tab" data-bs-target="#cyber" type="button" role="tab" aria-controls="cyber" aria-selected="false">Cyber</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="crime-tab" data-bs-toggle="tab" data-bs-target="#crime" type="button" role="tab" aria-controls="crime" aria-selected="false">Crime</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="Umbrella-tab" data-bs-toggle="tab" data-bs-target="#Umbrella" type="button" role="tab" aria-controls="Umbrella" aria-selected="false">Umbrella</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade " id="general" role="tabpanel" aria-labelledby="general-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>

                                    <div id='div_ProducerName__error'>
                                      {renderLobTabContent('div_ProducerName__error')}
                                    </div>

                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="professional" role="tabpanel" aria-labelledby="professional-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade show active" id="property" role="tabpanel" aria-labelledby="property-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="auto" role="tabpanel" aria-labelledby="auto-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="cyber" role="tabpanel" aria-labelledby="cyber-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="crime" role="tabpanel" aria-labelledby="crime-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="Worker-Compensation" role="tabpanel" aria-labelledby="Worker-Compensation-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="Umbrella" role="tabpanel" aria-labelledby="Umbrella-tab">
                <div class="member_card_style">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="row">
                        <div class="col-12 d-flex align-items-center">
                          <div class="member-info">
                            <form className="px-2 form_dtl">
                              <div className="row">
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerName__label'>
                                        {renderLobTabContent('div_ProducerName__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerName'>
                                      {renderLobTabContent('div_ProducerName')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerName__error'>
                                        {renderLobTabContent('div_ProducerName__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                    required
                                    className="borderless-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    //value={formData.policyNumber}
                                    value={'John'}
                                  // onChange={handleChange}
                                  /> */}

                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeAddress__label'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span>
                                    </div>
                                    <div id='div_ProducerOfficeAddress'>
                                      {renderLobTabContent('div_ProducerOfficeAddress')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeAddress__error'>
                                        {renderLobTabContent('div_ProducerOfficeAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="addressLine1"
                                  name="addressLine1"
                                  type="text"
                                  //value={formData.expirationDate}
                                  value={'Street1'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyEffectiveDate__label'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyEffectiveDate'>
                                      {renderLobTabContent('div_PolicyEffectiveDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyEffectiveDate__error'>
                                        {renderLobTabContent('div_PolicyEffectiveDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  className="borderless-input"
                                  id="addressLine2"
                                  name="addressLine2"
                                  type="text"
                                  //value={formData.effectiveDate}
                                  value={'10/12/2023'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerCode__label'>
                                        {renderLobTabContent('div_ProducerCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerCode'>
                                      {renderLobTabContent('div_ProducerCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerCode__error'>
                                        {renderLobTabContent('div_ProducerCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneExtension"
                                  name="phoneExtension"
                                  type="text"
                                  //value={formData.transactionType}
                                  value={'23151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerOfficeCode__label'>
                                        {renderLobTabContent('div_ProducerOfficeCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerOfficeCode'>
                                      {renderLobTabContent('div_ProducerOfficeCode')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerOfficeCode__error'>
                                        {renderLobTabContent('div_ProducerOfficeCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="text"
                                  //value={formData.insured}
                                  value={'2151'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PolicyExpirationDate__label'>
                                        {renderLobTabContent('div_PolicyExpirationDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PolicyExpirationDate'>
                                      {renderLobTabContent('div_PolicyExpirationDate')}
                                    </div>
                                    <span>
                                      <div id='div_PolicyExpirationDate__error'>
                                        {renderLobTabContent('div_PolicyExpirationDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="city"
                                  name="city"
                                  type="text"
                                  //value={formData.renewalStatus}
                                  value={'10/12/2024'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>

                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_ProducerType__label'>
                                        {renderLobTabContent('div_ProducerType__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_ProducerType'>
                                      {renderLobTabContent('div_ProducerType')}
                                    </div>
                                    <span>
                                      <div id='div_ProducerType__error'>
                                        {renderLobTabContent('div_ProducerType__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'New'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_PaymentSchedule__label'>
                                        {renderLobTabContent('div_PaymentSchedule__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_PaymentSchedule'>
                                      {renderLobTabContent('div_PaymentSchedule')}
                                    </div>
                                    <span>
                                      <div id='div_PaymentSchedule__error'>
                                        {renderLobTabContent('div_PaymentSchedule__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Prepaid'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessEstablishedDate__label'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessEstablishedDate'>
                                      {renderLobTabContent('div_BusinessEstablishedDate')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessEstablishedDate__error'>
                                        {renderLobTabContent('div_BusinessEstablishedDate__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'10/12/2021'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">

                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_FINNumber__label'>
                                        {renderLobTabContent('div_FINNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_FINNumber'>
                                      {renderLobTabContent('div_FINNumber')}
                                    </div>
                                    <span>
                                      <div id='div_FINNumber__error'>
                                        {renderLobTabContent('div_FINNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2121234'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_LegalEntity__label'>
                                        {renderLobTabContent('div_LegalEntity__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_LegalEntity'>
                                      {renderLobTabContent('div_LegalEntity')}
                                    </div>
                                    <span>
                                      <div id='div_LegalEntity__error'>
                                        {renderLobTabContent('div_LegalEntity__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'Corporation'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_SICCode__label'>
                                        {renderLobTabContent('div_SICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_SICCode'>
                                      {renderLobTabContent('div_SICCode')}
                                    </div>
                                    <span>
                                      <div id='div_SICCode__error'>
                                        {renderLobTabContent('div_SICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_InsuredBusinessAddress__label'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_InsuredBusinessAddress'>
                                      {renderLobTabContent('div_InsuredBusinessAddress')}
                                    </div>
                                    <span>
                                      <div id='div_InsuredBusinessAddress__error'>
                                        {renderLobTabContent('div_InsuredBusinessAddress__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'street2453'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_NatureOfBusiness__label'>
                                        {renderLobTabContent('div_NatureOfBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_NatureOfBusiness'>
                                      {renderLobTabContent('div_NatureOfBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_NatureOfBusiness__error'>
                                        {renderLobTabContent('div_NatureOfBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'service'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofSICCode__label'>
                                        {renderLobTabContent('div_DescriptionofSICCode__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofSICCode'>
                                      {renderLobTabContent('div_DescriptionofSICCode')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofSICCode__error'>
                                        {renderLobTabContent('div_DescriptionofSICCode__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'12345'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 col-lg-4 ">
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_BusinessContactNumber__label'>
                                        {renderLobTabContent('div_BusinessContactNumber__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_BusinessContactNumber'>
                                      {renderLobTabContent('div_BusinessContactNumber')}
                                    </div>
                                    <span>
                                      <div id='div_BusinessContactNumber__error'>
                                        {renderLobTabContent('div_BusinessContactNumber__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="state"
                                  name="state"
                                  type="text"
                                  //value={formData.typeOfLoss}
                                  value={'2134567890'}
                                // onChange={handleChange}
                                /> */}
                                  </div>
                                  <div className="lob_detail_item">
                                    <div className="lob_detail_title">
                                      <div id='div_DescriptionofNatureofBusiness__label'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__label')}
                                      </div>
                                      <span class="mendatory-field"></span></div>
                                    <div id='div_DescriptionofNatureofBusiness'>
                                      {renderLobTabContent('div_DescriptionofNatureofBusiness')}
                                    </div>
                                    <span>
                                      <div id='div_DescriptionofNatureofBusiness__error'>
                                        {renderLobTabContent('div_DescriptionofNatureofBusiness__error')}
                                      </div>
                                    </span>
                                    {/* <input
                                  required
                                  className="borderless-input"
                                  id="zipCode"
                                  name="zipCode"
                                  type="text"
                                  //value={`$${formData.amount.toLocaleString()}`}
                                  value={'its good'}
                                // onChange={handleChange}
                                /> */}
                                  </div>

                                </div>
                                <div className="col-sm-12 mb-3"></div>
                                <div className="account_detail_button col-sm-12 text-end">
                                  {/* <Button variant="contained" className="blue px-4">
Save
</Button>
<Button variant="contained" className="cancel">
Delete
</Button> */}
                                </div>
                              </div>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <button onClick={handleSave}>Save</button>
    </>
  );
};



export default Detail;