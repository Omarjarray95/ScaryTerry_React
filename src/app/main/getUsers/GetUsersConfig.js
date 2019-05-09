import GetUsers from './GetUsers';

export const GetUsersConfig = {
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
            path     : '/users/get',
            component: GetUsers,
            exact: true
        }
    ]
};