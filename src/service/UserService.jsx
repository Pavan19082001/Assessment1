import axios from 'axios'

const USER_GET_REST_API_URL='http://localhost:8080/api/v1/user/getUser'

const USER_POST_REST_API_URL='http://localhost:8080/api/v1/user/register'

const USER_GET_BY_EMAIL_REST_API_URL='http://localhost:8080/api/v1/user/getUser'



class UserService{
    GetAllUser(){
        return axios.get(USER_GET_REST_API_URL);
    }

    RegisterUser(users){
        return axios.post(USER_POST_REST_API_URL,users)
    }

    getUserByEmail(emailId){
        return axios.get(USER_GET_BY_EMAIL_REST_API_URL+"/"+emailId);
    }
}export default new UserService();