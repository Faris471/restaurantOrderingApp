import menu from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const invoiceArray = []
const appMenu = document.getElementById('app-menu')
const myMain = document.getElementById('main')
const myInvoice = document.getElementById('invoice')
const myInvoiceTotal = document.getElementById('invoice-total')
const myFooter = document.getElementById('footer')
const completeBtn = document.getElementById('complete-btn')
const submitBtn = document.getElementById('submit-btn')

document.addEventListener('click',(e) => {
    if (e.target.classList.contains('fa-ellipsis-vertical')){
        appMenu.classList.toggle('hidden')
    }
    if(e.target.dataset.id) {
        invoiceReader(e.target.dataset.id)
    }
    if(e.target.dataset.invoiceId) {
        console.log(e.target.dataset.invoiceId)
        invoiceRemoveItem(e.target.dataset.invoiceId)
    }
    if(e.target === completeBtn) {
        completeOrder()
    }
    if(e.target === submitBtn) {
        e.preventDefault()
        finishOrder()
    }
})

function finishOrder (){
    const myForm = document.getElementById("form-modal")
    myForm.classList.remove("flex-col")
    myForm.classList.add("hidden")
    myFooter.innerHTML = `
    <p>
        Thanks,Your order is on its way!
    </p>` 
}

function completeOrder (){
    const myForm = document.getElementById("form-modal")
    myForm.classList.add("flex-col")
    myForm.classList.remove("hidden")
}

function invoiceReader (itemId){
    // data att. values always string
    const targetObj = menu.find(item => item.id === Number(itemId))
    invoiceArray.push({
        item : targetObj,
        id : uuidv4()
    })
    invoiceHtml()
}

function invoiceRemoveItem (itemId){
    const targetObj = invoiceArray.find(obj => obj.id === itemId)
    invoiceArray.splice(invoiceArray.indexOf(targetObj),1)
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
        const invoiceString = invoiceArray.map((object) => {
            const {item, id} = object 
            return `
            <div class="invoice-item">
                <div class="invoice-item-handle">
                    <p>${item.name}</p>
                    <span data-invoice-id="${id}">remove</span>
                </div>
                <p>$${item.price}</p>
            </div>
            `
        }).join('')
        myInvoice.innerHTML = invoiceString
        myInvoiceTotal.innerHTML = `<div class="invoice-item">
                                        <p>Total Price:</p>
                                        <p>$${invoiceArray.reduce((total, obj) =>{return total += obj.item.price},0)}</p>
                                    </div>
                                    `
        myFooter.classList.remove('hidden')
        //console.log(invoiceArray)
}

function render (){
    myMain.innerHTML = menuHtml()
}

render()