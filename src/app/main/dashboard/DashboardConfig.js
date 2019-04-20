import Dashboard from './Dashboard';

export const DashboardConfig = {
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
            path     : '/home',
            component: Dashboard
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboard',
            component: FuseLoadable({
                loader: () => import('./Example')
            })
        }
    ]
};
*/
