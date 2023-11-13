export interface Post {
  id?: number;
  image: string;
  tags: string[];
  description: string;
  created_at?: string;
  updated_at?: string;
}
