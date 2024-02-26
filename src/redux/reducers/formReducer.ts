// src/redux/reducers/formReducer.js
const initialState = {
    submittedUsers: [],
  };
  
  const formReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'SUBMIT_FORM':
        return {
          ...state,
          submittedUsers: [...state.submittedUsers, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  