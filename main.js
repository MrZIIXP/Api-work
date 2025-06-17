let api = 'https://68500995e7c42cfd17971442.mockapi.io/Windows'
let Name = document.querySelector('.Reg_name')
let Password = document.querySelector('.Reg_password')
let button = document.querySelector('.Reg_confirm')
let detactor = false

async function Add_user(obj) {
	try {
		await (
			await fetch(api, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(obj),
			})
		).json()
		location.href = './index.html'
	} catch {
		console.error('Error')
	}
}
button.onclick = () => {
	let obj = {
		name: Name.value,
		password: Password.value,
	}
	if (obj.name.trim() != '' && obj.password.trim() != '') {
		button.style.display = 'none'
		Add_user(obj)
		localStorage.setItem("UserName", obj.name)
		localStorage.setItem("Password", obj.password)
	}
}
