import {FuseLoadable} from '@fuse';

export const AnalyticsDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/dashboards/analytics/:id',
            component: FuseLoadable({
                loader: () => import('./AnalyticsDashboardApp')
            })
        }
    ]
};
