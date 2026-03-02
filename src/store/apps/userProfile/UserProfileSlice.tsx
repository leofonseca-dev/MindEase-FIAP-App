import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';

interface StateType {
  posts: any[];
  followers: any[];
  gallery: any[];
}

const initialState = {
  posts: [],
  followers: [],
  gallery: []
};

export const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getFollowers: (state, action) => {
      state.followers = action.payload;
    },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
    onToggleFollow(state: StateType, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }

        return follower;
      });

      state.followers = handleToggle;
    }
  }
});

export const { getPosts, getFollowers, onToggleFollow, getPhotos } = UserProfileSlice.actions;

export default UserProfileSlice.reducer;
