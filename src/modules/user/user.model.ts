export interface IUser {
    readonly id: number,
    name: string,
    email: string,
    password: string,
    telephone: string
}

export interface IUserDetail extends IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    telephone: string
}

export function createUser({id, name, email, password, telephone}: any): IUser {
    return {
        id, name, email, password, telephone
    }
}

export function createUsers(data: any[]): IUser[] {
    return data.map(createUser);
}

export function createUserById({id, name, email, password, telephone}: any): IUserDetail {
    return {
        id, name, email, password, telephone
    };
}

export function createUserByEmail({id, name, email, password, telephone}: any): IUserDetail {
    return {
        id, name, email, password, telephone
    };
}