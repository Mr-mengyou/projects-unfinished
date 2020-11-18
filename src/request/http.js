import axios from 'axios'
import { Message } from 'element-ui';

axios.defaults.timeout = 50000;
axios.defaults.baseURL ='';

if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = '';
}

//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('token')||""
       
        if(config.method=='post'){
            config.data = JSON.stringify(config.data)
        }
        
        return config

    },
    error => {
        return Promise.error(error)
    }
)
axios.interceptors.response.use(
    response =>{
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }   
    },
    error => {
    return Promise.reject(error)
    }
    
)

//get方法
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        })
        
        .then(res=>{

            resolve(res.data)
        })
        .catch(err=>{
            reject(err.data)
            let message = '请求失败，请稍后再试'
            Message(message)
        })
    })
}

//post方法

export function post (url,data={}){
    return new Promise((resolve,reject)=>{
        axios.post(url,data)
        .then(response=>{
            
            resolve(response.data)
        })
        .catch(err =>{
            reject(err)
            let message = '请求失败，请稍后再试'
            Message.error(message)
        })
        
    })
}