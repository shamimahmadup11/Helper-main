import axios from "axios"
import * as constant from "../../../Constants/Dashboard/ManageWebsiteConstants/TestimonialsConstant"
import { API_URL } from "../../../../config"




export const GetAllTestimonialsAction = () => {
    return async (dispatch) => {
        dispatch({ type: constant.ALL_TESTIMONIALS_API_LOADING })
        try {
            const response = await axios.get(API_URL + "/manage-website/testimonial/getall");
            if (response.status === 200) {
                dispatch({ type: constant.ALL_TESTIMONIALS_API_SUCCESS, payload: response.data.data })
            }else{
                dispatch({ type: constant.ALL_TESTIMONIALS_ERROR, payload: response.data.data })
            }
        } catch (error) {
            dispatch({ type: constant.ALL_TESTIMONIALS_ERROR, })
        }
    }
}