import Http from '../Http';
import { login } from '../store/reducers/authReducer';

export const authLogin = credentials => (
    async(dispatch) => {
            try{
                  const response = await Http.post('/api/Auth/login', credentials);
                  dispatch(login(response.data));
                  return response;
            }catch(error){
                  throw error.response;
            }
    }
)

export const authRegister = data => (
    async(dispatch) => {
            try{
                  const response = await Http.post('/api/Auth/register', data);
                  return response;
            }catch(error){
                  throw error.response;
            }
    }
)

export const getParentInformation = applicantUserId => (
      async(dispatch) => {
            try{
                  const response = await Http.get(`/api/ParentInformation/${applicantUserId}`);
                  return response;
            }catch(error){
                  throw error.response;
            }
      }
)

export const updateParentAddress = data => (
      async(dispatch) => {
            try{
                  const response = await Http.post('/api/ParentAddress', data);
                  return response;
            }catch(error){
                  throw error.response;
            }
      }
)
  
export const updateParentInformation = data => (
      async(dispatch) => {
            try{
                  const response = await Http.post('/api/ParentInformation', data);
                  return response;
            }catch(error){
                  throw error.response;
            }
      }
)