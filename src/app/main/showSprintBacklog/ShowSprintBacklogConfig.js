import ShowSprintBacklog from "./board/Board";

export const ShowSprintBacklogConfig = {
    settings: {
        layout: {
            config: {
                footer        : {
                    display: false
                },
                navbar        : {
                    folded: true
                }
            }
        }
    },
    routes  : [
        {
            path     : '/projects/get/sprint/sprintbacklog/:id',
            component: ShowSprintBacklog,
            exact: true
        }
    ]
};
