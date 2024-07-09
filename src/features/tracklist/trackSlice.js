import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://api.spotify.com/v1/search?";
export const getTracks = createAsyncThunk(
    "search/getTracks",
    async ( {accessToken, searchTerm} ) => {
        const response = await fetch(`${url}q=${searchTerm}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            let tracks = jsonResponse.tracks.items.map ( track => {
                return {
                    id: track.id,
                    songName: track.name,
                    songArtists: track.artists.map(artist => artist.name),
                    album: track.album.name,
                    albumArt: track.album.images,
                    uri: track.uri,

                }
            });
            return tracks;
        } else {
            throw new Error('Failed to fetch tracks');
        }
    }

)

const trackSlice = createSlice({
    name: "track",
    initialState: {
        results: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        clearSearch: (state) => {
            state.results = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTracks.pending, (state) => {
                state.isLoading = true;
                state.hasError = false
            })
            .addCase(getTracks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.results = action.payload;
            })
            .addCase(getTracks.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }

});

export const { clearSearch, updatedAdded } = trackSlice.actions;
export const selectTracks = (state) => state.track.results;
export default trackSlice.reducer;