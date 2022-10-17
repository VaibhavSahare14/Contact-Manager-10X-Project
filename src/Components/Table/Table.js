import React, { useState } from 'react'
import { useContext } from 'react'
import { context } from '../ContextApi/context'
import Edit from "../../Images/Edit-Pen.png"
import DeleteBin from "../../Images/Delete-Bin.png"
import "./Table.css"
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const Table = () => {
    const { contacts, setCheckedArr, deleteContacts } = useContext(context);
    const [pageNo, setPageNo] = useState(1);
    let limit = 8;
    let pages = Math.ceil(contacts.length / limit);
    let pagesArray = new Array(pages).fill(0);
    const start = (pageNo - 1) * limit;
    const end = pageNo * limit;
    const contactperpage = contacts.slice(start, end);
    const left = "<"
    const right = ">"
    const handlepageClick = (e) => {
        console.log((e.target.value));
        setPageNo(parseInt(e.target.value))
    }
    let checkedArr = [];
    const checkCheckbox = (e) => {
        let clicked = e._id;
        const index = checkedArr.indexOf(e._id);
        console.log(index)
        if (index > -1) {
            checkedArr.splice(index, 1);
        } else {
            checkedArr.push(clicked);
        }
        setCheckedArr((prev) => {
            return [...prev, ...checkedArr]
        })
    };
    const checkCheckboxAll = () => {
        document.querySelectorAll("#checksingle").forEach((element) => {
            console.log(element)
            if (element.checked === false) {
                element.checked = true;
                checkedArr.push(element.name);
            } else {
                element.checked = false;
                const index = checkedArr.indexOf(element.name);
                if (index > -1) {
                    checkedArr.splice(index, 1);
                }
            }
        });
        setCheckedArr(checkedArr)
    };
    const MyTooltip = ({ content, children }) => (
        <Tooltip
            overlay={content}
            mouseLeaveDelay={0.2}
            mouseEnterDelay={0.1}
            defaultVisible={false}
            placement="bottom"
            overlayClassName="bbs-tooltip"
            overlayInnerStyle={{
                color: "#2DA5FC",
                background: "#FFFFFF",
                width: "223px",
                height: " 33px",
                fontSize: "18px",
                textAlign: "center",
                opacity: "1",
            }}
        >
            {children}
        </Tooltip>
    );
    return (
        <div>
            <table id="myTable" className="table table-hover">
                <thead>
                    <input type="checkbox" id="checkAll" onClick={(checkCheckboxAll)} />
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Company</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Country</th>
                    <th scope="col">Action</th>
                </thead>
                <tbody className='table-body'>
                    {contactperpage.map((item, i) => {
                        if (item.name !== "") {
                            return (
                                <tr key={item._id}>
                                    <th>
                                        <input
                                            type="checkbox"
                                            id="checksingle"
                                            onClick={() => {
                                                checkCheckbox(item)
                                            }}

                                            name={item._id}
                                        />
                                    </th>
                                    <td>{item.Name}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.Company}</td>
                                    <td>{item.Industry}</td>
                                    <MyTooltip content={item.Email}>
                                        <td id="email">{item.Email}</td>
                                    </MyTooltip>
                                    <td>{item.PhoneNumber}</td>
                                    <td>{item.Country}</td>
                                    <td>
                                        <img src={Edit} alt="" />
                                        <img src={DeleteBin} alt="" onClick={() => {
                                            deleteContacts(item._id);
                                            document.location.reload();
                                        }} />
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>

            <div className='page-no'>
                {(pageNo > pages) ? null : <button onClick={() => {
                    if (pageNo > 1) {
                        setPageNo(pageNo - 1)
                    }
                }
                }> {left} </button>}

                {
                    pagesArray.map((item, i) => {
                        return (<button value={i + 1} onClick={handlepageClick}>{i + 1}</button>)
                    })
                }
                {(pageNo > pages) ? null : <button onClick={() => {
                    if (pageNo !== pages) {
                        setPageNo(pageNo + 1)
                    }
                }
                }> {right} </button>}
            </div>



        </div>
    )
}

export default Table