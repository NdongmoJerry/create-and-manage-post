<template>
  <div>
    <PostList />
   </div>
</template>

<script lang="ts">
import  PostList from '../components/PostList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components:{
      PostList
  
    }

});
</script>
