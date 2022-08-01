export interface Post {
  kind: string;
  items: PostItem[];
  etag: string;
}

export interface PostItem {
  kind: string;
  id: string;
  blog: Blog;
  published: string;
  updated: string;
  url: string;
  selfLink: string;
  title: string;
  content: string;
  author: Author;
  replies: Replies;
  labels: string[];
  location?: Location;
  etag: string;
}

interface Location {
  name: string;
  lat: number;
  lng: number;
  span: string;
}

interface Replies {
  totalItems: string;
  selfLink: string;
}

interface Author {
  id: string;
  displayName: string;
  url: string;
  image: Image;
}

interface Image {
  url: string;
}

interface Blog {
  id: string;
}