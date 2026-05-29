const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleRegister = async () => {
  // validate
  if (!email || !password) {
    alert('Please enter email and password')
    return
  }

  // call api
  await fetch('http://localhost:3000/users', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      email,
      password,
      role: 'user'
    })
  })

  alert('Register success')

  // clear input
  setEmail('')
  setPassword('')
}