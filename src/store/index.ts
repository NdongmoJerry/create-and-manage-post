import { reactive, computed } from 'vue';
import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router';
import { Post, AppState } from '../store/types';

const BACKEND_URL = 'http://localhost:3000';

const initialState: AppState = {
  posts: [],
  showDeleteAlert: false,
  showCreateAlert: false,
  selectedPost: {
    id: 0,
    image: '',
    tags: [],
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
};

const state = reactive(initialState);

const sortedPosts = computed<Post[]>(() => {
  return state.posts
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
});

const mutations = {
  SET_POSTS(state: AppState, posts: Post[]) {
    state.posts = posts;
  },
  SET_SELECTED_POST(state: AppState, post: Post) {
    state.selectedPost = post;
  },
  SET_SELECTED_TAGS(state: AppState, tags: string[]) {
    state.selectedPost.tags = tags;
  },
  REMOVE_DELETED_POST(state: AppState, deletedPostId: number) {
    state.posts = state.posts.filter((post) => post.id !== deletedPostId);
  },
  SET_SHOW_DELETE_ALERT(state: AppState, value: boolean) {
    state.showDeleteAlert = value;
  },
  SET_SHOW_CREATE_ALERT(state: AppState, value: boolean) {
    state.showCreateAlert = value;
  },
};
const actions = {
  async fetchPosts({ commit }: { commit: Function }) {
    try {
      const response = await axios.get<Post[]>(`${BACKEND_URL}/posts`);
      console.log('Posts:', response.data);
      commit('SET_POSTS', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  async fetchPost({ commit }: { commit: Function }, postId: string) {
    try {
      const response = await axios.get(`${BACKEND_URL}/posts/${postId}`);
      commit('SET_SELECTED_POST', response.data);
      commit('SET_SELECTED_TAGS', response.data.tags);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  },
  async updatePost({ state }: { state: AppState }, postId: number) {
    const updatedPost: Post = {
      id: postId,
      image: state.selectedPost.image,
      tags: state.selectedPost.tags,
      description: state.selectedPost.description,
      created_at: state.selectedPost.created_at,
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await axios.put(`${BACKEND_URL}/posts/${postId}`, updatedPost);
      console.log('Post updated:', response.data);
      router.push('/post-list');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  },
  async deletePost({ commit }: { commit: Function }, postId: string) {
    try {
      await axios.delete(`${BACKEND_URL}/posts/${postId}`);
      console.log('Post deleted successfully');
      commit('REMOVE_DELETED_POST', postId);
      commit('SET_SHOW_DELETE_ALERT', true);
      setTimeout(() => {
        commit('SET_SHOW_DELETE_ALERT', false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },
  async savePost({ commit }: { commit: Function }, post: Post) {
    const newPost: Post = {
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/posts`, newPost);
      console.log('Post created:', response.data);
      router.push('/post-list');
      commit('SET_SHOW_CREATE_ALERT', true);
      setTimeout(() => {
        commit('SET_SHOW_CREATE_ALERT', false);
      }, 3000);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
};
const getters = {
  sortedPosts(state: AppState) {
    return sortedPosts.value;
  },
  showDeleteAlert(state: AppState) {
    return state.showDeleteAlert;
  },
  showCreateAlert(state: AppState) {
    return state.showCreateAlert;
  },
};
export default createStore({
  state,
  mutations,
  actions,
  getters,
});
export default store;
