"use client"
import React, { useState } from 'react';

import  styles from './page.module.css'
import CsvImporter from './csvImporter';
import CsvPage from './csvMapper';
import CsvDownload from './csvDownload';

export default function Page() {
  const [currentStep, setCurrentStep] = useState('csvImport');
  const [importedData, setImportedData] = useState(null);
  const [mapperData, setMapperData] = useState(null);
  const [error, setError] = useState('');
 // const [currentPage, setCurrentPage] = useState('import');

  const handleNext = () => {
    if (currentStep === 'csvImport') {
      // Check if data has been imported
      if (importedData) {
        setCurrentStep('csvPage');
      } else {
        setError('Please import data before proceeding.');
      }
    } else if (currentStep === 'csvPage') {
      setCurrentStep('csvDownload');
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'csvPage') {
      setImportedData(null);
      setCurrentStep('csvImport');
    } else if (currentStep === 'csvDownload') {
      setCurrentStep('csvPage');
    }
  };

  //for receive data from importer component 
  const receiveDataFromImporter = (data) => {
    // Data received from CsvImporter
    console.log('Data received:', data);
    setImportedData(data);
    // Reset the error message
    setError('');
  };

  //for receive Data from mapper component 
  const receiveDataFromMapper = (data) => {
    // Data received from CsvImporter
    console.log('Data received from mapper:', data);
    setMapperData(data);
    setImportedData(data);
    // Reset the error message
    setError('');
  };

  return (
    <><div className="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item active">CSV Mapping</li>
      </ol>
    </nav>
  </div>
  <section className="section dashboard">
      <div className="row">
      <div className="container slider-one-active">
      <div className="steps">
        <div className={`step step-one ${currentStep === 'csvImport' ? 'active' : ''}`}>
          <div className="liner"></div>
          <span>Upload CSV!</span>
        </div>
        <div className={`step step-two ${currentStep === 'csvPage' ? 'active' : ''}`}>
          <div className="liner"></div>
          <span>Step-2!</span>
        </div>
        <div className={`step step-three ${currentStep === 'csvDownload' ? 'active' : ''}`}>
          <div className="liner"></div>
          <span>Step-3!</span>
        </div>
      </div>
      <div className="line">
        <div className="dot-move"></div>
        <div className={`dot zero ${currentStep === 'csvImport' ? 'active' : ''}`}></div>
        <div className={`dot center ${currentStep === 'csvPage' ? 'active' : ''}`}></div>
        <div className={`dot full ${currentStep === 'csvDownload' ? 'active' : ''}`}></div>
      </div>
  <div className="slider-ctr">
    <div className="slider">
      <div className="slider-form slider-one"> {currentStep === 'csvImport' && (
          <>
            <CsvImporter sendDataToPage={receiveDataFromImporter} />
            {error && <p className="error-message">{error}</p>}
          </>
        )}
        {currentStep === 'csvPage' && <CsvPage sendDataToDownload = {receiveDataFromMapper} csvData={importedData}  />}
        {currentStep === 'csvDownload' && <CsvDownload downloadData = {mapperData} />}
        <div className="slider-form button-container">
          {currentStep != 'csvImport' &&<button className={styles["button"]} onClick={handlePrevious} disabled={currentStep === 'csvImport'} >
            Previous
          </button>}
          {currentStep != 'csvDownload' &&<button className={styles["button"]} onClick={handleNext} disabled={currentStep === 'csvDownload'} >
            Next
          </button>}
        </div></div>      
    </div>
  </div>
</div>
       
      </div>     
</section>
    </>
  );
}

