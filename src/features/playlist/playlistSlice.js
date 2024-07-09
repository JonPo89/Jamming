import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const savePlaylist = createAsyncThunk(
    "playlist/savePlaylist",
    async ( {accessToken, userId }, {getState} ) => {
        const state = getState();
        const playlistName = state.playlist.playlistName;
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                description: "Created by Jammming",
                public: false
            })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return {
                id: jsonResponse.id,
                snapshot: jsonResponse.snapshot_id,
                
            };
        } else {
            throw new Error("Failed to save playlist");
        }
    }
)

export const addSongsToPlaylist = createAsyncThunk(
    "playlist/addSongsToPlaylist",
    async ( {accessToken}, {getState}) => {
        const state = getState();
        const playlistId = state.playlist.savedPlaylist.id;
        const uris = state.playlist.playlist.map(track => track.uri);
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uris})
        });
        if (response.ok) {
            
            return state.playlist.playlist;

        } else {
            throw new Error("Failed to add songs.")
        }
    }
);

export const removeSongsFromPlaylist = createAsyncThunk(
    "playlist/removeSongsFromPlaylist",
    async ( {accessToken}, {getState} ) => {
        const state = getState();
        const playlistId = state.playlist.savedPlaylist.id;
        const tracks = state.playlist.savedPlaylist.tracks.map(track => ({ uri:track.uri}));
        const snapshotId = state.playlist.savedPlaylist.snapshot;

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tracks,
                snapshot_id: snapshotId,
            })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            throw new Error("Failed to remove songs.")
        }

    }
);

export const updatePlaylistName = createAsyncThunk(
    "playlist/updatePlaylistName",
    async ( {accessToken}, {getState} ) => {
        const state = getState();
        const playlistId = state.playlist.savedPlaylist.id;
        const playlistName = state.playlist.playlistName;

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
            })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            throw new Error("Failed to rename playlist.")
        }
    }
)

const playlistSlice = createSlice({
    name: "playlist",
    initialState: {
        playlistName: "",
        playlist: [],
        savedPlaylist: {
            id: "",
            snapshot: "",
            tracks: []
        },
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setPlaylistName: (state, action) => {
            state.playlistName = action.payload;
        },
        addTrackToPlaylist: (state, action) => {
            state.playlist.push(action.payload);
        },
        removeTrackFromPlaylist: (state, action) => {
            state.playlist = state.playlist.filter((track) => track.UID!== action.payload);
        },
        newPlaylist: (state) => {
            state.savedPlaylist = {
                id: "",
                snapshot: "",
                tracks: []
            };
            state.playlist = [];
            state.playlistName = "";
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(savePlaylist.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
           .addCase(savePlaylist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.savedPlaylist = action.payload;
            })
           .addCase(savePlaylist.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(addSongsToPlaylist.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(addSongsToPlaylist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.savedPlaylist.tracks =action.payload;
            })
            .addCase(addSongsToPlaylist.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(removeSongsFromPlaylist.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(removeSongsFromPlaylist.fulfilled, (state) => {
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(removeSongsFromPlaylist.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
    }
})

export const { setPlaylistName, addTrackToPlaylist, removeTrackFromPlaylist, newPlaylist } = playlistSlice.actions;
export const selectPlaylistSongs = (state) => state.playlist.playlist;
export const selectPlaylistName = (state) => state.playlist.playlistName;
export const selectPlaylistId = (state) => state.playlist.savedPlaylist.id;
export default playlistSlice.reducer;