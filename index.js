import menu from './data.js'

const appMenu = document.getElementById('app-menu')
const myMain = document.getElementById('main')

document.addEventListener('click',(e) => {
    if (e.target.classList.contains('fa-ellipsis-vertical')){
        appMenu.classList.toggle('hidden')
    }
})

function menuHtml (){
    return menu.map((menuItem) => {
        `
        <div class="menu-item">
            <div class="item-image">
                <image src="" alt="">
            </div>
            <div class="item-description">

            </div>
            <div class="item-add-button">

            </div>
            <hr>
        </div>
        `
    }).join('')
}