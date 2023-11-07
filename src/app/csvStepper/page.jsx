"use client"
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './page.module.css';
import Stepper from 'react-stepper-horizontal';
import CsvImporter from './csvImporter';
import CsvPage from './csvMapper';
import CsvDownload from './csvDownload';


export default function Page() {
  const [currentStep, setCurrentStep] = useState(0); // Use a numeric index for the current step
  const [importedData, setImportedData] = useState(null);
  const [mapperData, setMapperData] = useState(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (currentStep === 0) {
      if (importedData) {
        setCurrentStep(1);
      } else {
        setError('Please import data before proceeding.');
      }
    } else if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      setImportedData(null);
      setCurrentStep(0);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  //for receive data from importer component 
  const receiveDataFromImporter = (data) => {
    console.log('Data received:', data);
    setImportedData(data);
    setError('');
  };

  //for receive Data from mapper component 
  const receiveDataFromMapper = (data) => {
    console.log('Data received from mapper:', data);
    setMapperData(data);
    setImportedData(data);
    setError('');
  };

  const steps = [
    { title: 'Import Csv' },
    { title: 'Mapped Csv' },
    { title: 'Download Csv' },
  ];

  return (
    <>
    <div className="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/">Home</a></li>
        <li className="breadcrumb-item active">CSV Mapping</li>
      </ol>
    </nav>
  </div>
    <Container>
      <Row>
        <Col md={12}>
          <Stepper
            steps={steps}
            activeStep={currentStep}
          />
          <hr />
          <div className="step-content">
            {currentStep === 0 && (
              <>
                <CsvImporter sendDataToPage={receiveDataFromImporter} />
                {error && <p className="error-message">{error}</p>}
              </>
            )}
            {currentStep === 1 && (
              <CsvPage sendDataToDownload={receiveDataFromMapper} csvData={importedData} />
            )}
            {currentStep === 2 && (
              <CsvDownload downloadData={mapperData} />
            )}
          </div>
          <div>
            <button className={styles["button"]}
              variant="secondary"
              disabled={currentStep === 0}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button className={styles["button"]}
              variant="primary"
              disabled={currentStep === 2}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}



