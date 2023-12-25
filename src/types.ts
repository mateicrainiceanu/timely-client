export enum Stats {
    NotStarted,
    InProgress,
    Finished
}

// Utility function to convert string to enum value
export function getEnumValueFromString(str: string): Stats | undefined {
    switch (str.toLowerCase()) {
        case 'notstarted':
            return Stats.NotStarted;
        case 'inprogress':
            return Stats.InProgress;
        case 'finished':
            return Stats.Finished;
        default:
            return undefined;
    }
}

// Utility function to convert enum value to string
export function getStringFromEnumValue(status: Stats): string {
    switch (status) {
        case Stats.NotStarted:
            return 'notstarted';
        case Stats.InProgress:
            return 'inprogress';
        case Stats.Finished:
            return 'finished';
    }
}

export const statusStrings = ["notstarted", "inprogress", "finished"];

export interface IUser {
    name: string,
    email: string,
    token: string
}

export interface IAuthProps {
    setUser: (user: IUser) => void;
}

export interface ITask {
    id: number;
    name: string;
    status: string;
    startDate: Date;
    duration: string;
    showKey: number;
}