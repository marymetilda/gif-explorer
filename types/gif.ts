export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
      width: string;
      height: string;
    };
    original: {
      url: string;
      width: string;
      height: string;
    };
  };
  user?: {
    avatar_url?: string;
    username?: string;
    display_name?: string;
  };
}
