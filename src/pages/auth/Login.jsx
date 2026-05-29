const handleLogin = async () => {
  // fetch users
  const res = await fetch(
    'http://localhost:3000/users'
  )

  const users = await res.json()

  // find user
  const foundUser = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  )

  // check login
  if (foundUser) {
    // save localStorage
    localStorage.setItem(
      'user',
      JSON.stringify(foundUser)
    )

    alert('Login success')

    // redirect
    navigate('/admin')
  } else {
    alert('Wrong email or password')
  }
}