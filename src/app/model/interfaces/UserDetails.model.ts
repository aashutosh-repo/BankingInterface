export interface UserRequest{
    username: string
    password: string
}
export interface UserResponse {
    token: string;
    userName: string;
    firstName: string;
    lastName: string;
    lastLogin: string;
    expiryTime: string;
}

export interface IUserDTO{
    errorId:string
    message:string
    userId:string
    userName: string
    firstName: string
    lastName: string
    email: string
    lastLogin: string | Date
}