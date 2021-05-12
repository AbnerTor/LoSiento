async function signupUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        document.location.replace('/');
      } else {
        // change this later 
        document.location.replace('/signup?error');
      }
}

document.getElementById('signup_form').addEventListener('submit', signupUser);