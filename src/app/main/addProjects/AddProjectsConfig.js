import AddProjects from './AddProjects';

export const AddProjectsConfig = {
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
            path     : '/projects/add',
            component: AddProjects
        }
    ]
};