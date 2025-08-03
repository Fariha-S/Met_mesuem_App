import jwt_decode from 'jwt-decode';


console.log("jwt_decode:", jwt_decode);

export function setToken(token) {
  localStorage.setItem('token', token);
}


export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function readToken() {
  const token = getToken();
  return token ? jwt_decode(token) : null;
}


export function isAuthenticated() {
  return !!getToken();
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName: user, password }),
  });

  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token);
    return true;
  } else {
    return false;
  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  if (res.status === 200) {
    return true;
  } else {
    const error = await res.json();
    return error; // this includes { message: "...duplicate username..." }
  }
}
