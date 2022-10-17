// import React, { useState, useContext } from "react";
// import { context } from "./Components/ContextApi/context";
// const ImportFile = () => {
//   const [csvFile, setCsvFile] = useState({});
//   const [contacts, setContacts] = useState([])
//   const { postContacts } = useContext(context);

//   const processCSV = (str, delim = ",") => {
//     const headers = str.slice(0, str.indexOf("\n")).trim().split(delim);
//     const rows = str.slice(str.indexOf("\n") + 1).split("\n");
//     const Array = rows.map((row) => {
//       const values = row.trim().split(delim);
//       const eachObj = headers.reduce((obj, header, i) => {
//         obj[header.toLowerCase()] = values[i];
//         return obj;
//       }, {});
//       return eachObj;
//     });
//     Array.pop();
//     return Array;
//   };

//   const submitData = (e) => {
//     e.preventDefault();
//     const file = csvFile;
//     console.log(file)
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = function (e) {
//       const text = e.target.result;
//       const data = processCSV(text);
//       console.log(data)
//       setContacts([...contacts, data])
//       console.log(contacts)
//       // postContacts(data)
//     }
//   }

//   return (
//     <div>
//       <form method='POST' onSubmit={submitData}>
//         <input type="file" onChange={(e) => {
//           setCsvFile(e.target.files[0])
//         }} />
//         <button>SUBMIT</button>
//       </form>
//     </div>
//   )
// }

// export default ImportFile;
