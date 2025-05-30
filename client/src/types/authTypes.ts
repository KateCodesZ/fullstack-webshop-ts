export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export type AuthUser = {
  id: number;
  email: string;
  is_admin: boolean;
};
