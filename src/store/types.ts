export interface Post {
  id: string;
  image: string;
  tags: string[];
  selectedTags: string[];
  description: string;
  created_at: string;
  updated_at: string; 
}
  
  export interface AppState {
    posts: Post[];
    showDeleteAlert: boolean;
    showCreateAlert: boolean;
    selectedPost: Post;
    allTags: string[];
  }
 