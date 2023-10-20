import { MessageResponse } from '../api/response.types';


export interface Signin {
  login: string
  password: string
}

export interface Signup extends Signin {
  passwordConfirm: string
}

export interface AuthResponse extends MessageResponse {
  jwt: string;
}

export interface UserResponse {
  id: number;
  login: string;
}
