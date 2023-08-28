export interface IUserRequestData {
    name: string;
    email: string;
    password: string;
}

export interface IUserData extends IUserRequestData {
    _id: string;
}