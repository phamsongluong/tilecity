//I just put some dummy data here to simulate the data we get from API,
//Then we call an API through middleware we will update the info then showing it on our components
const initState = {
  info: {},
};

const rootReducer = (state = initState, action) => {
  //simulate data get from backend
  if (action.type === "GET_LOCATION") {
    if (action.id % 2 === 0) {
      return {
        ...state,
        info: {
          id: 1,
          title: "First Location",
          body: "The biggest city in the world",
        },
      };
    } else {
      return {
        ...state,
        info: {
          id: 2,
          title: "Second Location",
          body: "A beautiful city",
        },
      };
    }
  }
  return state;
};

export default rootReducer;
