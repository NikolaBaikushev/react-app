export type LoginUserPaylod = {
    username: string,
    password: string
}

export type LoginUserResponse = {
    id: number,
    username: string
    email : string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    accessToken: string,
    refreshToken: string,
}

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
};
