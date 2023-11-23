export enum Stats {
    NotStarted,
    InProgress,
    Finished
}

export interface IUser {
    name: string,
    email: string,
    token: string
}

export interface IAuthProps {
    setUser: (user: IUser) => void;
}
