export interface Album {
  id: string;
  title: string;
  userId: string;
  username: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export interface Photo {
  albumId: string;
  id: string;
  title: string;
  url: string;
}