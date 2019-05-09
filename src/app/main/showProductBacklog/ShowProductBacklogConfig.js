import ShowProductBacklog from './ShowProductBacklog';

export const ShowProductBacklogConfig = {
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
            path     : '/projects/get/productbacklog/:id',
            component: ShowProductBacklog,
            exact: true
        }
    ]
};