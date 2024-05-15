import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useFormik } from "formik";
import theme from "../Theme";
import { useSelector, useDispatch } from "react-redux";
import {
  createFamilyDetailsStart,
  loadFamilyDetailsStart,
  updateFamilyDetailsStart,
  deleteFamilyDetailsStart,
} from "../redux/actions/familyDetailsActions";
import { initialValues, generateValidationSchema } from "../components/Validations";
import Controls from "../components/Controls";
import NoDataFound from "../components/NoDataComponent";
import LoadingComponent from "../components/LoadingComponent";

const ResuableTable = lazy(() => import("../components/Table"));

const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "relationship", label: "Relationship" },
  { id: "mobile_number", label: "Mobile" },
  { id: "address", label: "Address" },
];

const FamilyDetails = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const [loading, setLoding] = useState(true);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    formik.resetForm();
    setUserInfo({});
  };

  const formFields = [
    "name",
    "email",
    "mobile_number",
    "relationship",
    "address",
  ];

  const validationSchema = generateValidationSchema(formFields);

  const familyData = useSelector((state) => state.familydata?.data || []);
  useEffect(() => {
    setEditMode(false);
    dispatch(loadFamilyDetailsStart());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoding(false); 
    }, 1000); 
  }, []);

  // Delete family member handler
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteFamilyDetailsStart(id));
      setTimeout(() => {
        dispatch(loadFamilyDetailsStart());
      }, 500);
    }
  };

  // Edit family member handler
  const editHandler = (id) => {
    const user = familyData.find((row) => row.id === id);
    if (user) {
      setEditMode(true);
      setUserInfo(user);
      formik.setValues(user);
      handleOpen();
    }
  };

  // Form submit handler
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createFamilyDetailsStart(values));
      resetForm();
      handleClose();
      setTimeout(() => {
        dispatch(loadFamilyDetailsStart());
      }, 500);
    } else {
      dispatch(updateFamilyDetailsStart({ id: userInfo.id, values }));
      setTimeout(() => {
        dispatch(loadFamilyDetailsStart());
      }, 500);
      resetForm();
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  // Memoize the table component
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={familyData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, familyData, editHandler, deleteHandler]);


  useEffect(() => (
    setInitialFormValue(userInfo)
  ), [userInfo])

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }

  const message = familyData?.length > 0 ? true : false

  return (
    <>

      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1}>
            <Controls.Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Family Details
              </Controls.Typography>
              <Controls.ReusableButton
                startIcon={<Controls.AddIcon sx={{ mb: 1 }} />}
                onClick={() => {
                  handleOpen();
                }}
              />
            </Controls.Box>
          </Controls.ReusablePaper>
          <Controls.Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
              autoComplete="off"
            >
              <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2} sx={{}}>
                <Controls.Grid>
                  <Controls.Box sx={Controls.formBoxStyle}>
                    <Controls.Typography id="modal-modal-title" variant="h1">
                      Family Details
                    </Controls.Typography>
                    <Controls.ResuableFormTextField
                      textFieldLabel="Name"
                      textFieldName="name"
                      textFieldValue={formik.values.name}
                      textFieldOnBlur={formik.handleBlur}
                      textFieldOnChange={formik.handleChange}
                      textFieldError={
                        formik.touched.name && Boolean(formik.errors.name)
                      }
                      textFieldHelperText={
                        formik.touched.name && formik.errors.name ? (<span style={{ color: 'red' }}>{formik.errors.name}</span>) : ('')
                      }
                    />
                    <Controls.ResuableFormTextField
                      textFieldLabel="Email"
                      textFieldName="email"
                      textFieldType="email"
                      textFieldValue={formik.values.email}
                      textFieldOnBlur={formik.handleBlur}
                      textFieldOnChange={formik.handleChange}
                      textFieldError={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      textFieldHelperText={
                        formik.touched.email && formik.errors.email ? (<span style={{ color: 'red' }}>{formik.errors.email}</span>) : ('')
                      }
                    />
                    <Controls.ResuableFormTextField
                      textFieldLabel="Mobile Number"
                      textFieldName="mobile_number"
                      textFieldValue={formik.values.mobile_number}
                      textFieldOnBlur={formik.handleBlur}
                      textFieldOnChange={formik.handleChange}
                      textFieldError={
                        formik.touched.mobile_number &&
                        Boolean(formik.errors.mobile_number)
                      }
                      textFieldHelperText={
                        formik.touched.mobile_number &&
                          formik.errors.mobile_number ? (<span style={{ color: 'red' }}>{formik.errors.mobile_number}</span>) : ('')
                      }
                    />
                    <Controls.ResuableFormTextField
                      textFieldLabel="Relationship"
                      textFieldName="relationship"
                      textFieldValue={formik.values.relationship}
                      textFieldOnBlur={formik.handleBlur}
                      textFieldOnChange={formik.handleChange}
                      textFieldError={
                        formik.touched.relationship &&
                        Boolean(formik.errors.relationship)
                      }
                      textFieldHelperText={
                        formik.touched.relationship && formik.errors.relationship ? (<span style={{ color: 'red' }}>{formik.errors.relationship}</span>) : ('')
                      }
                    />
                    <Controls.ResuableFormTextField
                      textFieldLabel="Address"
                      textFieldName="address"
                      textFieldValue={formik.values.address}
                      textFieldOnBlur={formik.handleBlur}
                      textFieldOnChange={formik.handleChange}
                      textFieldError={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      textFieldHelperText={
                        formik.touched.address && formik.errors.address ? (<span style={{ color: 'red' }}>{formik.errors.address}</span>) : ('')
                      }
                    />
                    <Controls.Typography
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "20px"
                      }}
                    >
                      <Controls.FormAddCloseButton
                        variant="contained"
                        onClick={() => {
                          handleClose();
                        }}
                        buttonText="Close"
                      />
                      <Controls.FormAddCloseButton
                        buttonType="submit"
                        variant="contained"
                        disabled={
                          editMode ? !formik.dirty || !isFormChanged() : false
                        }
                        buttonText={!editMode ? "Add" : "Update"}
                      />
                    </Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
              </Controls.Grid>
            </form>
          </Controls.Modal>
        </Controls.Box>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            {message ? (
              <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
                {memoizedTable}
              </Controls.Paper>
            ) : (
              <NoDataFound />
            )}
          </>
        )}

      </>
    </>
  );
};

export default FamilyDetails;
