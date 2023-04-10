import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { SignupSchema } from "../utils/formValidation";

const Model = ({
  show,
  onHide,
  userData,
  setUserData,
  id,
  setLoading,
  delId,
  delAction,
}) => {
  console.log(123, delId);
  const [initialState, setInitialState] = useState({
    name: "",
    email: "",
    department: "",
    gender: "",
    phone: "",
  });
  const deleteEmp = () =>{
    const data = [...userData];
      data.splice(id, 1);
      setUserData(data);
      localStorage.setItem("employeeData", JSON.stringify(data));
      setLoading(true);
      toast.error("delete succussfully")
      onHide(false);
  }
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Formik
          initialValues={initialState}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            if (id == "") {
              const updatedData = [...userData, values];
              console.log(456123, updatedData);
              localStorage.setItem("employeeData", JSON.stringify(updatedData));
              setUserData(updatedData);
              toast.success("add succussfully");
            } else {
              const updatedData = [...userData];
              updatedData.splice(id - 1, 1, values);
              setUserData(updatedData);
              localStorage.setItem("employeeData", JSON.stringify(updatedData));
              toast.success("update succussfully");
            }
            setLoading(true);
            resetForm();
            onHide(false);
          }}
        >
          {function MyForm({ values, setFieldValue, touched, errors }) {
            useEffect(() => {
              if (id !== "") {
                const data = userData[id - 1];
                setFieldValue("name", data.name);
                setFieldValue("email", data.email);
                setFieldValue("department", data.department);
                setFieldValue("gender", data.gender);
                setFieldValue("phone", data.phone);
              }
            }, [id]);
            return (
              <Form>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {delAction === "del" ? "Delete Employee" : "Add Employee"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {delAction === "del" ? (
                    <>
                      <p>Are you Sure?</p>
                    </>
                  ) : (
                    <>
                      <div className="form-field">
                        <Field name="name" type="text" placeholder="Name" />
                        {errors.name && touched.name ? (
                          <div className="error">{errors.name}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <Field name="email" type="text" placeholder="Email" />
                        {errors.email && touched.email ? (
                          <div className="error">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <Field
                          as="select"
                          aria-label="Default select example"
                          name="department"
                        >
                          <option>Choose Department </option>
                          <option value="development">Dev Department</option>
                          <option value="admin">Admin Department</option>
                          <option value="hr department">Human Resource</option>
                        </Field>
                        {errors.department && touched.department ? (
                          <div className="error">{errors.department}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <div className="form_inner">
                          <FormLabel>Gender :</FormLabel>
                          <div className="gender_group">
                            <label>
                              <Field type="radio" name="gender" value="male" />
                              Male
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="gender"
                                value="female"
                                className="radio-2"
                              />
                              Female
                            </label>
                          </div>
                        </div>
                        {errors.gender && touched.gender ? (
                          <div className="error">{errors.gender}</div>
                        ) : null}
                      </div>
                      <div className="form-field">
                        <Field name="phone" type="text" placeholder="Phone" />
                        {errors.phone && touched.phone ? (
                          <div className="error">{errors.phone}</div>
                        ) : null}
                      </div>
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                    Close
                  </Button>
                  {delAction === "del" ? (
                    <>
                    <Button variant="primary" onClick={deleteEmp}>delete</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="primary" type="submit">
                        {id === "" ? "Save" : "Update"}
                      </Button>
                    </>
                  )}
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default Model;
