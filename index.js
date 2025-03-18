let addBtn = document.getElementById("add-btn")
let modalOverlay = document.getElementById("overlay-modal")
let closeBtn = document.getElementById("close-btn")
let resourceNameInput = document.getElementById("resource-name")
let submitBtn = document.getElementById("submit-btn")
let resourceLinkinput = document.getElementById("resource-link")
let resourceDescriptioninput = document.getElementById("resource-description")
let form = document.getElementById("form")
let cardSection = document.getElementById("card-section")









//Display Overlay
addBtn.addEventListener("click", overlayDisplay)

function overlayDisplay() {
    modalOverlay.style.visibility = "visible"
    resourceNameInput.focus()
}


//Close Overlay
closeBtn.addEventListener("click", overlayClose)

function overlayClose() {
    modalOverlay.style.visibility = "hidden"
}


//Close Overlay on outside click

window.addEventListener("click", outsideClick)
function outsideClick(event) {
    if (event.target == modalOverlay) {
        modalOverlay.style.visibility = "hidden"
    }
}



//Form Data store in local storage

let researchResources = []

form.addEventListener("submit", formData)
function formData(event) {
    event.preventDefault()
    let resourceName = resourceNameInput.value
    let resourceLink = resourceLinkinput.value
    let resourceDescription = resourceDescriptioninput.value

    const resourceData = {
        name: resourceName,
        link: resourceLink,
        description: resourceDescription
    }

    researchResources.push(resourceData)
    localStorage.setItem("resourceItems", JSON.stringify(researchResources))

    form.reset()
    overlayClose()
    displayResourceItems()
}


//Rerieve data from local storage

function getResourceItems() {
    if (localStorage.getItem("resourceItems")) {
        researchResources = JSON.parse(localStorage.getItem("resourceItems"))
    }
    displayResourceItems()
}

getResourceItems()

//Display data in the UI

function displayResourceItems() {
    cardSection.innerHTML = ""
    researchResources.forEach((item) => {
        let uiResName = item.name
        let uiResLink = item.link
        let uiResDescription = item.description

        let cardDiv = document.createElement("div")
        cardDiv.classList.add("card")

        let crdHead = document.createElement("div")
        crdHead.classList.add("crd-hd")

        let cardTitleDiv = document.createElement("div")
        cardTitleDiv.classList.add("crd-title")

        let cardTitle = document.createElement("a")
        cardTitle.setAttribute("href", `${uiResLink}`)
        cardTitle.setAttribute("target", `_blank`)
        cardTitle.textContent = uiResName

        let deleteBtnDiv = document.createElement('div')
        deleteBtnDiv.classList.add('crd-btn')

        let deleteBtn = document.createElement("i")
        deleteBtn.addEventListener("click", () => {
            deleteResourceItem(researchResources.indexOf(item))
        })
        deleteBtn.classList.add("fa-sharp", "fa-solid", "fa-trash")

        let descriptionDiv = document.createElement("div")
        descriptionDiv.classList.add("crd-description")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = uiResDescription

        //Append
        descriptionDiv.append(descriptionText)
        cardTitleDiv.append(cardTitle)
        deleteBtnDiv.append(deleteBtn)
        crdHead.append(cardTitleDiv, deleteBtnDiv)
        cardDiv.append(crdHead, descriptionDiv)
        cardSection.append(cardDiv)
    })
}



//Funvtion for delete icon

function deleteResourceItem(index) {
    researchResources.splice(index, 1);
    localStorage.setItem("resourceItems", JSON.stringify(researchResources));
    displayResourceItems();
}



























