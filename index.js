import menu from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const invoiceArray = []
const appMenu = document.getElementById('app-menu')
const myMain = document.getElementById('main')
const myInvoice = document.getElementById('invoice')
const myInvoiceTotal = document.getElementById('invoice-total')
const myFooter = document.getElementById('footer')
const myForm = document.getElementById('card-form')
const completeBtn = document.getElementById('complete-btn')
const cancelBtn = document.getElementById('cancel-btn')
const submitBtn = document.getElementById('submit-btn')

myForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    finishOrder(myForm)
})

document.addEventListener('click',(e) => {
    if (e.target.classList.contains('fa-ellipsis-vertical')) {
        appMenu.classList.toggle('hidden')
    }
    if(e.target === cancelBtn || e.target.classList.contains('fa-trash-can')) {
        resetInvoice()
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
    if (e.target.parentElement.dataset.order){
        appMenuHandler(e.target.parentElement.dataset.order)
    }
})

function resetInvoice (){
    console.log('hidden')
    invoiceArray.length = 0
    myFooter.classList.toggle('hidden')
}

function appMenuHandler (stringValue){
    if (stringValue === "dark"){
        document.getElementById("html").classList.toggle("dark-mode")
        document.getElementById("app-menu").classList.toggle("dark-mode")
        document.getElementById("form-modal").classList.toggle("dark-mode")
    }
}

function finishOrder (form){ 
    const myForm = document.getElementById("form-modal")
    const data = new FormData(form)

    const greets = document.getElementById("greets")
    
    myForm.classList.toggle("hidden")
    document.getElementById("invoice-items").classList.toggle("hidden")
    invoiceArray.length = 0
    greets.innerHTML = `
    Thanks, ${data.get("name")}! Your order is on its way!
    `
    document.getElementById("order-greeting").classList.toggle("hidden")
    setTimeout(function(){
       document.getElementById("order-greeting").classList.toggle("hidden") 
    },5000)
}

function completeOrder (){
    const myForm = document.getElementById("form-modal")
    myForm.classList.remove("hidden")
}

function invoiceReader (itemId){
    console.log("hello")
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
    if(invoiceArray.length >= 1) {
        invoiceHtml()
    } else {
        myFooter.classList.toggle('hidden')
    }
}

function menuHtml (){
    const menuString = menu.map((menuItem) => {
        const {emoji, name, ingredients, price ,id} = menuItem
        return `
        <div id="${id}" class="menu-item">
            <div class="item-image">
                ${emoji}
            </div>
            <div class="item-description">
                <div class="item-name bold">${name}</div>
                <div class="item-ingredients light">${ingredients.join(', ')}</div>
                <div class="item-price bold">$${price}</div>
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
    console.log("hello")
    const invoiceString = invoiceArray.map((object) => {
        const {item, id} = object 
        return `
        <div class="invoice-item">
            <div class="invoice-item-handle">
                <div class="bold">${item.name}</div>
                <span class="light" data-invoice-id="${id}">remove</span>
            </div>
            <div class="bold">$${item.price}</div>
        </div>
        `
    }).join('')
    myInvoice.innerHTML = invoiceString
    myInvoiceTotal.innerHTML = `<div class="invoice-item bold">
                                    <p>Total Price:</p>
                                    <p>$${invoiceArray.reduce((total, obj) =>{return total += obj.item.price},0)}</p>
                                </div>
                                `
    myFooter.classList.remove('hidden')
}

function render (){
    myMain.innerHTML = menuHtml()
}

render()