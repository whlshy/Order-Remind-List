import React, { Fragment, useEffect } from 'react'
import { Button } from '@mui/material'
import Config from 'Config'
const { apiurl } = Config

export default function Login(props) {
  const { state } = props

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={() => window.location.href = `${apiurl}/api/Auth/login?state=${state}&sso=wkesso`}
        sx={{ width: "300px" }}
        color='info'
        autoFocus
      >
        {/* <div style={{ backgroundImage: `url(${wkeimg})` }}></div> */}
        WKE SSO
      </Button>
    </Fragment>
  )
}
