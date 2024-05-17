
const code = new URLSearchParams(window.location.search).get('code');
const clientSecret = "c5cb7c4f7a654333b84cd833b9db2e9e";
const clientId = "61e18bba3548432886c834ad9f732266";
//redirect_uri is the url that will be our website
const redirect_uri = "http://localhost:3000/";

const getAccessToken = async () => {

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
          
        });
        console.log(response);
    
        if (response.ok) {

          const jsonResponse = await response.json();
          const accessToken = jsonResponse.access_token;

          
          return accessToken;
        }
    
    } catch (error) {
        console.log(error);
        // Handle the error appropriately
      }
};



export default getAccessToken;
