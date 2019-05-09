import axios from 'axios';
import history from 'history.js';
import {showMessage} from 'app/store/actions/fuse';

export const GET_TEST = '[RECRUITMENT APP] GET TEST';
export const SAVE_TEST = '[RECRUITMENT APP] SAVE TEST';
export const VALIDATE_TEST = '[RECRUITMENT APP] VALIDATE TEST';

export function getTest(test)
{
    const request = axios.get('http://localhost:3001/tests/'+test);

    return (dispatch) =>
        request.then((response) =>
            {
            console.log(response.data);
            dispatch({
                type   : GET_TEST,
                payload: response.data
            })
        }
        );
}

export function saveTest(data)
{
    const request = axios.put('http://localhost:3001/tests/submit/'+data.id +'/quiz', {
        results:data.results,
    });
    const formData = new FormData();
    formData.append('code',data.code);
    formData.append("lang", data.lang);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const request2 = axios.put('http://localhost:3001/tests/submit/'+data.id +'/code',formData,config);
    return (dispatch) =>
        request.then((response) =>
            {
                request2.then(response=>{
                    console.log(response.data);
                    dispatch({
                        type   : SAVE_TEST,
                        payload: response.data
                    })
                })
                dispatch(showMessage({message: 'Product Saved'}));

                history.push({
                    pathname: '/'
                });
            }
        );
}

export function validateTest(data) {
    const request1 = axios.get('http://localhost:3001/tests/validate/'+data+'/quiz');
    const request2 = axios.get('http://localhost:3001/tests/validate/'+data+'/code');
    return (dispatch) => 
        request1.then(response=>{
            dispatch({
                type: VALIDATE_TEST,
                payload: response.data
            });
            request2.then(response=>{
                console.log(response.data);
            })
            dispatch(showMessage({message:'Your Test Has been validated'}));
        }).catch(err=>{
            if(err.response.status===500){
                const error = err.response;   
                console.log(err.response);
                dispatch(showMessage({message: err.response.data.message}));
            }
        });
}
