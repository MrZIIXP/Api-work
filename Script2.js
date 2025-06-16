//Body
let body = document.querySelector('body')
//Massive of Todo list
let Massive = [
	{
		title: 'Do work',
		status: false,
		info: 'Do school work',
	},
]
let Massive_copy = [...Massive]
//Search
let Search = document.createElement('input')
Search.type = 'search'
Search.style.width = '100%'
Search.style.padding = '10px'
Search.style.borderRadius = '10px'
Search.placeholder = 'Search...'

Search.oninput = () => {
	if(Search.value.trim() != ""){
		Massive_copy = Massive.filter(el => {
			if(el.title.includes(Search.value)){
				return el
			}
		})
	}
	else{
		Massive_copy = [...Massive]
	}
	ShowMassive()
}
//Select
let Selector = document.createElement('select')
let Status_true = document.createElement('option')
let Status_false = document.createElement('option')
let Status_none = document.createElement('option')
Status_false.innerHTML = "Isn't Checked"
Status_none.innerHTML = 'none'
Status_true.innerHTML = 'Checked'
Selector.append(Status_none, Status_true, Status_false)
Selector.style.width = '68%'
Selector.style.padding = '10px'
Selector.style.fontSize = '20px'
Selector.style.borderRadius = '15px'
Selector.style.marginTop = '10px'
Selector.onchange = () => {
    if(Selector.value == "none") {
        Massive_copy = [...Massive];
    } 
    else if(Selector.value == "Checked") {
        Massive_copy = Massive.filter(el => el.status == true);
    } 
    else if(Selector.value == "Isn't Checked") {
        Massive_copy = Massive.filter(el => el.status == false);
    }
    
    ShowMassive();
};
//Dialog
let Dialog = document.createElement('dialog')
let InpArea = document.createElement('div')
let Inptitle = document.createElement('input')
let InpInfo = document.createElement('input')
let button_inp = document.createElement('button')
button_inp.innerHTML = 'Done'
let button_edit = document.createElement('button')
button_edit.innerHTML = 'Done'
InpArea.append(Inptitle, InpInfo, button_inp, button_edit)
InpArea.style.display = 'flex'
InpArea.style.flexDirection = 'column'
Dialog.appendChild(InpArea)
//Add
let AddButton = document.createElement('button')
AddButton.style.marginLeft = '20px'
AddButton.style.padding = '10px'
AddButton.style.borderRadius = '10px'
AddButton.style.width = '28.6%'
AddButton.innerHTML = 'Add List'
AddButton.onclick = () => {
	Dialog.showModal()
	button_edit.style.display = 'none'
	button_inp.style.display = 'block'
}
button_inp.onclick = () => {
	let obj = {
		title: Inptitle.value,
		info: InpInfo.value,
		status: false,
		ID: Date.now(),
	}
	if (obj.title.trim() != '') {
		Massive.unshift(obj)
		Massive_copy = [...Massive]
		Inptitle.value = ''
		InpInfo.value = ''
		Dialog.close()
	}
	ShowMassive()
}

//Table
let Table = document.createElement('table')
Table.style.marginTop = '20px'
Table.style.width = '100%'
let Thead = document.createElement('thead')
let Tbody = document.createElement('tbody')
//Thead
let TId = document.createElement('td')
TId.innerHTML = 'ID'
TId.style.width = '25px'
TId.style.textAlign = 'center'
let TTitle = document.createElement('td')
TTitle.innerHTML = 'Title'
let TStatus = document.createElement('td')
TStatus.innerHTML = 'Status'
TStatus.style.width = '20px'
let TActoins = document.createElement('td')
TActoins.innerHTML = 'Actions'
TActoins.style.width = '115px'
TActoins.style.textAlign = 'center'
let tr_THeat = document.createElement('tr')
tr_THeat.append(TId, TTitle, TStatus, TActoins)
Thead.appendChild(tr_THeat)
Table.append(Thead, Tbody)
//Info Dialog
let INFO = document.createElement('dialog')
let INFO_ID = document.createElement('h2')
let INFO_TITLE = document.createElement('h2')
let INFO_STATUS = document.createElement('h2')
let INFO_INFO = document.createElement('h2')
let INFO_DIV = document.createElement('div')
let Close_INFO = document.createElement('button')
Close_INFO.innerHTML = 'CLOSE'
INFO_DIV.append(INFO_ID, INFO_TITLE, INFO_INFO, INFO_STATUS, Close_INFO)
INFO_DIV.style.display = 'flex'
INFO_DIV.style.width = '300px'
INFO_DIV.style.flexDirection = 'column'
INFO.appendChild(INFO_DIV)

//Adding todos
function ShowMassive() {
	Tbody.innerHTML = ''
	Massive_copy.forEach((elem, id) => {
		let tr = document.createElement('tr')
		let Title = document.createElement('th')
		Title.innerHTML = elem.title
		let ID = document.createElement('th')
		ID.innerHTML = id + 1
		elem.ID = id + 1
		ID.style.textAlign = 'center'

		let Status = document.createElement('th')
		let chechbox = document.createElement('input')
		chechbox.type = 'checkbox'
		chechbox.checked = elem.status
		Status.style.textAlign = 'center'
		let Actions = document.createElement('th')
		let del = document.createElement('button')
		let edit = document.createElement('button')
		let info = document.createElement('button')
		del.innerHTML = 'del'
		edit.innerHTML = 'edit'
		info.innerHTML = 'info'
		//Del
		del.onclick = () => {
			Massive = Massive.filter(el => {
				if (el.ID != elem.ID) {
					return el
				}
			})
			Massive_copy = [...Massive]
			ShowMassive()
		}
		//Edit
		edit.onclick = () => {
			Dialog.showModal()
			Inptitle.value = elem.title
			InpInfo.value = elem.info
			button_edit.style.display = 'block'
			button_inp.style.display = 'none'
			button_edit.onclick = () => {
				elem.title = Inptitle.value
				elem.info = InpInfo.value
				Dialog.close()
				ShowMassive()
				Inptitle.value = ''
				InpInfo.value = ''
			}
		}

		info.onclick = () => {
			INFO.showModal()
			INFO_ID.innerHTML = `ID: ${elem.ID}`
			INFO_INFO.innerHTML = `INFO: ${elem.info}`
			INFO_STATUS.innerHTML = `STATUS: ${elem.status}`
			INFO_TITLE.innerHTML = `TITLE: ${elem.title}`
			Close_INFO.onclick = () => {
				INFO.close()
			}
		}
		chechbox.onclick = () => {
			if (!elem.status) {
				elem.status = true
			} else {
				elem.status = false
			}
		}

		Status.appendChild(chechbox)
		Actions.append(del, edit, info)
		tr.append(ID, Title, Status, Actions)
		Tbody.appendChild(tr)
	})
}
ShowMassive()
body.append(Search, Selector, AddButton, Dialog, INFO, Table)
