import { parse } from "papaparse";
import { useState, useContext } from "react";
import Calendar from "../../Images/calender.png"
import downArrow from "../../Images/downArrow.png"
import filter from "../../Images/list.png"
import verticleLine from "../../Images/verticleLine.png"
import Delete from "../../Images/delet.png"
import Import from "../../Images/sort.png"
import Export from "../../Images/export.png"
import impDel from "../../Images/impDel.png";
import delIconComp from "../../Images/delIconComp.png";
import importLogo from "../../Images/importLogo.png";
import importComplete from "../../Images/importComplete.png";
import { context } from "../ContextApi/context";
import "./TableNav.css"
import Table from "../Table/Table";

const TableNav = () => {
  const { postContacts, fetchContacts, checkedArr, deleteContacts } = useContext(context);
  const [click, setClick] = useState(false);
  const [delclick, setDelClick] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDelComplete, setIsDelComplete] = useState(false);
  if (isComplete) {
    // fetchContacts()
    // fetchContactsperPage()
  }
  const deletebtnClicked = async () => {
    console.log(checkedArr)
    const UserIds = checkedArr;
    UserIds.map(async (id) => {
      return await deleteContacts(id);
    });
    fetchContacts();
  };

  return (
    <>
      <div className='table-nav-container'>
        <div className='left-nav'>
          <div className='nav-items'>
            <img src={Calendar} alt="" />
            <span>Select Date</span>
            <img src={downArrow} alt="" />
          </div>
          <div className='nav-items'>
            <img src={filter} alt="" />
            <span>Filter</span>
            <img src={verticleLine} alt="" />
            <img src={downArrow} alt="" />
          </div>
        </div>
        <div className='right-nav'>
          <div className='nav-items' style={{ cursor: "pointer" }} onClick={() => setDelClick(true)}>
            <img src={Delete} alt="" />
            <span>Delete</span>
          </div>
          {delclick && (
            <div className="popup">
              {(isDelComplete) ? (
                <>
                  <div>
                    <img src={delIconComp} alt="PopUp" />
                  </div>
                  <div className="popuptext">Deleted Contacts</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setDelClick(!delclick);
                        setIsDelComplete(false);
                        document.location.reload();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img src={impDel} alt="PopUp" />
                  </div>
                  <div className="popuptext">Delete Contacts</div>
                  <div className="popuplink">
                    Sure you want delete this Contacts ?
                  </div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setDelClick(!delclick);
                        setIsDelComplete(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setIsDelComplete(true);
                        deletebtnClicked();
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <div className='nav-items' style={{ cursor: "pointer" }} onClick={() => setClick(!click)}>
            <img src={Import} alt="" />
            <span>Import</span>
          </div>
          <div className='nav-items'>
            <img src={Export} alt="" />
            <span>Export</span>
          </div>
          {click && (
            <div
              className={`popup ${highlighted ? "highlighted" : "nothighlighted"}`}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={() => setHighlighted(true)}
              onDragLeave={() => setHighlighted(false)}
              onDrop={(e) => {
                e.preventDefault();
                setHighlighted(false);
                console.log(e.dataTransfer.files)
                Array.from(e.dataTransfer.files)
                  .filter((files) => files.type === "text/csv")
                  .forEach(async (file) => {
                    console.log(file);
                    const text = await file.text();
                    const result = parse(text, { header: true });
                    console.log(result.data);
                    result.data.pop();
                    // setContact((pre) => [...pre, ...result.data]);
                    postContacts(result.data)
                    setIsComplete(true);
                    document.location.reload();
                  });
              }}
            >
              {isComplete ? (
                <>
                  <div>
                    <img src={importComplete} alt="PopUp" />
                  </div>
                  <div className="popuptext">Import Complete</div>
                  <div className="popuplink">CSV File is Uploaded</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setClick(!click);
                        setIsComplete(false);
                        // setdrop(false);
                      }}
                    >
                      Ok
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img src={importLogo} alt="PopUp" />
                  </div>
                  <div className="popuptext">Import File</div>
                  <div className="popuplink">Drag & Drop a CSV File to Upload</div>
                  <div className="popupbtncontainer">
                    <button
                      className="popupbtn"
                      onClick={() => {
                        setClick(!click);
                        setIsComplete(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mainTable-container">
        <Table />
      </div>
    </>
  )
}

export default TableNav