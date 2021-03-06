async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        console.log('authenticated...');
        document.location.replace('/');
      } else {
        // change this later 
        document.getElementById('error').innerHTML = "There was a problem logging you in.";
      }
}

document.getElementById('login_form').addEventListener('submit', loginUser);