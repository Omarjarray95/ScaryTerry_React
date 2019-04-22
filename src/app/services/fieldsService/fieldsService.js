import axios from "axios";
import FuseUtils from '@fuse/FuseUtils';

class fieldsService extends FuseUtils.EventEmitter
{
    getFields = () =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/fields/getfields')
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

    checkName = (name) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/fields/checkname', {name: name})
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

const instance = new fieldsService();

export default instance;