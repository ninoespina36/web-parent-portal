import Http from '../Http';

export const getReference = reference => (
    async(dispatch) => {
      try{
            const response = await Http.get(`/api/Reference?referenceGroupCode=${reference}`);
            return response;
      }catch(error){
            throw error.response;
      }
    }
)
  