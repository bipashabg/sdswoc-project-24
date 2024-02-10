function validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/ //Minimum 8 characters including 1 uppercase letter
    const username_pattern = /[A-Za-z][A-Za-z0-9_]{7,29}$/ //Start with an alphabet, rest can be any characters and string length 8-30
    const Fullname_pattern = /^[a-zA-Z]+ [a-zA-Z]+$/ //first name+ last name

    if(values.username === "") {
        error.username = "Username should not be empty"
    }
    else if(!username_pattern.test(values.username)) {
        error.username = "Character length must be between 8-30"
    }else {
        error.username = ""
    }
    
    if(values.Fullname === "") {
        error.Fullname = "Fullname should not be empty"
    }
    else if(!Fullname_pattern.test(values.Fullname)) {
        error.fullname = "Incorrect format"
    }else {
        error.fullname = ""
    }

    if(values.email === "") {
        error.email = "Name should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password should contain minimum 8 characters and 1 uppercase letter"
    }else {
        error.password = ""
    }
    return error;
}

export default validation;