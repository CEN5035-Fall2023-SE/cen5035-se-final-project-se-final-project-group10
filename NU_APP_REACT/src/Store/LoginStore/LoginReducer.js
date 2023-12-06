const initialState = {
    username: '',
    password: '',
    role: '',
    token: '',
    loginSuccess: ''
}

const LoginReducer = (state = initialState, action) => {
    switch(action.type){
		case 'SET_USERNAME' : return {
			...state,
			username: action.payload
		}
		case 'SET_PASSWORD' : return {
			...state,
			password: action.payload
        }
        case 'SET_ROLE' : return {
			...state,
			role: action.payload
        }
        case 'SET_TOKEN' : return {
			...state,
			token: `Bearer ${action.payload}`
        }
        case 'LOGIN_FAILED' : return {
			...state,
			loginSuccess: false
        }
        case 'LOGIN_SUCCESS' : return {
			...state,
			loginSuccess: true
		}
		case 'LOGOUT' : return initialState
        
		default: return state
	}
}

export default LoginReducer;