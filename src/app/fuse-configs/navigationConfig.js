const navigationConfig = [
    {
        'id': 'modules',
        'title': 'Browse',
        'type': 'group',
        'icon': 'apps',
        'children': [{
            'id'      : 'users',
            'title'   : 'Users',
            'type'    : 'collapse',
            'icon'    : 'account_box',
            'children': [
                {
                    'id'   : 'add-user',
                    'title': 'Add New User',
                    'type' : 'item',
                    'icon' : 'add_box',
                    'url'  : '/users/add',
                    'exact': true
                },
                {
                    'id'   : 'read-users',
                    'title': 'Consult Users',
                    'type' : 'item',
                    'icon' : 'list',
                    'url'  : '#',
                    'exact': true
                }
            ]
        }]
    },
    {
        'id'      : 'issueshub',
        'title'   : 'Issues HUB',
        'type'    : 'item',
        'icon'    : 'speaker_notes',
        'url'  : '/issueshub',
    }
    ,
    {
        'id'      : 'calendar',
        'title'   : 'My Calendar',
        'type'    : 'item',
        'icon'    : 'access_time',
        'url'  : '/calendar',
    }
    ,
    {
        'type': 'divider',
        'id'  : 'divider-1'
    },
    {
        'id': 'account',
        'title': 'Account',
        'type': 'group',
        'icon': 'apps',
        'children': [{
            'id'   : 'logout',
            'title': 'Logout',
            'type' : 'item',
            'icon' : 'directions_run',
            'url'  : '#'
        }]
    }
];

export default navigationConfig;
