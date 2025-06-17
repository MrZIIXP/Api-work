let Api = 'https://68500995e7c42cfd17971442.mockapi.io/Users'
let api = 'https://68500995e7c42cfd17971442.mockapi.io/Windows'
let box = document.querySelector('.box')
let Password = localStorage.getItem('Password')
let UserName = localStorage.getItem('UserName')
async function Users() {
	try {
		let datas = await (await fetch(Api)).json()
		Usering(datas)
		console.log('Upgrade')
	} catch (error) {
		console.error('Error')
	}
}

async function CheckUsers() {
	try {
		let datas = await (await fetch(api)).json()
		ChechUserDel(datas)
		console.log(datas)
		console.log('Upgrade')
	} catch (error) {
		console.error('Error')
	}
}

async function DeleteCard(id) {
	try {
		await fetch(`${Api}/${id}`, { method: 'DELETE' })
		Users()
	} catch {
		console.error(`${Api}/${id}`)
	}
}

async function AddPerson(UserObject) {
	try {
		let responsive = await fetch(Api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(UserObject),
		})
		let data = await responsive.json()
		console.log(`Добавлен ${data}`)
		Users()
	} catch {
		console.error('Не удалось загрузиться')
	}
}
let AddDialog = document.querySelector('.AddDialog')
let AddPersons = document.querySelector('.AddPerson')
let AddPersonForm = document.querySelector('.AddPersonForm')
AddPersons.onclick = () => {
	AddDialog.showModal()
}
let Img = document.querySelector('.Img')
Img.src =
	AddPersonForm['Image'].value ||
	'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3'
AddPersonForm['Image'].oninput = () => {
	Img.src =
		AddPersonForm['Image'].value ||
		'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3'
}
Img.onerror = () => {
	Img.src =
		'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3'
}

AddPersonForm.onsubmit = e => {
	e.preventDefault()
	let obj = {
		name: AddPersonForm['Name'].value,
		ides: Date.now(),
		img:
			AddPersonForm['Image'].value ||
			'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3',
		status: false,
		by_name: UserName,
		by_password: Password,
	}
	if (obj.name.trim() != '') {
		AddPerson(obj)
		AddPersonForm.reset()
		AddDialog.close()
	}
}

async function UpdateStatus(id, status) {
	try {
		await fetch(`${Api}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status }),
		})
		Users()
	} catch (error) {
		console.error('Ошибка при обновлении:', error)
	}
}

function ChechUserDel(data) {
	let find = false
	data.filter(el => {
		if (el.name == UserName && el.password == Password) {
			find = true
		}
	})
	if (!find) {
		location.href = "./Login.HTML"
	}
}

async function Edit_Every(id, obj) {
	try {
		await fetch(`${Api}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(obj),
		})
		Users()
	} catch (error) {
		console.error('Ошибка при обновлении:', error)
	}
}

let EditDialog = document.querySelector('.EditDialog')
let EditPersonsForm = document.querySelector('.EditPersonForm')
let Img2 = document.querySelector('.Img2')

function Usering(datas) {
	box.innerHTML = ''
	datas.reverse().forEach(el => {
		let card = document.createElement('div')
		card.style.backgroundColor = 'lightblue'
		card.classList.add('card')
		let name = document.createElement('h1')
		name.innerHTML = el.name
		let id = document.createElement('h2')
		id.innerHTML = el.ides
		let status = document.createElement('h2')
		status.innerHTML = el.status ? 'Active' : 'Not active'
		let By_user = document.createElement('h1')
		By_user.innerHTML = `By: ${el.by_name}`
		let image = document.createElement('img')
		let Actions = document.createElement('div')
		let Del = document.createElement('button')
		Del.innerHTML = 'Delete'
		Del.onclick = () => {
			DeleteCard(el.id)
		}

		let Edit = document.createElement('button')
		Edit.innerHTML = 'Edit'
		Edit.onclick = () => {
			EditDialog.showModal()
			EditPersonsForm['Name'].value = el.name
			EditPersonsForm['Image'].value = el.img
			Img2.src = el.img
			EditPersonsForm.onsubmit = e => {
				e.preventDefault()
				EditPersonsForm['Image'].oninput = () => {
					Img2.src =
						EditPersonsForm['Image'].value ||
						'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3'
				}
				Img2.onerror = () => {
					Img2.src =
						'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3'
				}
				let obj = {
					ides: Date.now(),
					name: EditPersonsForm['Name'].value,
					img: EditPersonsForm['Image'].value,
					status: el.status,
				}
				Edit_Every(el.id, obj)
				EditDialog.close()
			}
		}
		let checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.checked = el.status
		checkbox.onclick = () => {
			UpdateStatus(el.id, !el.status)
		}
		Actions.append(Del, Edit, checkbox)
		image.src = el.img
		if (el.status) {
			image.style.border = '5px solid green'
		} else {
			image.style.border = '5px solid red'
		}
		card.append(image, By_user, name, id, status, Actions)
		box.appendChild(card)
	})
}
let User_Name = document.querySelector('.User_Name')
Users()
setInterval(() => {
	Password = localStorage.getItem('Password')
	UserName = localStorage.getItem('UserName')
	User_Name.innerHTML = localStorage.getItem('UserName')
	Users()
	CheckUsers()
	if (!Password && !UserName) {
		location.href = './Login.HTML'
	}
}, 3000)
