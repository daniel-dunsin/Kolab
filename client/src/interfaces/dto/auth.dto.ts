export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignUpDTO {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface EditProfileDTO {
  firstName: string;
  lastName: string;
  profilePicture?: File | string;
}
