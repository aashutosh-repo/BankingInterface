export interface UserRequest{
    username: string
    password: string
}

export interface IUserDTO{
    userName: string
    firstName: string
    lastName: string
    email: string
    lastLogin: string | Date
}