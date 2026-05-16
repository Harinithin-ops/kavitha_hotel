async function test() {
  const res = await fetch("https://formsubmit.co/ajax/harinithins28@gmail.com", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      subject: "Admin OTP Verification",
      message: "Your code is 123456"
    })
  })
  const data = await res.json()
  console.log(data)
}
test()
