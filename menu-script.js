// объект для хранения выбранных блюд
let selectedDishes = {
    soup: null,    
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// объект для хранения активных фильтров
let activeFilters = {
    soup: "all",
    main: "all", 
    salad: "all",
    drink: "all",
    dessert: "all"
};

// функция для создания карточки блюда
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.dataset.dish = dish.keyword;
    card.dataset.category = dish.category;
    card.dataset.kind = dish.kind;
    
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

function filterDishes(category, filterKind) {
    // обновляем активный фильтр
    activeFilters[category] = filterKind;
    
    // находим нужную сетку для этой категории
    let grid;
    switch(category) {
        case 'soup': grid = document.getElementById('soups-grid'); break;
        case 'main': grid = document.getElementById('main-grid'); break;
        case 'salad': grid = document.getElementById('salads-grid'); break;
        case 'drink': grid = document.getElementById('drinks-grid'); break;
        case 'dessert': grid = document.getElementById('desserts-grid'); break;
        default: return;
    }
    
    if (!grid) return;
    
    // получаем все карточки в этой сетке
    const cards = grid.querySelectorAll('.dish-card');
    
    // применяем фильтр к каждой карточке
    cards.forEach(card => {
        if (filterKind === 'all' || card.dataset.kind === filterKind) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    
    // обновляем активную кнопку
    updateActiveFilterButton(category, filterKind);
}
function updateActiveFilterButton(category, filterKind) {
    // находим все кнопки в нужной секции
    let section;
    switch(category) {
        case 'soup': section = document.getElementById('soups-section'); break;
        case 'main': section = document.getElementById('main-section'); break;
        case 'salad': section = document.getElementById('salads-section'); break;
        case 'drink': section = document.getElementById('drinks-section'); break;
        case 'dessert': section = document.getElementById('desserts-section'); break;
        default: return;
    }
    
    if (!section) return;
    
    const filterBtns = section.querySelectorAll('.filter-btn');
    
    // снимаем выделение со всех кнопок
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // выделяем нужную кнопку
    filterBtns.forEach(btn => {
        if (btn.dataset.kind === filterKind) {
            btn.classList.add('active');
        }
    });
}

function setupFilters() {
    // находим все кнопки фильтров
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // для каждой кнопки добавляем обработчик
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // определяем категорию по id родительской секции
            const section = this.closest('section');
            let category;
            
            switch(section.id) {
                case 'soups-section': category = 'soup'; break;
                case 'main-section': category = 'main'; break;
                case 'salads-section': category = 'salad'; break;
                case 'drinks-section': category = 'drink'; break;
                case 'desserts-section': category = 'dessert'; break;
                default: return;
            }
            
            // получаем тип фильтра
            const filterKind = this.dataset.kind;
            
            // если кликнули на уже активный фильтр - снимаем фильтр
            if (activeFilters[category] === filterKind && filterKind !== 'all') {
                filterDishes(category, 'all');
            } else {
                filterDishes(category, filterKind);
            }
        });
    });
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
        salad: { title: 'Салаты и стартеры', emptyText: 'Салат не выбран' },
        drink: { title: 'Напитки', emptyText: 'Напиток не выбран' },
        dessert: { title: 'Десерты', emptyText: 'Десерт не выбран' }
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
        salad: sortedDishes.filter(d => d.category === 'salad'),
        drink: sortedDishes.filter(d => d.category === 'drink'),
        dessert: sortedDishes.filter(d => d.category === 'dessert')
    };
    
    for (const category in dishesByCategory) {
        let gridId;
        switch(category) {
            case 'soup': gridId = 'soups-grid'; break;
            case 'main': gridId = 'main-grid'; break;
            case 'salad': gridId = 'salads-grid'; break;
            case 'drink': gridId = 'drinks-grid'; break;
            case 'dessert': gridId = 'desserts-grid'; break;
            default: continue;
        }
        
        const grid = document.getElementById(gridId);
        if (!grid) continue;
        
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
            alert('Пожалуйста, выберите блюда из всех обязательных категорий!');
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
        
        if (selectedDishes.salad) {
            document.getElementById('selected-salad').value = selectedDishes.salad.dish.keyword;
        }
        if (selectedDishes.dessert) {
            document.getElementById('selected-dessert').value = selectedDishes.dessert.dish.keyword;
        }
        
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

// инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // отображаем блюда
    displayDishes();
    
    // настраиваем фильтры
    setupFilters();
    
    // настраиваем форму
    setupForm();
    
    // инициализируем отображение заказа
    updateOrderDisplay();
    
    console.log('Страница меню загружена. Блюд в массиве:', dishes.length);
});