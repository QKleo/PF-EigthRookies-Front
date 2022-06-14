import axios from 'axios';
export const ADD_REVIEW = "addReview";
export const ERROR_MESSAGE = "errorMesage";
export const UPDATE_REVIEW= "updateReview";

export function addReview(review, productId) {
	return async (dispatch) => {
		await axios
			.post(`http://localhost:3001/routeReview/${productId}`, review)
			.then((res) => {
				if (res.status === 200) {
					return dispatch({
						type: ADD_REVIEW,
						products: res.data.data,
					});
				} else {
					return dispatch({
						type: ERROR_MESSAGE,
						message: 'error al agregar review',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function updateReview(productId, updateRewiew){
    let reviewId = updateReview.id;
    return async function (dispatch){
        const response = await axios.put(`http://localhost:3001/${productId}/review/${reviewId}`)
        return dispatch({
            type: UPDATE_REVIEW,
            payload: response.data
        })
    }
     
}

