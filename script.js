const regForm = document.getElementById('registrationForm');

// проверка полей на валидацию
const validateField = (input, tooltip) => {
  if (!input.checkValidity()) {
    input.classList.add('error');
    tooltip.classList.add('show');
    return false;
  } else {
    input.classList.remove('error');
    tooltip.classList.remove('show');
    return true;
  }
};

// сбрасываем форму + выводим в консоли данные + отправляем данные
const successRegistration = async (regForm) => {
  const newUser = {
    login: regForm.login.value,
    password: regForm.password.value,
    lastname: regForm.lastname.value,
    firstname: regForm.firstname.value,
    middlename: regForm.middlename.value,
    city: regForm.city.value,
  };
  console.log('Данные регистрации:', newUser);
  regForm.reset();
  regForm.querySelectorAll('input').forEach((i) => i.classList.remove('error'));
  regForm.querySelectorAll('.error-tooltip').forEach((t) => t.classList.remove('show'));

  await fetch('https://483df46a630e924e.mokky.dev/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newUser),
  });
};

//отправка формы
regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  const groups = regForm.querySelectorAll('.form-group');
  groups.forEach((group) => {
    const input = group.querySelector('input');
    const tooltip = group.querySelector('.error-tooltip');

    if (input && input.id !== 'middlename') {
      const valid = validateField(input, tooltip);
      if (!valid) isValid = false;
    }
  });

  if (isValid) {
    successRegistration(regForm);
  }
});

regForm.querySelectorAll('input').forEach((input) => {
  if (input.id === 'middlename') return;

  const group = input.closest('.form-group');
  const tooltip = group.querySelector('.error-tooltip');

  input.addEventListener('input', () => {
    validateField(input, tooltip);
  });
});
