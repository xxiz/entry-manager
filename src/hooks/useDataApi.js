import { useState, useEffect, useReducer} from 'react'
import axios from 'axios'

function useDataApi(initialUrl, initialData) {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    })
  
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
            const result = await axios(url)
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
            dispatch({ type: 'FETCH_FAILURE' })
            }
        }
        fetchData()
/*         const interval = setInterval(fetchData, 1000)
        return clearInterval(interval) */
    }, [url])
  
    return [state, setUrl]
}
  
function dataFetchReducer(state, action) {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
}

export default useDataApi