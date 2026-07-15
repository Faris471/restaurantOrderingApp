import menu from './data.js'

const invoiceArray = []
const appMenu = document.getElementById('app-menu')
const myMain = document.getElementById('main')
const myInvoice = document.getElementById('invoice')
const myFooter = document.getElementById('footer')

document.addEventListener('click',(e) => {
    if (e.target.classList.contains('fa-ellipsis-vertical')){
        appMenu.classList.toggle('hidden')
    }
    if(e.target.dataset.id) {
        console.log('clicked')
        invoiceReader(e.target.dataset.id)
    }
})

function invoiceReader (itemId){
    // data att. values always string
    const targetObj = menu.find(item => item.id === Number(itemId))
    invoiceArray.push(targetObj)
    invoiceHtml()
}

function menuHtml (){
    const menuString = menu.map((menuItem) => {
        const {emoji, name, ingredients, price ,id} = menuItem
        return `
        <div id="${id}" class="menu-item">
            <div class="item-image">
                <span>${emoji}</span>
            </div>
            <div class="item-description">
                <p class="item-name">${name}</p>
                <p class="item-ingredients">${ingredients.join(', ')}</p>
                <p class="item-price">$${price}</p>
            </div>
            <div class="item-add-button">
                <i class="fa-solid fa-plus"
                data-id="${id}"></i>
            </div>
        </div>
        `
    }).join('')
    return menuString
}

function invoiceHtml (){
    console.log('here')
        const invoiceString = invoiceArray.map((item) => {
            return `
            <div class="invoice-item">
                <p>${item.name}</p>
                <span>remove</span>
                <p>$${item.price}</p>
            </div>
            `
        }).join('')
        myInvoice.innerHTML = invoiceString
        myFooter.classList.remove('hidden')
}

function render (){
    myMain.innerHTML = menuHtml()
}

render()