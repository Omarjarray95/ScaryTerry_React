import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';
import React from 'react';

export const ContractsAppConfig = {
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
            path     : '/contracts',
            component: FuseLoadable({
                loader: () => import('./Products')
            })
        },
    ]
};
