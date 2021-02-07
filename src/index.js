
const table = document.querySelector("table")
const form = document.querySelector("#dog-form")
const nameField = document.querySelector("[name='name'")
const breedField = document.querySelector("[name='breed'")
const sexField = document.querySelector("[name='sex'")
const submit = form.querySelector("[type='submit'")
const baseUrl = 'http://localhost:3000/dogs'

const makeTable = _ => {
  fetch(baseUrl)
  .then(response => response.json() )
  .then( dogs => {
    dogs.forEach( dog => {
      let row = document.createElement("tr")
      let name = document.createElement("td")
      let breed = document.createElement("td")
      let sex = document.createElement("td")
      let edit = document.createElement("button")

      row.dataset.id = dog.id
      name.textContent = dog.name
      breed.textContent = dog.breed
      sex.textContent = dog.sex
      edit.textContent = "Edit"
      edit.className = "edit-button"

      row.append(name, breed, sex, edit)
      table.querySelector('tbody').append(row)      
    })
  } )
}

makeTable()

const fillForm = id => {
  fetch(baseUrl+`/${id}`)
  .then(response => response.json() )
  .then(data => {
    nameField.value = data.name
    breedField.value = data.breed
    sexField.value = data.sex
    form.dataset.id = data.id
  } )
}

const updateDog = id => {
  
  let data = {
    name: nameField.value,  
    breed: breedField.value,
    sex: sexField.value
  }

  config = {
    "method":"PATCH",
    "headers": {
      "Content-type":"application/json"
    },
    "body": JSON.stringify(data)
  }

  fetch(baseUrl+`/${id}`, config)
  .then(response => response.json() )
  .then( data => {
    Array.from(table.querySelector('tbody').children).forEach(child => child.remove())
    makeTable() 
  })
}

const handleClicks = e => {
  switch (true) {
    case (e.target.className === "edit-button"):
      fillForm(e.target.closest('tr').dataset.id)
      break
    case (e.target === submit):
      e.preventDefault()
      updateDog(e.target.closest('form').dataset.id)
      break
  }
}

table.addEventListener('click', handleClicks)
submit.addEventListener('click', handleClicks)
