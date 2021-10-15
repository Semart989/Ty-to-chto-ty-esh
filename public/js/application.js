const foodForm = document.getElementById('food');

if (foodForm) {
  foodForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { action, method, request } = event.target;

    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: request.value,
      }),

    });
    const jsonResponse = await response.json();
    if (jsonResponse.created) {
      window.location.href = action;
    } else {
      alert('Данное значение не существует');
      window.location.href = '/search';
    }
  });
}

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      action, method, username,
      email, password, confirmPassword,
    } = event.target;

    if (email.value == null || email.value === undefined || email.value === '') {
      alert('Email must not be empty');
      window.location.href = action;
      return;
    }

    if (username.value == null || username.value === undefined || username.value === '') {
      alert('Username must not be empty');
      window.location.href = action;
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match!');
      window.location.href = action;
      return;
    }

    if (password.value.length < 8) {
      alert('Password must be at least 8 characters');
      window.location.href = action;
      return;
    }

    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        email: email.value,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.registrated) {
      window.location.href = '/';
    } else {
      alert('Failed to register');
      window.location.href = action;
    }
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      action, method, email, password,
    } = event.target;
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.passwordNotMatch) {
      alert('Password does not match');
      window.location.href = action;
    } else if (jsonResponse.loggedIn) {
      window.location.href = '/';
    } else if (!jsonResponse.exsists) {
      alert('User dosen`t exist');
      window.location.href = '/register';
    } else {
      alert('Failed to login');
      window.location.href = action;
    }
  });
}

const deleteButton = document.querySelectorAll('.deleteButton');
// console.log(deleteButton[0].parentNode.dataset.cardId);
if (deleteButton) {
  deleteButton.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const id = event.target.parentNode.dataset.foodId;
      console.log(event.target.parentNode.dataset.foodId);

      const response = await fetch('/search', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodId: id,
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.deleted) {
        alert('Food was deleted');
        window.location.href = '/search';
      } else {
        alert('failed to delete');
        window.location.href = '/search';
      }
    });
  });
}
