let api = 'https://68500995e7c42cfd17971442.mockapi.io/Windows'
let Reg_name = document.querySelector('.Reg_name')
let Reg_password = document.querySelector('.Reg_password')
let Reg_confirm = document.querySelector('.Reg_confirm')

async function Get() {
	try {
		Search(await (await fetch(api)).json())
	} catch {
		console.error('Error')
	}
}
let find = false
function Search(data) {
	data.find(element => {
		if (
			element.name == Reg_name.value &&
			element.password == Reg_password.value
		) {
			Reg_confirm.style.display = 'none'
			localStorage.setItem('UserName', Reg_name.value)
			localStorage.setItem('Password', Reg_password.value)
			location.href = './index.html'
			find = true
		}
	})
	if(!find){
		alert('Неправильный ник или пароль')
	}
}
Reg_confirm.onclick = () => {
	Get()
}
