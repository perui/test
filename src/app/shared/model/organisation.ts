import {User} from './user';

export class Organisation {
    name: string;
    email: string;

    members: User[];
    joinRequestQueue: User[];
}
