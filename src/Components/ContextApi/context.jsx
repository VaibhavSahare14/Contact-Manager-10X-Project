import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const context = createContext();

export const ContextProvider = (props) => {
  const [email, setEmail] = useState("")
  const [contacts, setContacts] = useState([]);
  const [checkedArr, setCheckedArr] = useState([])
  const navigate = useNavigate();

  // ***************posting signin details**************

  const signInUser = (loginData) => {
    console.log(loginData);
    axios
      .post("https://contact-manager-server.herokuapp.com/login", loginData)
      .then((res) => {
        const myToken = res.data.token;
        console.log(myToken);
        localStorage.setItem("token", myToken);
        localStorage.setItem("email", loginData.email);
        navigate("/contacts");
        // fetchContacts();
        document.location.reload();
        setEmail(loginData.email);
      })
      .catch((err) => {
        window.alert(err.response.data.message)
        console.log(err)
      });
  };




  // ************posting contacts **************
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  const postContacts = async (ContactsData) => {

    return await axios
      .post("https://contact-manager-server.herokuapp.com/add", ContactsData, config)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response.data.message)
        // console.log(err)
      })

  };
  // fetching the contacts;
  const fetchContacts = () => {
    axios
      .get("https://contact-manager-server.herokuapp.com/alldata", config)
      .then((res) => {
        console.log(res.data[0].contact);
        // const data = res.data.message[0].Contacts;
        const data = res.data[0].contact;
        setContacts(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  // *************posting signup detailes ***********
  const signUpUser = (userData) => {
    console.log(userData);
    try {
      axios
        .post("https://contact-manager-server.herokuapp.com/register", userData)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.response.data.message);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  // *************deleting contacts*********
  const deleteContacts = (id) => {
    axios
      .delete(`https://contact-manager-server.herokuapp.com/delete/${id}`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // *************serching function ***************
  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };



  return (
    <context.Provider
      value={
        {
          contacts,
          postContacts,
          signUpUser,
          signInUser,
          email,
          fetchContacts,
          deleteContacts,
          checkedArr,
          setCheckedArr,
          myFunction
        }
      }>
      {props.children}
    </context.Provider>
  )
}
