import '@babel/polyfill';

export const checkLoggedIn = async (router, onRedirect) => {
  let cookie = null;
  const cookies = document.cookie.split(';');
  const redirect = () => {
    if (router.current.history.location.pathname !== '/') {
      router.current.history.push('/');
      onRedirect();
    }
  };
  for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].includes('session')) {
      cookie = cookies[i];
    }
  }
  if (cookie) {
    const pos = cookie.indexOf('user:') + 5;
    const user = JSON.parse(cookie.substring(pos, cookie.length));
    try {
      const res = await fetch('/api/checkUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email
        })
      });
      const json = await res.json();
      if (json.success) {
        return user.email;
      }
      redirect();
      return false;
    } catch (e) {
      console.error(e.msg);
      return false;
    }
  } else {
    redirect();
    return false;
  }
};

export const getUser = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].includes('session')) {
      const pos = cookies[i].indexOf('user:') + 5;
      return JSON.parse(cookies[i].substring(pos, cookies[i].length));
    }
  }
  return {};
};
