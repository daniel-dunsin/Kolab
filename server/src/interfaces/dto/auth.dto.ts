export interface CreateAccountDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface EditProfileDTO {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}
