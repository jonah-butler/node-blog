export interface User {
  createdAt: string;
  email: string;
  password: string;
  posts: string[];
  profileImageKey: string;
  profileImageLocation: string;
  profileImageTag: string;
  tokens: UserToken[];
  updatedAt: string;
  username: string;
  _id: string;
}

export interface UserStore {
  token: string;
  user: User;
}

interface UserToken {
  _id: string;
  token: string;
}
