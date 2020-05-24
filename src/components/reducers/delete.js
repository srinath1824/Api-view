import types from "../actions";

const initialState = {
  solutionId: "",
  solutionOrganizationId: "",
  publishingEndpoint: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DELETE_VALUE: {
      return {
        ...state,
        [action.data.type]: action.data.value,
      };
    }
  }
  return state;
};
