const { default: axios } = require("axios");

const API_KEY = '2G44tWGzjQ6uBdKNux9xu56BexLz7XAB96aCVQG5';


module.exports = {
    //Business
    getBusinessList: async () => {

        return await axios.get('/business');
    },
    createBusiness: async (companyName) => {

        return await axios.post(
            '/business',
            { name: companyName });
    },
    getBusinessById: async (businessId) => {

        return await axios.get(`/business/${businessId}`)
    },
    editBusinessById: async (businessId, data) => {

        return await axios.put(`/business/${businessId}`, data);
    },
    deleteBusinessById: async (businessId) => {
        console.log('Deleting business: ', businessId)
        return await axios.delete(`/business/${businessId}`);
    },
    // Person
    addPersonToBusiness: async (data) => {
        console.log('Add perosnto business')

        return await axios.post(`/business/${data.businessId}/persons`,data)
    },
    getPersonsByBusinessId: async (businessId) => {

        return await axios.get(`/business/${businessId}/persons`)
    },
    getPersonById: async (businessId, personId) => {

        return await axios.get(`/business/${businessId}/persons/${personId}`)
    },
    editPersonById: async (data) => {

        return await axios.put(`/business/${data.businessId}/persons/${data.personId}`, data)
    },
    deletePersonById: async (businessId, personId) => {

        return await axios.delete(`/business/${businessId}/persons/${personId}`)
    }

}