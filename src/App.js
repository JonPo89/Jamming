import React, {useEffect} from 'react';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Login } from './components/Login';
import { Footer } from './components/Footer';
import { selectAccessToken, getAccessToken, getUserDetails} from './features/authorisation/authorisationSlice';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);


  
  useEffect (() => {
    if (!accessToken) {
      dispatch(getAccessToken());
    }
  })

  if (accessToken) {
    dispatch(getUserDetails(accessToken));
  }


  if (!accessToken) {
    return (
    <>
      <Login />
    </>
    )
  }
  
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
