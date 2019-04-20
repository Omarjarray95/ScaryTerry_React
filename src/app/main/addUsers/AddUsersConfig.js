import AddUsers from './AddUsers';

export const AddUsersConfig = {
    settings: {
        layout: {
            config: {
                footer        : {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/users/add',
            component: AddUsers
        }
    ]
};