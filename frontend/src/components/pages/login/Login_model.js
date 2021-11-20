export function Login_model(user) {

    return new Promise ((resolve, reject) => {

        fetch('http://localhost:3001/api/auth/login', {
        method: "POST",
        headers: {
        Accept: 'application/json',
        "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({...user})
    })
    .then(res => {
        return res.json()
        .then(result => {
            if(result.error === undefined){
                resolve(result)
            }else{
                reject(result)
            }
        })

    })
    
    })
}
