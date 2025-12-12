export interface ContentCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    icon: string | null;
    type: 'mission' | 'community' | 'blog' | 'story';
    order_index: number;
    created_at: string;
  }
  
  export interface ContentItem {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string;
    featured_image: string | null;
    category_id: string;
    author_name: string;
    is_published: boolean;
    published_at: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Admin {
    id: string;
    user_id: string;
    email: string;
    role: 'admin' | 'editor';
    created_at: string;
  }
  