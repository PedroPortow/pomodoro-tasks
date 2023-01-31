export const taskReducer = (state, action) => {
  console.log({action})
  switch(action.type){
    case 'ADD':
        return [...state, action.payload];
    case 'DELETE_ALL':
        return []
    case 'DELETE_UNIQUE':
        return [...state, state.filter(task => task.id !== action.payload)]
    case 'CHECKED':
        const newState = [...state]
        newState.map((task) => {
          if(task.id === action.payload){
            task.checked = true;
          }
        })
        return [...state, newState ]
    default:
        return state
  } 
};
