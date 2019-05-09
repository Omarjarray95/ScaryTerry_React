const navigationConfig = [
    {
        'id': 'modules',
        'title': 'Browse',
        'type': 'group',
        'icon': 'apps',
        'children': [{
            'id': 'users',
            'title': 'Users',
            'type': 'collapse',
            'icon': 'account_box',
            'children': [
                {
                    'id': 'add-user',
                    'title': 'Add New User',
                    'type': 'item',
                    'icon': 'add_box',
                    'url': '/users/add',
                    'exact': true
                },
                {
                    'id': 'read-users',
                    'title': 'Consult Users',

                    'type': 'item',
                    'icon': 'list',
                    'url': '/users/get',

                    'exact': true
                }
            ]
        },

        {
            'id': 'projects',
            'title': 'Projects',
            'type': 'collapse',
            'icon': 'apps',
            'children': [
                {
                    'id': 'add-project',
                    'title': 'Add New Project',
                    'type': 'item',
                    'icon': 'add_box',
                    'url': '/projects/add',
                    'exact': true
                },
                {
                    'id': 'get-projects',
                    'title': 'My Projects',
                    'type': 'item',
                    'icon': 'list',
                    'url': '/projects/get',
                    'exact': true
                }
            ]
        },
        {
            'id': 'skills',
            'title': 'Skills',
            'type': 'collapse',
            'icon': 'gavel',
            'children': [
                {
                    'id': 'add-skill',
                    'title': 'Add New Skill',
                    'type': 'item',
                    'icon': 'add_box',
                    'url': '/skills/add',
                    'exact': true
                },
                {
                    'id': 'get-skills',
                    'title': 'Manage Skills',
                    'type': 'item',
                    'icon': 'list',
                    'url': '/skills/get',
                    'exact': true
                }
            ]
        },
        {
            'id': 'dashboards',
            'title': 'Dashboards',
            'type': 'collapse',
            'icon': 'dashboard',
            'children': [
                {
                    'id': 'analytics-dashboard',
                    'title': 'Analytics',
                    'type': 'item',
                    'url': '/apps/dashboards/analytics'
                }
            ]
        }]
    },
    {
        'id': 'issueshub',
        'title': 'Issues HUB',
        'type': 'item',
        'icon': 'speaker_notes',
        'url': '/issueshub',
    }
    ,
    {
        'id': 'calendar',
        'title': 'My Calendar',
        'type': 'item',
        'icon': 'access_time',
        'url': '/calendar',
    }
    ,
    {
        'type': 'divider',
        'id': 'divider-1'
    },
    {
        'id': 'account',
        'title': 'Account',
        'type': 'group',
        'icon': 'apps',
        'children': [{
            'id': 'logout',
            'title': 'Logout',
            'type': 'item',
            'icon': 'directions_run',
            'url': '#'
        }]
    }
];

export default navigationConfig;
