import GetProjects from './GetProjects';

export const GetProjectsConfig = {
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
            path     : '/projects/get',
            component: GetProjects,
            exact: true
        }
    ]
};