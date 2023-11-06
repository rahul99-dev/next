// pages/index.js
"use client"
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Papa from 'papaparse';
import styles from './page.module.css'

const ItemType = 'ITEM';

const DraggableItem = ({ item, index, moveItem, columnIndex }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index, columnIndex },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index || draggedItem.columnIndex !== columnIndex) {
        moveItem(draggedItem.index, index, draggedItem.columnIndex, columnIndex);
        draggedItem.index = index;
        draggedItem.columnIndex = columnIndex;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ padding: '8px', margin: '4px', border: '1px solid #ccc' }}>
      {item}
    </div>
  );
};

const CsvPage = ({sendDataToDownload,csvData}) => {
const csvfilterGroupA = csvData.groupA.filter((value) => value !== "");
const csvfilterGroupB = csvData.groupB.filter((value) => value !== "");

//console.log(filteredArray); // This will remove empty strings
  const [initialGroupA,setInitialGroupA] = useState(csvfilterGroupA);
  const [initialGroupB,setInitialGroupB] = useState(csvfilterGroupB)
  // const initialGroupA = [
  //   "Australia",
  //   "Bermuda",
  //   "Canada",
  //   "Cameroon",
  //   "Denmark",
  //   "France",
  //   "Finland",
  //   "Germany",
  //   "Hong Kong",
  // ];

  // const initialGroupB = [
  //   "India",
  //   "Italy",
  //   "Japan",
  //   "Mexico",
  //   "Norway",
  //   "Poland",
  //   "Switzerland",
  //   "United Kingdom",
  //   "United States",
  // ];
 //console.log("csvData",csvData);
  const [groupA, setGroupA] = useState(initialGroupA);
  const [groupB, setGroupB] = useState(initialGroupB);

  const moveItem = (fromIndex, toIndex, fromColumnIndex, toColumnIndex) => {
    const sourceItems = fromColumnIndex === 0 ? groupA : groupB;
    const targetItems = toColumnIndex === 0 ? groupA : groupB;

    const itemToMove = sourceItems[fromIndex];
    sourceItems.splice(fromIndex, 1);
    targetItems.splice(toIndex, 0, itemToMove);

    setGroupA([...groupA]);
    setGroupB([...groupB]);
    //sendDataToDownload({ groupA: groupA, groupB: groupB });
  };

  //sendDataToDownload({ groupA: groupA, groupB: groupB });

  //for updated data send
  useEffect(() => {
    if (groupA.length > 0 && groupB.length > 0) {
      sendDataToDownload({ groupA: groupA, groupB: groupB });
    }
  }, [groupA, groupB]);

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
     //sendDataToDownload({ groupA: updatedGroupA, groupB: updatedGroupB });
        }
      },
      header: true, // If the first row contains headers
    });

    
  };


  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <div className="wrapper">
      <div className={styles["list-container"]}>
        <div className={styles["listbox1"]}>
          <h4>Group A</h4>
          {groupA.map((item, index) => (
            <DraggableItem key={item} item={item} index={index} moveItem={moveItem} columnIndex={0} />
          ))}
        </div>
        <div className={styles["listbox2"]}>
          <h4>Group B</h4>
          {groupB.map((item, index) => (
            <DraggableItem key={item} item={item} index={index} moveItem={moveItem} columnIndex={1} />
          ))}
        </div>
      </div>
      </div>
      {/* <div>
      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
      </div> */}
      
      {/* <button onClick={handleDownloadCSV}>Download CSV</button> */}
    </DndProvider>
    </>
  );
};

export default CsvPage;
