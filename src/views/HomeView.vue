<template>
    <div>
       <div>
        <CreatePost />
       </div>
    </div>
  </template>
  
  <script>
  import  CreatePost from '../components/CreatePost.vue';
  export default {
    name: 'HomeView',
    components:{
      CreatePost
  
    }
  }
  </script>
  