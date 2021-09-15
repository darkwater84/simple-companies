import { createContext } from "react";


const PersonContext = createContext({
    deleteDialog:{
        visible: false,
        businessId: null,
        personId:null
    }
});

export default PersonContext;