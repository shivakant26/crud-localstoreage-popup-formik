import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EmployeeList from "../component/EmployeeList";
import { FaPlus } from "react-icons/fa";
import Model from "../component/Model";

const HomePage = () => {
  const data = JSON.parse(localStorage.getItem("employeeData"));
  const [show, setShow] = useState(false);
  const [delAction , setDelAction] = useState("");
  const [delId , setDeleteId] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(data);
  const [id, setId] = useState("");
  
  const addEmployee = () => {
    setShow(true);
    setId("");
    setDelAction("");
    setDeleteId("");
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    console.log("hiiii");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {show && (
            <Model
              show={show}
              onHide={handleClose}
              userData={userData}
              setId={setId}
              setLoading={setLoading}
              id={id}
              delId={delId}
              delAction = {delAction}
              setUserData={setUserData}
            />
          )}
          <div className="home_page">
            <div className="header">
              <Button onClick={addEmployee}>
                <FaPlus />
                Add Employee
              </Button>
            </div>
            <div className="employeelist_section">
              <EmployeeList
                setId={setId}
                setLoading={setLoading}
                show={addEmployee}
                userData={userData}
                setShow = {setShow}
                setDelAction = {setDelAction}
                setDeleteId = {setDeleteId}
                setUserData={setUserData}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
