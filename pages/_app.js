import {createContext, useReducer} from 'react';
import '../styles/globals.css'

export const storeContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_LOCAL_STORES: 'SET_LOCAL_STORES'
}

const storeReducer = (state, action)=>{
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return {...state, latLong: action.payload.latLong};
    }
    case ACTION_TYPES.SET_LOCAL_STORES: {
      return {...state, localStores: action.payload.localStores};
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const StoreProvider = ({children})=>{
  const initialState = {
    latLong: '',
    localStores: []
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)
  return (
    <storeContext.Provider value={{ state, dispatch}}>
      {children}
    </storeContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
