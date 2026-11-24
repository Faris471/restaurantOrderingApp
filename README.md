# 🍕 Restaurant Ordering App

A restaurant menu and checkout flow built with vanilla JavaScript, as part of the Scrimba Frontend Developer Career Path.

**🔗 Live demo:** https://faris471.github.io/restaurantOrderingApp/

## Features

- Menu rendered dynamically from a data file (`data.js`)
- Add items to your order and remove them from the invoice
- Running order total
- Checkout form (name, card number, CVV) in a modal
- Personalised "Thanks, {name}! Your order is on its way!" message
- Clear the whole order with one click
- Dark mode, toggled from the ⋮ app menu

> This is a practice project. The payment form is not connected to anything, so don't enter real card details.

## Built with

- HTML5 & CSS3
- JavaScript (ES6 modules)
- [uuid](https://www.npmjs.com/package/uuid) for unique invoice item IDs
- [Font Awesome](https://fontawesome.com/) icons

## Run it locally

```bash
git clone https://github.com/Faris471/restaurantOrderingApp.git
cd restaurantOrderingApp
```

Then open `index.html` with a local server (for example the VS Code **Live Server** extension). ES modules don't load from `file://`.

## What I learned

- Event delegation with a single `click` listener and `data-*` attributes
- Splitting data from logic with ES modules
- Rendering lists from arrays with template literals
- Handling forms with `FormData` and `preventDefault()`
- Toggling UI state (modals, dark mode) with CSS classes

## Next steps

- [ ] Order history (the menu item is already there)
- [ ] Save the current order in Local Storage
- [ ] Discount when ordering a meal combo
