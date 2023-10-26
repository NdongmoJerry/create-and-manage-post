import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

const store = createStore({
  state: {
    //state for Postlist
    posts: [],
    //state for CreatePost
    post: {
      image: "",
      tags: [
        "transport",
        "sports",
        "people",
        "nightlife",
        "nature",
        "food",
        "fashion",
        "city",
        "cats",
        "business",
        "other",
      ],
      selectedTags: [],
      description: "",
    },
  },
 
  actions: {
    fetchPosts({ state }) {
      return axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          console.log("Posts:", response.data);
          state.posts = response.data.reverse();
          return response.data; // Return the fetched posts
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          throw error; // Rethrow the error to be caught in the component
        });
    },

    savePost({ state }) {
      const post = {
        image: state.post.image,
        tags: state.post.selectedTags,
        description: state.post.description,
      };

      axios
        .post("http://localhost:3000/posts", post)
        .then((response) => {
          console.log("Post created:", response.data);
        // Reset the form data
        state.post.image = "";
        state.post.selectedTags = [];
        state.post.description = "";
          router.push("/post-list");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    },
  },
});

export default store;