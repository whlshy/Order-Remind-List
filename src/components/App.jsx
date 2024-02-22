import React, { useEffect } from "react";
import Snackbar from "./elements/snackbar/Snackbar"
import Main from "./Main"
import Alert from "./elements/alert/Alert"
import Dialog from './elements/dialog/Dialog'
const App = () => {

  return (
    <>
      <Main />
      <Alert />
      <Snackbar />
      <Dialog />
    </>
  );
};

export default App;