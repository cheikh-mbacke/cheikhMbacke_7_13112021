import { Login_model } from './Login_model'

export function Login_controller(user) {

    return new Promise((resolve, reject) => {
        Login_model(user)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })

    
}
