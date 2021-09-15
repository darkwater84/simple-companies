import { createContext } from "react";

const BusinessContext = createContext({
    deleteDialog:{
        visible:false,
        businessId: null,
    },
    setVisible: async()=>{}
});

export default BusinessContext;