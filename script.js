const strengthMeter = document.getElementById("strength-meter") 
const inputPassword = document.getElementById("password")
const reasons = document.getElementById("reasons");

inputPassword.addEventListener("keypress",updateStrength)
// checkStrength()


function updateStrength(){
    const weaknessArray = getWeaknesses(inputPassword.value);
    let strength = 100;
    weaknessArray.forEach(weakness => {
        if(weakness == null) return;
        strength -= weakness.deduction;
    })
    strengthMeter.style.setProperty("--strength",strength)
}

function getWeaknesses(password){
    let weaknessArray = [];
    weaknessArray.push(checkLength(password));
    weaknessArray.push(checkLowerCase(password));
    weaknessArray.push(checkUpperCase(password));
    weaknessArray.push(checkNumbers(password));
    weaknessArray.push(checkSpecialSymbols(password));
    return weaknessArray;
}

function checkLength(password){
    if(password.length < 8){
        console.log("password length must be of length 8");
        return {
            message : "password length must be of length 8",
            deduction : 60
        };
    }
    return {};
}

function checkCases(password,regex,type){
    if(password.match(regex) == null){
        console.log(`password must have ${type}`);
        return {
            message : `password must have  ${type}`,
            deduction : 50
        };
    }
    else if(password.match(regex).length <=3){
        console.log(`add more ${type}`);
        return {
            message : `password have more ${type}`,
            deduction : 20
        };
    }
    return {};
}

function checkLowerCase(password){
    return checkCases(password,/[a-z]/g,"LowerCase")
}
function checkUpperCase(password){
    return checkCases(password,/[A-Z]/g,"UpperCase")
}
function checkNumbers(password){
    return checkCases(password,/[0-9]/g,"Numbers")
}
function checkSpecialSymbols(password){
    return checkCases(password,/[^a-zA-Z0-9\s]/g,"Special Symbols")
}