let selectedDishes = {
    soup: null,    
    main: null,
    drink: null
};

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.dataset.dish = dish.keyword;
    card.dataset.category = dish.category;
    
    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="dish-price">${dish.price} руб.</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button class="add-btn">Добавить</button>
    `;
    
    const img = card.querySelector('img');
    img.style.cursor = 'pointer';
    img.addEventListener('click', function(event) {
        event.stopPropagation();
        addOrUpdateDish(dish);
    });
    
    const addBtn = card.querySelector('.add-btn');
    addBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        addOrUpdateDish(dish);
    });
    
    card.addEventListener('click', function() {
        addOrUpdateDish(dish);
    });
    
    return card;
}

function addOrUpdateDish(dish) {
    const category = dish.category;
    
    if (selectedDishes[category] && selectedDishes[category].dish.keyword === dish.keyword) {
        selectedDishes[category].quantity += 1;
    } else {
        selectedDishes[category] = {
            dish: dish,
            quantity: 1
        };
    }
    
    updateOrderDisplay();
    updateSelectedCards();
}

function removeDish(category) {
    selectedDishes[category] = null;
    updateOrderDisplay();
    updateSelectedCards();
}

function changeQuantity(category, delta) {
    if (!selectedDishes[category]) return;
    
    selectedDishes[category].quantity += delta;
    
    if (selectedDishes[category].quantity <= 0) {
        removeDish(category);
    } else {
        updateOrderDisplay();
        updateSelectedCards();
    }
}

function setQuantity(category, newQuantity) {
    if (!selectedDishes[category]) return;
    
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
        updateOrderDisplay();
        return;
    }
    
    selectedDishes[category].quantity = quantity;
    updateOrderDisplay();
    updateSelectedCards();
}

function updateOrderDisplay() {
    const orderContent = document.getElementById('order-content');
    const totalBlock = document.getElementById('total-block');
    
    const categoryNames = {
        soup: { title: 'Супы', emptyText: 'Суп не выбран' },
        main: { title: 'Главные блюда', emptyText: 'Основное блюдо не выбрано' },
        drink: { title: 'Напитки', emptyText: 'Напиток не выбран' }
    };
    
    let hasSelected = false;
    let totalPrice = 0;
    let orderHTML = '';
    
    for (const category in categoryNames) {
        const selected = selectedDishes[category];
        
        orderHTML += `<div class="order-category">`;
        orderHTML += `<h3>${categoryNames[category].title}</h3>`;
        
        if (selected) {
            hasSelected = true;
            const itemPrice = selected.dish.price * selected.quantity;
            totalPrice += itemPrice;
            
            orderHTML += `
                <div class="selected-item" data-category="${category}">
                    <div class="item-info">
                        <div class="name">${selected.dish.name}</div>
                        <div class="price">${selected.dish.price} руб. × ${selected.quantity} = ${itemPrice} руб.</div>
                    </div>
                    <div class="item-controls">
                        <button class="quantity-btn minus-btn">−</button>
                        <input type="number" class="quantity-input" value="${selected.quantity}" min="1" max="99">
                        <button class="quantity-btn plus-btn">+</button>
                        <button class="remove-btn">Удалить</button>
                    </div>
                </div>
            `;
        } else {
            orderHTML += `<p class="empty-category">${categoryNames[category].emptyText}</p>`;
        }
        
        orderHTML += `</div>`;
    }
    
    if (!hasSelected) {
        orderHTML = '<div class="empty-order">Ничего не выбрано</div>';
        totalBlock.classList.add('hidden');
    } else {
        totalBlock.classList.remove('hidden');
        document.getElementById('total-price').textContent = `${totalPrice} руб.`;
    }
    
    orderContent.innerHTML = orderHTML;
    
    if (hasSelected) {
        addOrderEventListeners();
    }
}

function addOrderEventListeners() {
    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.selected-item').dataset.category;
            changeQuantity(category, -1);
        });
    });
    
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.selected-item').dataset.category;
            changeQuantity(category, 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.selected-item').dataset.category;
            removeDish(category);
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const category = this.closest('.selected-item').dataset.category;
            setQuantity(category, this.value);
        });
        
        input.addEventListener('blur', function() {
            const category = this.closest('.selected-item').dataset.category;
            setQuantity(category, this.value);
        });
    });
}

function updateSelectedCards() {
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    for (const category in selectedDishes) {
        if (selectedDishes[category]) {
            const dish = selectedDishes[category].dish;
            const card = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
            if (card) {
                card.classList.add('selected');
            }
        }
    }
}

function displayDishes() {
    const sortedDishes = [...dishes].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    
    const dishesByCategory = {
        soup: sortedDishes.filter(d => d.category === 'soup'),
        main: sortedDishes.filter(d => d.category === 'main'),
        drink: sortedDishes.filter(d => d.category === 'drink')
    };
    
    for (const category in dishesByCategory) {
        const gridId = category === 'soup' ? 'soups-grid' : 
                      category === 'main' ? 'main-grid' : 'drinks-grid';
        const grid = document.getElementById(gridId);
        
        grid.innerHTML = '';
        
        dishesByCategory[category].forEach(dish => {
            grid.appendChild(createDishCard(dish));
        });
    }
}

function setupForm() {
    const form = document.getElementById('order-form');
    const specificTimeInput = document.getElementById('specific-time');
    const timeAsapRadio = document.getElementById('time-asap');
    const timeSpecificRadio = document.getElementById('time-specific');
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = (Math.ceil(now.getMinutes() / 5) * 5).toString().padStart(2, '0');
    specificTimeInput.value = `${hours}:${minutes}`;
    
    timeAsapRadio.addEventListener('change', function() {
        specificTimeInput.disabled = true;
        specificTimeInput.removeAttribute('required');
    });
    
    timeSpecificRadio.addEventListener('change', function() {
        specificTimeInput.disabled = false;
        specificTimeInput.setAttribute('required', 'required');
    });
    
    timeAsapRadio.checked = true;
    specificTimeInput.disabled = true;
    specificTimeInput.removeAttribute('required');
    
    form.addEventListener('submit', function(event) {
        if (!selectedDishes.soup || !selectedDishes.main || !selectedDishes.drink) {
            alert('Пожалуйста, выберите блюда из всех категорий!');
            event.preventDefault();
            return;
        }
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        
        if (!nameInput.value || !emailInput.value || !phoneInput.value || !addressInput.value) {
            alert('Пожалуйста, заполните все обязательные поля!');
            event.preventDefault();
            return;
        }
        
        if (timeSpecificRadio.checked && specificTimeInput.value) {
            const timeValue = specificTimeInput.value;
            const [hours, minutes] = timeValue.split(':').map(Number);
            
            if (hours < 7 || hours > 23 || (hours === 23 && minutes > 0)) {
                alert('Время доставки должно быть между 07:00 и 23:00!');
                event.preventDefault();
                return;
            }
        }
        
        document.getElementById('selected-soup').value = selectedDishes.soup.dish.keyword;
        document.getElementById('selected-main').value = selectedDishes.main.dish.keyword;
        document.getElementById('selected-drink').value = selectedDishes.drink.dish.keyword;
        
        
        alert('Заказ отправлен! После отправки вы будете перенаправлены на страницу подтверждения.');

    });
    
    form.addEventListener('reset', function() {
        setTimeout(() => {
            timeAsapRadio.checked = true;
            specificTimeInput.disabled = true;
            specificTimeInput.removeAttribute('required');
            
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = (Math.ceil(now.getMinutes() / 5) * 5).toString().padStart(2, '0');
            specificTimeInput.value = `${hours}:${minutes}`;
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayDishes();
    
    setupForm();
    
    updateOrderDisplay();
    
    console.log('Страница меню загружена. Блюд в массиве:', dishes.length);
});