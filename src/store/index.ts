import { defineStore, createPinia } from 'pinia';
import axios from 'axios';
import  router  from '../router';
import { Post, AppState } from '../store/types';

const BACKEND_URL = 'http://localhost:3000';

export const useStore = defineStore('store', {
  state: (): AppState => ({
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
  }),

  getters: {
    sortedPosts(state: AppState): Post[] {
      return state.posts
        .slice()
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
  },

  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get<Post[]>(`${BACKEND_URL}/posts`);
        console.log('Posts:', response.data);
        this.posts = response.data;
        return response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
    },

    async fetchPost(postId: string) {
      try {
        const response = await axios.get(`${BACKEND_URL}/posts/${postId}`);
        this.selectedPost = {
          ...response.data,
          tags: response.data.tags,
        };
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },

    async updatePost(postId: number) {
      const updatedPost: Post = {
        id: postId,
        image: this.selectedPost.image,
        tags: this.selectedPost.tags,
        description: this.selectedPost.description,
        created_at: this.selectedPost.created_at,
        updated_at: new Date().toISOString(),
      };
    
      try {
        const response = await axios.put(`${BACKEND_URL}/posts/${postId}`, updatedPost);
        console.log('Post updated successfully:', response.data);
        router.push('/post-list');    // Redirect to the PostList page
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    async deletePost(postId: string) {
      try {
        await axios.delete(`${BACKEND_URL}/posts/${postId}`);
        console.log('Post deleted successfully');
        this.posts = this.posts.filter((post) => post.id.toString() !== postId);
        this.showDeleteAlert = true;
        setTimeout(() => {
          this.showDeleteAlert = false;
        }, 3000);
      } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
      }
    },

    async savePost(post: Post) {
      const newPost: Post = {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    
      try {
        const response = await axios.post(`${BACKEND_URL}/posts`, newPost);
        console.log('Post created successfully:', response.data);
        router.push('/post-list'); // Redirect to the PostList page
        this.showCreateAlert = true;
        setTimeout(() => {
          this.showCreateAlert = false;
        }, 3000);
      } catch (error) {
        console.error('Error creating post:', error);
        throw error;
      }
    }
  },
});
export const pinia = createPinia();
export default pinia;