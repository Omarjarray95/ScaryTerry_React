import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const TodoAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/issueshub/label/:labelHandle/:todoId?',
            component: FuseLoadable({
                loader: () => import('./TodoApp')
            })
        },
        {
            path     : '/issueshub/filter/:filterHandle/:todoId?',
            component: FuseLoadable({
                loader: () => import('./TodoApp')
            })
        },
        {
            path     : '/issueshub/:folderHandle/:todoId?',
            component: FuseLoadable({
                loader: () => import('./TodoApp')
            })
        },
        {
            path     : '/issueshub',
            component: () => <Redirect to="/issueshub/all"/>
        }
    ]
};
