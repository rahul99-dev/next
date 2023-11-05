"use client"
import React, { useState } from 'react';
import CsvPage from '../csvMapper/page';
import CsvImporter from '../csvImporter/page';
import CsvDownload from '../csvDownload/page';
import  styles from './page.module.css'

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
    <>
      <div>
        {currentStep === 'csvImport' && (
          <>
            <CsvImporter sendDataToPage={receiveDataFromImporter} />
            {error && <p className="error-message">{error}</p>}
          </>
        )}
        {currentStep === 'csvPage' && <CsvPage sendDataToDownload = {receiveDataFromMapper} csvData={importedData}  />}
        {currentStep === 'csvDownload' && <CsvDownload downloadData = {mapperData} />}
        <div className="button-container">
          <button className={styles["button"]} onClick={handlePrevious} disabled={currentStep === 'csvImport'} >
            Previous
          </button>
          <button className={styles["button"]} onClick={handleNext} disabled={currentStep === 'csvDownload'} >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

