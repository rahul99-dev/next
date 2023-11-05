"use client"
import React, { useState } from 'react';
import CsvPage from '../csvMapper/page';
import CsvImporter from '../csvImporter/page';
import CsvDownload from '../csvDownload/page';
import  styles from './page.module.css'

export default function Page() {
  const [currentStep, setCurrentStep] = useState('A');
  const [importedData, setImportedData] = useState(null);
  const [mapperData, setMapperData] = useState(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (currentStep === 'A') {
      // Check if data has been imported
      if (importedData) {
        setCurrentStep('B');
      } else {
        setError('Please import data before proceeding.');
      }
    } else if (currentStep === 'B') {
      setCurrentStep('C');
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'B') {
      setCurrentStep('A');
    } else if (currentStep === 'C') {
      setCurrentStep('B');
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
    // Reset the error message
    setError('');
  };

  return (
    <>
      <div>
        {currentStep === 'A' && (
          <>
            <CsvImporter sendDataToPage={receiveDataFromImporter} />
            {error && <p className="error-message">{error}</p>}
          </>
        )}
        {currentStep === 'B' && <CsvPage sendDataToDownload = {receiveDataFromMapper} csvData={importedData}  />}
        {currentStep === 'C' && <CsvDownload downloadData = {mapperData} />}
        <div className="button-container">
          <button className={styles["button"]} onClick={handlePrevious} disabled={currentStep === 'A'} >
            Previous
          </button>
          <button className={styles["button"]} onClick={handleNext} disabled={currentStep === 'C'} >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

