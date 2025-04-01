export interface Frontmatter {
  title: string;
  layout: string;
  publishDate: string;
  image: string;
  description: string;
  tags: string[];
}

export type BlogPost = {
  frontmatter: Frontmatter;
  url: string;
  file: string;
  Content: any;
  [key: string]: any;
};

export interface PostsByDate {
  [key: string]: {
    label: string;
    posts: BlogPost[];
  };
}

export interface PostsByTag {
  [key: string]: BlogPost[];
}