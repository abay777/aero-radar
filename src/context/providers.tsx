"use client"
import { Provider } from "react-redux";
import store from "./store";
import { divIcon } from "leaflet";




const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider  store={store}>
            {children}
        </Provider >)
  };
  
  export default Providers;