function printError(element) {
    element.style.borderColor = "red";
    element.style.backgroundColor = "rgba(255, 0, 0, 0.233)"
    element.style.borderWidth = "2px";
}

let errMessage = [];
let isError = false;

function checkLength(element, length) {
    if (element.value.length > length) {
        printError(element);
        if (element.name === "firstName") {
            errMessage.push(`Длина имени не должна быть больше ${length}`);
        }
        if (element.name === "secondName") {
            errMessage.push(`Длина фамилии не должна быть больше ${length}`);
        }
    } else {
        element.style = '';
    }
}

function testPattern(element, pattern, message) {
    if (!pattern.test(element.value)) {
        printError(element);
        errMessage.push(message);
    } else {
        element.style = '';
    }
}


function onSubmit() {
    try{
    errMessage = [];
    
    let myForm  = document.forms.form;
    let firstName = myForm.elements.firstName;
    let secondName = myForm.elements.secondName;
    let patternName = /^[а-яА-Я]+$/;

    if (firstName.value.length === 0) {
        printError(firstName);
        errMessage.push(`Введите Имя.`);
    } else {
        firstName.style = '';
        checkLength(firstName, 15);
        testPattern(firstName, patternName, "Имя должно содержать только допустимые значения (Одно слово, содержащее только буквы из Кириллицы).");
    }
    if (secondName.value.length === 0) {
        printError(secondName);
        errMessage.push(`Введите Фамилию.`);
    } else {
        secondName.style = '';
        checkLength(secondName, 25);
        testPattern(secondName, patternName, "Фамилия должна содержать только допустимые значения. (Одно слово, содержащее только буквы из Кириллицы) ");
    }
    
    
    let pass1 = form.elements.password1;
    let pass2 = form.elements.password2;

    let patternUpperCase = /[А-ЯA-Z]/;
    let patternLowerCase = /[а-яa-z]/;
    let patternDigital = /\d/;
    let patternSymbol = /[$&+,:;=?@#|'<>.^*()%!-']/;

    let email = form.elements.email;
    let patternEmail = /\w+@\w+\.\w+/;

    if (email.value.length === 0) {
        printError(email);
        errMessage.push(`Введите Email.`);
    } else {
        email.style = '';
        testPattern(email, patternEmail, "Введите валидный Email. (Валидный Email должен содержать только буквы из латиницы без пробелов, знаки '@', '.' именно в такой последованности и иметь между ними буквы на латинице без пробелов.) ");
    }
    
    if (pass1.value.length === 0) {
        printError(pass1);
        errMessage.push(`Введите пароль.`);
        if (pass2.value.length === 0) {
            printError(pass2);
            errMessage.push(`Введите подтверждение пароля`);
        }
         else {
            pass2.style = '';
        }
    } else {
        pass1.style = '';
        testPattern(pass1, patternUpperCase , "Пароль должен содержать минимум одну заглавную букву.");
        testPattern(pass1, patternLowerCase , "Пароль должен содержать минимум одну строчную букву.");
        testPattern(pass1, patternDigital , "Пароль должен содержать минимум одну цифру.");
        testPattern(pass1, patternSymbol , "Пароль должен содержать минимум один из ряда символов $&+,:;=?@#|'<>.^*()%!-'.");
        if (pass1.value.length < 8) {
            printError(pass1);
            errMessage.push(`Длина пароля должна быть не менее 8 символов.`);
        } else {
            pass1.style = '';
        }
        if (pass2.value.length === 0) {
            printError(pass2);
            errMessage.push(`Введите подтверждение пароля`);
        } else {
            pass2.style = '';
            if (pass1.value !== pass2.value) {
                printError(pass2);
                errMessage.push(`Пароли не совпадают.`);
            } else {
                pass2.style = '';
            }
        }
        
    }


    let bd = myForm.elements.birthday;
    let bd_date = new Date(myForm.elements.birthday.value);
    let now = new Date();

    let amountYears = now.getFullYear()-bd_date.getFullYear();

    if (bd.value.length === 0) {
        printError(bd);
        errMessage.push(`Введите дату рождения.`);
    } else {
        bd.style = '';
        if (amountYears < 18) {
            printError(bd);
            errMessage.push(`Возраст должен быть не менее 18 лет.`);
        } else {
            bd.style = '';
        }
        if (amountYears === 18) {
            let amountMonths = now.getMonth()-bd_date.getMonth();
            if(amountMonths < 0 ){
                printError(bd);
                errMessage.push(`Возраст должен быть не менее 18 лет.`);
            } else {
                bd.style = '';
            }
            if (amountMonths === 0) {
                let amountDays = now.getDate()-bd_date.getDate();
                if (amountDays < 0) {
                    printError(bd);
                    errMessage.push(`Возраст должен быть не менее 18 лет.`);
                } else {
                    bd.style = '';
                }
            }
        }
    }

    let ul;
    if (!isError) {
        ul = document.createElement('ul');
        isError = true;
    } else {
        ul = document.getElementsByClassName("errorList")[0];
        ul.innerHTML = "";
    }

    ul.className = "errorList";

    for (let i = 0; i < errMessage.length; i++) {
        let li = document.createElement('li');
        li.className = "item";
        li.innerHTML = errMessage[i];
        ul.append(li);
    }
    myForm.before(ul);

    if (errMessage.length === 0) {
        ul.remove();
        isError = false;
        let successDiv = document.createElement('div');
        successDiv.className = "success_div";
        successDiv.innerHTML = "Регистрация прошла успешно!";
        myForm.before(successDiv);
        myForm.remove(); 
    }
}
catch(e) {
    console.log(e);
}
}