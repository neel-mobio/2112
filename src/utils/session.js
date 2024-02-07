class Session {
  get token() {
    return localStorage.getItem('token') || null;
  }

  setToken = (token) => {
    localStorage.setItem('token', token);
  };

  get user() {
    return localStorage.getItem('user') || null;
  }

  setUser = (user) => {
    localStorage.setItem('user', user);
  };
  
  get password() {
    return localStorage.getItem('password') || null;
  }

  setPassword = (password) => {
    localStorage.setItem('password', password);
  };

  get FirstName() {
    return localStorage.getItem('FirstName') || null;
  }

  setuserRoleId = (userRoleId) => {
    localStorage.setItem('userRoleId', userRoleId);
  };
  get userRoleId() {
    return localStorage.getItem('userRoleId') || null;
  }
  setFirstName = (FirstName) => {
    localStorage.setItem('FirstName', FirstName);
  };

  get ShopName() {
    return localStorage.getItem('ShopName') || null;
  }
  setShopName = (ShopName) => {
    localStorage.setItem('ShopName', ShopName);
  };

  get role() {
    return localStorage.getItem('role') || null;
  }

  setRole = (role) => {
    localStorage.setItem('role', role);
  };

  clear = () => {
    localStorage.clear();
  };
}

export default new Session();
