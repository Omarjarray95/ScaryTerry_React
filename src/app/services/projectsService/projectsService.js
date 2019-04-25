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