import {
    SEARCH_PRODUCT
} from "./actions";

const initialState = {
    productResult: []
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case SEARCH_PRODUCT:
            return {
                ...state,
                productResult: payload,
            };

        default: return state;
    }
}
