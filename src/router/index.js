import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostList from '../components/PostList.vue';
import CreatePost from '../components/CreatePost.vue';
import EditPost from '../components/EditPost.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/post-list',
    name: 'post-list',
    component: PostList,
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePost,
  },
  {
    path: '/edit-post/:id', // Corrected the path
    name: 'edit-post',
    component: EditPost,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;