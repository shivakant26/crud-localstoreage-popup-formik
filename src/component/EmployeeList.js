import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EmployeeList = ({
  userData,
  setUserData,
  show,
  setId,
  loading,
  setLoading,
  setShow,
  setDelAction,
  setDeleteId,
}) => {
  const data = JSON.parse(localStorage.getItem("employeeData")) || [];

  const deleteRecord = (id) => {
    setShow(true);
    setDelAction("del");
    setDeleteId(id);
  };

  const editRecord = (id) => {
    show();
    setId(id + 1);
    setLoading(true);
  };
  return (
    <>
      <h2 className="subheading">Employee List</h2>
      <div className="employee_card_wr">
        {userData?.map((empInfo, index) => {
          return (
            <div className="emp_card" key={index}>
              <div className="field_row">
                <span>Name:</span>
                <span>{empInfo?.name}</span>
              </div>
              <div className="field_row">
                <span>DOB:</span>
                <span>{empInfo?.dob || "12-06-1980"}</span>
              </div>
              <div className="field_row">
                <span>Email:</span>
                <span>{empInfo.email}</span>
              </div>
              <div className="field_row">
                <span>Department:</span>
                <span>{empInfo.department}</span>
              </div>
              <div className="card_footer">
                <Button onClick={() => editRecord(index)}>Edit</Button>
                <Button className="del_btn" onClick={() => deleteRecord(index)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EmployeeList;
