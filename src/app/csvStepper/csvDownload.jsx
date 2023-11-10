"use client"
import React, { useState } from 'react'
import Papa from 'papaparse';

function CsvDownload({ downloadData }) {
    //console.log("downloadData", downloadData);
    const [groupA, setGroupA] = useState(downloadData.groupA);
    const [groupB, setGroupB] = useState(downloadData.groupB);

    //Download Csv
    const handleDownloadCSV = () => {
        const csvData = [];

        // Add headers
        csvData.push(['Group A', 'Group B']);

        // Determine the maximum number of columns in either group
        const maxColumns = Math.max(groupA.length, groupB.length);

        // Combine the data of both groups, aligning items by index
        for (let i = 0; i < maxColumns; i++) {
            const rowData = [];
            if (i < groupA.length) {
                rowData.push(groupA[i]);
            } else {
                rowData.push('');
            }
            if (i < groupB.length) {
                rowData.push(groupB[i]);
            } else {
                rowData.push('');
            }
            csvData.push(rowData);
        }

        const csv = Papa.unparse(csvData);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'columns.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <>
            <div>
                
                <button className='dwn-btn' onClick={handleDownloadCSV}><i class="bi bi-download"></i>Download CSV</button>
            </div>
        </>
    )
}

export default CsvDownload
