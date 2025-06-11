import React from "react"
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"
const {CATALOGPAGEDATA_API} = catalogData;
export const getCatalogPageData = async (categoryId) => {
    
    const toastId = toast.loading("Loading...")
    let result = [];

    try {
        const response = await apiConnector("POST", CATALOGPAGEDATA_API, { categoryId: categoryId })
        if(!response?.data?.success)
            throw new Error("Could not fetch category page data")

        result = response?.data // Remove the 'const' here to use the outer variable

    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR.............", error)
        toast.error(error.message)  
        result = error.response?.data
    }
    toast.dismiss(toastId)

    return result
}
