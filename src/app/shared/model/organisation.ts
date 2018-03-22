import {User} from './user';

export class Organisation {
    name: string;
    email: string;

    users: User[];
    joinRequestQueue: User[];
}
