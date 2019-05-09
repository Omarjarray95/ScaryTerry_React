import GetSkills from './GetSkills';

export const GetSkillsConfig = {
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
            path     : '/skills/get',
            component: GetSkills,
            exact: true
        }
    ]
};