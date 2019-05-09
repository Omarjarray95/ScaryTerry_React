import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';
import React from 'react';

export const TestAppConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    
    routes  : [
        {
            path    :'/test/result/:app',
            component: FuseLoadable({
                loader: ()=> import('./testResult')
            })
        },
        {
            path     : '/test/:app',
            component: FuseLoadable({
                loader: () => import('./test')
            })
        },
        
    ]
};
