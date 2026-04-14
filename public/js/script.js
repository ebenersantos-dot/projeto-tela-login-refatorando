document.addEventListener('DOMContentLoaded', function () {
    const signUpLink = document.querySelector('.login-form-subscribe a');
    const loginLink = document.querySelector('.sign-up-form a');
    const loginForm = document.querySelector('#login');
    const signUpForm = document.querySelector('#sign-up');
    const loginErrorMessage = document.querySelector('#login-error-message');
    const signUpErrorMessage = document.querySelector('#sign-up-error-message');

    const showFormSignUp = () => {
        document.querySelector('.login-form').style.display = "none";
        document.querySelector('.sign-up-form').style.display = "flex";
        document.querySelector('.login-text-content h2').innerHTML = 
            "Olá!<br />Seja bem-vindo(a).";
            document.querySelector('.login-text-content p').innerHTML = 
            "Crie sua conta para acessar a plataforma.";
    };

    const showFormLogin = () => {
        document.querySelector('.login-form').style.display = "flex"
        document.querySelector('.sign-up-form').style.display = "none"
        document.querySelector('.login-text-content h2').innerHTML = 
            "Olá!<br />Seja bem-vindo(a) de volta.";
            document.querySelector('.login-text-content p').innerHTML = 
            "Faça login para continuar acessando a página.";
    };

    signUpLink.addEventListener('click', function (event) {
        event.preventDefault();
        showFormSignUp();

    });

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        showFormLogin();
        
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const emailInput = this.querySelector('input[name="email"]');
        const passwordInput = this.querySelector('input[name="password"]');
        let errors = [];

        if (passwordInput.value.trim().length < 8) {
            passwordInput.classList.add("error");
            errors.push("Senha deve conter pelo menos 8 caracteres.");
        } else {
            passwordInput.classList.remove("error");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add("error");
            errors.push("Email inválido.");
        } else {
            emailInput.classList.remove("error");
        }

        if (errors.length > 0) {
            loginErrorMessage.style.display = "block";
            loginErrorMessage.innerText = errors.join("\n");
        } else {
            loginErrorMessage.style.display = "none";
            loginErrorMessage.innerText = "";
        }
    });

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const passwordInput = this.querySelector('input[name="password"]');
        const rePasswordInput = this.querySelector('input[name="re-password"]');

        let errors = [];

            if(nameInput.value.trim() === "") {
                nameInput.classList.add("error");
            errors.push("Preencha o nome.");
        } else {
            nameInput.classList.remove("error");
            }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add("error");
            errors.push("Email inválido.");
        } else {
            emailInput.classList.remove("error");
        }

         if (passwordInput.value.trim().length < 8) {
            passwordInput.classList.add("error");
            errors.push("Senha deve conter pelo menos 8 caracteres.");
        } else {
            passwordInput.classList.remove("error");
        }

            if(passwordInput.value !== rePasswordInput.value) {
                rePasswordInput.classList.add("error");
                errors.push("As senhas não conferem")
            } else {
                rePasswordInput.classList.remove("error");
            }

        if (errors.length > 0) {
            signUpErrorMessage.style.display = "block";
            signUpErrorMessage.innerText = errors.join("\n");
        } else {
            signUpErrorMessage.style.display = "none";
            signUpErrorMessage.innerText = "";

                const userData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passwordInput.value.trim(),
                };

                fetch("http://localhost:4000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Success:", data);
                        alert("Cadastro realizado com sucesso!"),
                            signUpForm.reset();
                            showFormLogin();
                    })
                    .catch((Errors) => {
                        console.error("Error:", Errors);
                    });
        }
    });
});