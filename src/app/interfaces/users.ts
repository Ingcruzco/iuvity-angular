export interface User {
    _id:         string;
    name:        string;
    lastName:    string; 
    email:       string; 
    phoneNumber: number | undefined; 
    cc:          number | undefined;
    __v:         number;
}

export type UserForm = Omit<User, "__v" | "_id">;
