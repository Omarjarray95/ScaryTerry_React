import GetProject from './GetProject';

export const GetProjectConfig = {
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
            path     : '/projects/get/:id',
            component: GetProject,
            exact: true
        }
    ]
};