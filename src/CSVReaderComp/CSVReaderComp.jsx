import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DragandDrop from "../Components/DragandDrop/DragandDrop";

const CSVReaderComp = () => {
  const [csvData, setCsvData] = useState([]);
  const [columnValues, setColumnValues] = useState([]);
  const [values, setValues] = useState([]);
  const [fileUpload, setFileUpload] = useState([])

    console.log("fileUpload ", fileUpload)
  console.log("columnArrary ", columnValues);
  console.log("values ", values);

  const fileHandler = (fileUpload) => {
    Papa.parse(fileUpload[0], {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (result) {
        console.log("result ", result);
        const columnArray = [];
        const valuesArray = [];

        let i = 0;

        result.data.map((d) => {
          // console.log("d ", d);
          // if(i === 0){
          //   columnArray.push(d)
          // }else{
          //   valuesArray.push(d)
          // }
          // i++
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setCsvData(result.data);
        setColumnValues(columnArray[0]);
        setValues(valuesArray);
      },
    });
  };

  useEffect(() => {
    fileUpload.length > 0 && fileHandler(fileUpload)
  },[fileUpload])


  // return (
  //   <div>
  //     <input
  //       type="file"
  //       name="file"
  //       accept=".csv"
  //       style={{ display: "block", margin: "10px auto" }}
  //       onChange={fileHandler}
  //     />

  //     <br />

  //     <table
  //       style={{
  //         borderCollapse: "collapse",
  //         border: "1px solid black",
  //         margin: "5px auto",
  //       }}
  //     >
  //       <thead>
  //         <tr>
  //           {columnValues.map((item, i) => {
  //               // {console.log("item ", item)}
  //             return <th key={i} style={{border: "1px solid black"}}>{item}</th>;
  //           })}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {values.map((item, i) => {
  //           return <tr key={i}>
  //             {item.map((value) => (
  //               <>
  //               {/* {console.log("value ", value)} */}
  //               <td key={i} style={{border: "1px solid black"}}>{value}</td>
  //               </>
  //             ))}
  //           </tr>;
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  return (
    <>
      {/* <input
        type="file"
        name="file"
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
        onChange={fileHandler}
      /> */}
      <div className="" style={{margin: "0 100px"}}>
        <DragandDrop files={fileUpload} setFiles={setFileUpload} fileType="text/csv"/>
      </div>

      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnValues.map((item, i) => {
                return (
                  <TableCell style={{ fontWeight: "600" }}>{item}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map((item) => {
                  return (
                    <TableCell component="th" scope="row">
                      {item && item === true ? console.log(true) : console.log(false)}
                      
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CSVReaderComp;
