import axios from "axios";
import FuseUtils from '@fuse/FuseUtils';

class projectsService extends FuseUtils.EventEmitter
{
    createProject = (data) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/projects/addproject', data)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    getProjects = () =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/projects/getprojects')
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    getProject = (id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/projects/getproject/' + id)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    affectTeam = (data, id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/projects/affectteam/' + id, data)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    addSprint = (data, id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/sprints/addsprint/' + id, data)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    deleteSprint = (sprint, project) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/sprints/deletesprint/' + sprint + '/' + project)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    getProductBacklog = (id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/productBacklogs/getproductbacklog/' + id)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    getSprintBacklog = (id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/userstories/getsprintbacklog/' + id)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    addItem = (data, id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/items/additem/' + id, data)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    deleteItem = (item, productBacklog) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/items/deleteitem/' + item + '/' + productBacklog)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    getItemsByState = (id, state) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/userstories/getitemsbystate/' + id + '/' + state)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    addUserStory = (data, id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/userstories/adduserstory/' + id, data)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    updateUserStory = (data, id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/userstories/updateuserstory/' + id, data)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    updateUserStoryState = (id, state) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/userstories/updatestate/' + id + '/' + state)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    getSprintProject = (id) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/projects/getsprintproject/' + id)
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    checkTitle = (title) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/projects/checktitle', {title: title})
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        var res = { status: true, message: response.data };
                        resolve(res);
                    }
                    else
                    {
                        res = { status: false, message: response.data };
                        reject(res);
                    }
                });
        });
    };
}

const instance = new projectsService();

export default instance;