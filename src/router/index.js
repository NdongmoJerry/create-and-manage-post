import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostList from '../components/PostList.vue';
import CreatePost from '../components/CreatePost.vue';
import EditPost from '../components/EditPost.vue';
import DeletePost from '../components/ DeletePost.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
    path: '/edit-post/:id', 
    name: 'edit-post',
    component: EditPost,
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