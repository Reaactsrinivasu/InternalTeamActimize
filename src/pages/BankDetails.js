
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  loadBankDetailsStart } from '../redux/actions/bankDetailsActions';
import Controls from "../components/Controls";
import theme from "../Theme"; // Import your theme file
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';

const BankDetails = () => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null)
  const [checkId, setCheckId] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setId(localStorage.getItem('id'));
    setCheckId(true);
  })
  const bankData = useSelector((state) => state.bankdata?.data?.data[0] || '' );
  useEffect(() => {
      if (checkId) {
        dispatch(loadBankDetailsStart(id));
      }
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  })
  const message = bankData === '' ? true : false; 

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
          { !message ? (
            <>
              <Controls.Grid container item xs={12} sx={{ marginTop: '30px', justifyContent: 'center' }}>
                <Controls.Grid container xs={8} sx={{ justifyContent: 'center' }} >
                  <Controls.Grid item xs={8} sx={{
                    backgroundColor: theme.palette.success.main, borderRadius: '10px', margin: '25px 25px 0px 0px', padding: '5px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    border: '2px solid', borderColor: theme.palette.customColorOrange.main,
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


