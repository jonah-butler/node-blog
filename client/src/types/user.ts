export interface User {
  email: string;
  profileImageLocation: string;
  username: string;
  _id: string;
}

export interface UserStore {
  token: string;
  user: User;
}
