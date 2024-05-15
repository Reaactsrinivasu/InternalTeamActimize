
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { createBankDetailsStart, loadBankDetailsStart } from '../redux/actions/bankDetailsActions';
import Controls from "../components/Controls";
import { initialValues, generateValidationSchema } from "../components/Validations";
import theme from "../Theme"; // Import your theme file
import { Typography } from '@mui/material';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';

const BankDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [ loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  const formFields = ["bank_name", "account_number", "ifsc_code", "branch_name"];
  const validationSchema = generateValidationSchema(formFields);

  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createBankDetailsStart(values));
      toast.success('Data Added Successfully');
    } else {
      dispatch(createBankDetailsStart(values));
      toast.success('Data Updated Successfully');
    }
    resetForm();
    setEditMode(false);
    dispatch(loadBankDetailsStart());
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const bankData = useSelector((state) => state.bankdata?.data || '');
  useEffect(() => {
    dispatch(loadBankDetailsStart());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
        setLoading(false)
    },1000)
  })

  useEffect(() => {
    if (bankData) {
      setEditMode(true);
      formik.setValues(bankData);
    }
  }, [bankData]);

  const message = bankData?.message

  return (

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
              Bank Details
            </Controls.Typography>
          </Controls.Box>
        </Controls.ReusablePaper>
      </Controls.Box>

        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            { message !== "No records found" ? (
        <>
        <Controls.Grid container item xs={12} sx={{  marginTop: '30px', justifyContent: 'center' }}>
         <Controls.Grid container xs={8} sx={{ justifyContent:'center'}} >
           <Controls.Grid item xs={8} sx={{
             backgroundColor: theme.palette.success.main, borderRadius: '10px', margin: '25px 25px 0px 0px', padding: '5px',
             boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
             transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
             border:'2px solid', borderColor:theme.palette.customColorOrange.main,
           }} >
             <Controls.Grid container item xs={12} md={8} sx={{ marginLeft: '30px' }}>
               <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                 <Controls.Grid item xs={12} sx={{ display: 'flex' }}>
                   <Controls.Grid item xs={7} sx={{ display: 'flex' }}>
                     <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Name Of The Bank</Controls.Typography>
                     <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                   </Controls.Grid>
                   <Controls.Grid item xs={5} sx={{ paddingLeft: '30px' }}>
                     <Controls.Typography variant='subtitle2'>{bankData.bank_name}  </Controls.Typography>

                   </Controls.Grid>
                 </Controls.Grid>
               </Controls.Grid>
               <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                 <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                   <Controls.Grid item xs={7} sx={{ display: 'flex' }}>
                     <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Account Number </Controls.Typography>
                     <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                   </Controls.Grid>
                   <Controls.Grid item xs={5} sx={{ paddingLeft: '30px' }}>
                     <Controls.Typography variant='subtitle2'>{bankData.account_number}  </Controls.Typography>

                   </Controls.Grid>
                 </Controls.Grid>
               </Controls.Grid>
               <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                 <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                   <Controls.Grid item xs={7} sx={{ display: 'flex' }}>
                     <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>IFSC Code </Controls.Typography>
                     <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                   </Controls.Grid>
                   <Controls.Grid item xs={5} sx={{ paddingLeft: '30px' }}>
                     <Controls.Typography variant='subtitle2'> {bankData.ifsc_code}  </Controls.Typography>

                   </Controls.Grid>
                 </Controls.Grid>
               </Controls.Grid>
               <Controls.Grid container item sx={{ justifyContent: 'center', padding: '10px 0px', }}>
                 <Controls.Grid item xs={12} sx={{ display: 'flex', }}>
                   <Controls.Grid item xs={7} sx={{ display: 'flex' }}>
                     <Controls.Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Branch Name </Controls.Typography>
                     <Controls.Typography variant='subtitle1' sx={{ marginLeft: 'auto', fontWeight: 'bold' }}>:</Controls.Typography>

                   </Controls.Grid>
                   <Controls.Grid item xs={5} sx={{ paddingLeft: '30px' }}>
                     <Controls.Typography variant='subtitle2'>{bankData.branch_name} </Controls.Typography>

                   </Controls.Grid>
                 </Controls.Grid>
               </Controls.Grid>
             </Controls.Grid>
           </Controls.Grid>
         
         </Controls.Grid>
         </Controls.Grid>
     </>
      ) : (
       
        <>
        <NoDataFound />
        </>
      )}
          </>
        )}

      

        </>

      );
};

      export default BankDetails;


