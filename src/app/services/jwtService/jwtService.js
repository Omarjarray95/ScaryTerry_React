import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/users/adduser', data)
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

    checkUsername = (username) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/users/checkusername', {username: username})
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

    getEmployees = () =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.get('http://localhost:3001/users/getusers')
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

    signInWithEmailAndPassword = (username, password) =>
    {
        return new Promise((resolve, reject) =>
        {
            axios.post('http://localhost:3001/users/login',
                {
                    username: username,
                    password: password
                })
                .then(response =>
                {
                    if ( response.status === 202 )
                    {
                        var user = response.data;
                        var fullname = user.firstName + " " + user.lastName;
                        this.setSession(user.token, user.id, user.username, fullname, user.role);
                        resolve(user);
                    }
                    else if ( response.status === 200 )
                    {
                        reject(response.data);
                    }
                    else
                    {
                        reject(response.data);
                    }
                });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/auth/access-token', {
                data: {
                    access_token: this.getAccessToken()
                }
            })
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = (access_token, id, username, name, role) => {
        if ( access_token && username && name && role && id )
        {
            localStorage.setItem('jwt_access_token', access_token);
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('name');
            localStorage.setItem('role', "Guest");
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null, null, null, null, null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
