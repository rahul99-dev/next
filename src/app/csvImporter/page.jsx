"use client"
import React, { useState } from 'react';
import Papa from 'papaparse';

function CsvImporter({ sendDataToPage }) {
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target.result;
      parseExcelData(fileData);
    };

    reader.readAsText(file);
  };

  const parseExcelData = (data) => {
    Papa.parse(data, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const updatedGroupA = result.data.map((row) => row['Group A']);
          const updatedGroupB = result.data.map((row) => row['Group B']);
          setGroupA(updatedGroupA);
          setGroupB(updatedGroupB);

          // Send data back to the parent component
          sendDataToPage({ groupA: updatedGroupA, groupB: updatedGroupB });
        }
      },
      header: true, // If the first row contains headers
    });
  };

  return (
    <>
      <div>
        <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
      </div>
    </>
  );
}

export default CsvImporter;
