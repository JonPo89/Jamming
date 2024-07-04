import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const clientId = process.env.REACT_APP_CLIENT_ID;

const redirectUri = "http://localhost:3000/";
const code = new URLSearchParams(window.location.search).get('code');
const scope = [
    "user-read-email",
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-private",
    "user-read-private",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state"
];



export const getAccessToken = createAsyncThunk(
    "authorisation/getAccessToken",
    async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
            }
        });
        
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.access_token;
        } else {
            throw new Error("Failed to get access token");
        }
    }
)

export const getUserDetails = createAsyncThunk(
    "authorisation/getUserDetails",
    async ( accessToken ) => {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                userName: jsonResponse.display_name,
                userId: jsonResponse.id
        }
    }}
)

const authorisationSlice = createSlice({
    name: 'authorisation',
    initialState: {
        loginLink: `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope.join("%20")}`,
        accessToken: "",
        userDetails: {},
        isLoggedIn: false,
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
           .addCase(getAccessToken.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.hasError = false;
                state.isLoading = false;
                state.accessToken = action.payload
            })
            .addCase(getAccessToken.pending, (state) => {
                state.isLoggedIn = false;
                state.hasError = false;
                state.isLoading = true
            })
            .addCase(getAccessToken.rejected, (state) => {
                state.isLoggedIn = false;
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(getUserDetails.rejected, (state) => {
                state.hasError = true;
                state.isLoading = false;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.hasError = false;
                state.isLoading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.hasError = false;
                state.isLoading = false;
                state.userDetails = action.payload;
            })

    }
})

export const selectAccessToken = (state) => state.authorisation.accessToken;
export const selectUserName = (state) => state.authorisation.userDetails.userName;
export const selectUserId = (state) => state.authorisation.userDetails.userId;
export const selectLogin = (state) => state.authorisation.loginLink;
export default authorisationSlice.reducer;
