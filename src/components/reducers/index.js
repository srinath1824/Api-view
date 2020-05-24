import types from "../actions";

const initialState = {
  solutionId: "",
  solutionOrganizationId: "",
  publishingEndpoint: "",
  pricingLevel: "",
  pricing: {
    type: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TYPE: {
      if (action.data.value === "Subscription") {
        let newState = { ...state.pricing };
        newState.type = action.data.value;
        delete newState.rates;
        newState.price = "";
        return {
          ...state,
          pricing: newState,
        };
      } else {
        let pricing = {
          type: action.data.value,
          rates: [
            {
              endUnit: null,
              rate: null,
              startUnit: null,
            },
          ],
        };
        return {
          ...state,
          pricing,
        };
      }
    }
    case types.SET_VALUE: {
      return {
        ...state,
        [action.data.type]: action.data.value,
      };
    }
    case types.ADD_RATES: {
      let newRate = state.pricing.rates;
      let rate = {
        endUnit: null,
        rate: null,
        startUnit: null,
      };
      newRate.push(rate);
      return {
        ...state,
        pricing: {
          ...state.pricing,
          rates: newRate,
        },
      };
    }
    case types.ADD_RATE_VALUE: {
      let index = action.data.index;
      return {
        ...state,
        pricing: {
          ...state.pricing,
          rates: [
            ...state.pricing.rates.slice(0, index),
            {
              ...state.pricing.rates[index],
              [action.data.type]: action.data.value,
            },
            ...state.pricing.rates.slice(index + 1),
          ],
        },
      };
    }
    case types.ADD_PRICE: {
      return {
        ...state,
        pricing: {
          ...state.pricing,
          price: action.data.value,
        },
      };
    }
  }
  return state;
};
