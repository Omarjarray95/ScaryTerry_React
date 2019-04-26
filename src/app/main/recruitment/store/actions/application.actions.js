import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const SAVE_APPLICATION = '[RECRUITMENT APP] SAVE APPLICATION';

export function saveApplication(data)
{
    const formData = new FormData();
    formData.append('resume',data.resume);
    
    formData.append('email',data.applier);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    console.log(formData.get('email'));
    const request = axios.post('http://localhost:3001/applications/add/'+data.applier+'/'+data.offer, formData,config);

    console.info("submit",data);
    
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
               
                dispatch(showMessage({message: 'Product Saved'}));
                return dispatch({
                    type   : SAVE_APPLICATION,
                    payload: response.data
                })
            }
        ).catch(err=>{
            
            if(err.response.status===500){
                const error = err.response;   
                console.log(err.response);
                dispatch(showMessage({message: err.response.data.message}));
            }
        });
}