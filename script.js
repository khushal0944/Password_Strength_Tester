document.addEventListener("DOMContentLoaded", () => {
    const strengthMeter = document.getElementById("strength-meter") 
    const inputPassword = document.getElementById("password")
    const reasons = document.getElementById("reasons");
    
    inputPassword.addEventListener("input",updateStrength)
    
    function updateStrength() {
        const weaknessArray = getWeaknesses(inputPassword.value);
        let strength = 100;
        reasons.innerHTML = '';

        weaknessArray.forEach(weakness => {
            if (weakness == null) return;
            strength -= weakness.deduction;
            const messageElement = document.createElement('div');
            messageElement.innerText = weakness.message;
            reasons.appendChild(messageElement);
        });

        strength = Math.max(strength, 0);
        strengthMeter.style.setProperty("--strength", strength);
    }
    
    function getWeaknesses(password){
        return [
            checkLength(password),
            checkLowerCase(password),
            checkUpperCase(password),
            checkNumbers(password),
            checkSpecialSymbols(password)
        ];
    }
    
    function checkLength(password){
        if(password.length < 8){
            return {
                message : "password length must be of length 8",
                deduction : 30
            };
        }
        return null;
    }
    
    function checkCases(password, regex, type) {
        const matches = password.match(regex);
        if (matches == null) {
            return {
                message: `Password must have ${type}.`,
                deduction: 20
            };
        } else if (matches.length <= 3) {
            return {
                message: `Add more ${type} characters.`,
                deduction: 20
            };
        }
        return null;
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
});
