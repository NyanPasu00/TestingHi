import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

export function MyComponent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");

  const [newAge, setNewAge] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const convertToMySQLDateTime = () => {
    const currentDate = moment();
    const mysqlDateTime = currentDate.format("YYYY-MM-DD HH:mm:ss");
    return mysqlDateTime;
  };

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        date: convertToMySQLDateTime(),
      })
      .then(() => {
        console.log("Sending Success");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const getEmployee = () => {
    axios
      .get("http://localhost:3001/getemployee")
      .then((response) => {
        console.log("GetInfo");
        setEmployeeList(response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const updateEmployee = (id) => {
    if(newAge > 0)
    {
    axios
      .put("http://localhost:3001/update", { age: newAge, id: id })
      .then(() => {
        console.log("updating");
        setEmployeeList(
          employeeList.map((arr) => {
            return arr.id == id
              ? {
                  ...arr,
                  age: newAge,
                }
              : arr;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
    }else
    console.log("Number Cannot Under 0");
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      console.log("Deleting");
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <>
      <div className="App">
        <div className="information"></div>
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div>
        <button onClick={getEmployee}>Show Employee</button>
        {employeeList.map((arr, key) => {
          return (
            <div className="employee">
              <h3>ID : {arr.id}</h3>
              <h3>Name : {arr.name}</h3>
              <h3>Age : {arr.age}</h3>
              <h3>Country : {arr.country}</h3>
              <h3>Position : {arr.position}</h3>
              <h3>Date : {moment(arr.date).format("DD/MM/YYYY HH:mm:ss")}</h3>
              <div>
                <input
                  type="text"
                  placeholder="Update Your Age"
                  onChange={(e) => {
                    setNewAge(e.target.value);
                  }}
                />
                <button onClick={() => updateEmployee(arr.id)}>Update</button>
                <button onClick={() => deleteEmployee(arr.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
