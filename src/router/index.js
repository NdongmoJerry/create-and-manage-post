import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostList from '../components/PostList.vue';
import CreatePost from '../components/CreatePost.vue';
import UpdatePost from '../components/UpdatePost.vue';
import DeletePost from '../components/DeletePost.vue';

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
    path: '/update-post/:id', // Corrected the path
    name: 'update-post',
    component: UpdatePost,
  },
  {
    path: '/delete-post/:id',
    name: 'delete-post',
    component: DeletePost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;