import AddSkills from './AddSkills';

export const AddSkillsConfig = {
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
            path     : '/skills/add',
            component: AddSkills
        }
    ]
};