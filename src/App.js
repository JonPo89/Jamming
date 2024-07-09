import React, {useEffect} from 'react';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Login } from './components/Login';
import { Footer } from './components/Footer';
import { selectAccessToken, getAccessToken, getUserDetails, selectUserId} from './features/authorisation/authorisationSlice';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const userId = useSelector(selectUserId);


  
  useEffect (() => {
    if (!accessToken) {
      dispatch(getAccessToken());
    } else {
      dispatch(getUserDetails(accessToken));
    }
  }, [accessToken, dispatch]);


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
      {userId ? (
        <>
          <Body />
          <Footer />
        </>
      ) : <h2 id="noUser">Unfortunately you are not currently authorised. <br/> Please contact jonporter89@gmail.com.</h2>}

    </div>
  );
}

export default App;
