export interface Post {
  id: number;
  image: string;
  tags: string[];
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