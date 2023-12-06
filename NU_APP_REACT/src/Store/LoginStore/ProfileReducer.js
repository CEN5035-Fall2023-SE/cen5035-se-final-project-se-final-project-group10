const initialState = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    role: ''
}

const profileReducer = (state= initialState, action) => {
    switch(action.type){
		case 'SET_PROFILE' : return {
			...state,
            username: action.payload.username,
            id: action.payload.id,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            role: action.payload.role
		}
        
		default: return state
	}
}

export default profileReducer;