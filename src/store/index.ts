import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router';
import { Post, AppState } from '../store/types';

const BACKEND_URL = 'http://localhost:3000';

const store = createStore<AppState>({
  state: {
    posts: [],
    showDeleteAlert: false,
    showCreateAlert: false,
    selectedPost: {
      id: '',
      image: '',
      selectedTags: [],
      description: '',
      created_at: '',
      updated_at: '',
    },
    allTags: [
      'transport',
      'sports',
      'people',
      'nightlife',
      'nature',
      'food',
      'fashion',
      'city',
      'cats',
      'business',
      'other',
    ],
  },
  getters: {
    sortedPosts: (state) => {
      return state.posts
        .slice()
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    showDeleteAlert: (state) => state.showDeleteAlert,
    showCreateAlert: (state) => state.showCreateAlert,
  },
  mutations: {
    SET_POSTS(state: AppState, posts: Post[]) {
      state.posts = posts;
    },
    SET_SELECTED_POST(state: AppState, post: Post) {
      state.selectedPost = post;
    },
    SET_SELECTED_TAGS(state: AppState, tags: string[]) {
      state.selectedPost.selectedTags = tags;
    },
    REMOVE_DELETED_POST(state: AppState, deletedPostId: string) {
      state.posts = state.posts.filter((post) => post.id !== deletedPostId);
    },
    SET_SHOW_DELETE_ALERT(state: AppState, value: boolean) {
      state.showDeleteAlert = value;
    },
    SET_SHOW_CREATE_ALERT(state: AppState, value: boolean) {
      state.showCreateAlert = value;
    },
  },
  actions: {
    fetchPosts({ commit }): Promise<Post[]> {
      return axios
        .get<Post[]>(`${BACKEND_URL}/posts`)
        .then((response) => {
          console.log('Posts:', response.data);
          commit('SET_POSTS', response.data);
          return response.data;
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          throw error;
        });
    },
    fetchPost({ commit }, postId: string): void {
      axios
        .get(`${BACKEND_URL}/posts/${postId}`)
        .then((response) => {
          commit('SET_SELECTED_POST', response.data);
          commit('SET_SELECTED_TAGS', response.data.tags);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    },
    updatePost({ state }, postId: string): void {
      const updatedPost: Post = {
        ...state.selectedPost, // Spread the selectedPost object
        updated_at: new Date().toISOString(),
      };

      axios
        .put(`${BACKEND_URL}/posts/${postId}`, updatedPost)
        .then((response) => {
          console.log('Post updated:', response.data);
          router.push('/post-list');
        })
        .catch((error) => {
          console.error('Error updating post:', error);
        });
    },
    deletePost({ commit }, postId: string): Promise<void> {
      return axios
        .delete(`${BACKEND_URL}/posts/${postId}`)
        .then(() => {
          console.log('Post deleted successfully');
          commit('REMOVE_DELETED_POST', postId);
          commit('SET_SHOW_DELETE_ALERT', true);
          setTimeout(() => {
            commit('SET_SHOW_DELETE_ALERT', false);
          }, 3000);
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          throw error;
        });
    },
    savePost({ commit }, post: Post): Promise<void> {
      const newPost: Post = {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      return axios
        .post(`${BACKEND_URL}/posts`, newPost)
        .then((response) => {
          console.log('Post created:', response.data);
          router.push('/post-list');
          commit('SET_SHOW_CREATE_ALERT', true);
          setTimeout(() => {
            commit('SET_SHOW_CREATE_ALERT', false);
          }, 3000);
        })
        .catch((error) => {
          console.error('Error creating post:', error);
          throw error;
        });
    },
  },
});

export default store;