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

  const copyEmail = () => {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText("jonporter89@gmail.com").then(() => {
            alert("Email copied to clipboard.");
        }).catch(err => {
            console.error("Failed to copy email:", err);
            alert("Failed to copy email. Please try again.");
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = "jonporter89@gmail.com";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            alert("Email copied to clipboard.");
        } catch (err) {
            console.error("Fallback: Failed to copy email:", err);
            alert("Failed to copy email. Please try again.");
        }

        document.body.removeChild(textArea);
    }
  }


  
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
      ) : <h2 id="noUser">Unfortunately you are not currently authorised. <br/> Please contact <span id="emailLink" onClick={copyEmail}>jonporter89@gmail.com</span>.</h2>}

    </div>
  );
}

export default App;
