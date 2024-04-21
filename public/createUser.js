const loginForm = document.getElementById('loginForm');
console.log(loginForm);
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(event.target);
  customSubmit(formData);
});

async function sha256(data) {
  const textAsBuffer = new TextEncoder().encode(data);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const digest = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return digest;
}

async function customSubmit(formData) {
  const password = formData.get('password');
  if (!password) return;
  const hashedPassword = await sha256(password);
  formData.set('password', hashedPassword);
  sendData(formData);
}

async function sendData(formData) {
  const entries = Object.fromEntries(formData);

  console.log(entries);
  try {
    const response = await fetch('/admin/user', {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(entries),
    }).then((res) => {
      if (res.redirected) {
        document.location = res.url;
      }
    });
  } catch (e) {
    console.error(e);
  }
}
