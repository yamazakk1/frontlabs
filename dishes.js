const dishes = [
    // Супы (6 шт, по 2 каждого вида)
    {
        keyword: "borsh",
        name: "Борщ",
        price: 350,
        category: "soup",
        count: "400 мл",
        image: "images/borsh.jpg",
        kind: "meat" // мясной
    },
    {
        keyword: "solyanka",
        name: "Солянка сборная мясная",
        price: 380,
        category: "soup",
        count: "400 мл",
        image: "images/solyanka.jpg",
        kind: "meat" // мясной
    },
    {
        keyword: "chicken-soup",
        name: "Куриный суп с лапшой",
        price: 320,
        category: "soup",
        count: "400 мл",
        image: "images/chicken-soup.jpg",
        kind: "meat" // мясной (курица считается мясом)
    },
    {
        keyword: "vegetable-soup",
        name: "Овощной суп-пюре",
        price: 300,
        category: "soup",
        count: "350 мл",
        image: "images/vegetable-soup.jpg",
        kind: "veg" // вегетарианский
    },
    {
        keyword: "fish-soup",
        name: "Уха царская",
        price: 400,
        category: "soup",
        count: "400 мл",
        image: "images/fish-soup.jpg",
        kind: "fish" // рыбный
    },
    {
        keyword: "mushroom-soup",
        name: "Грибной крем-суп",
        price: 340,
        category: "soup",
        count: "350 мл",
        image: "images/mushroom-soup.jpg",
        kind: "veg" // вегетарианский
    },
    

    {
        keyword: "pelmeni",
        name: "Пельмени домашние",
        price: 450,
        category: "main",
        count: "300 г",
        image: "images/pelmeni.jpg",
        kind: "meat" // мясное
    },
    {
        keyword: "kotleta",
        name: "Котлета по-киевски",
        price: 550,
        category: "main",
        count: "250 г",
        image: "images/kotleta.jpg",
        kind: "meat" // мясное
    },
    {
        keyword: "steak",
        name: "Стейк из говядины",
        price: 750,
        category: "main",
        count: "300 г",
        image: "images/steak.jpg",
        kind: "meat" // мясное
    },
    {
        keyword: "pasta",
        name: "Паста карбонара",
        price: 420,
        category: "main",
        count: "350 г",
        image: "images/pasta.jpg",
        kind: "meat" // мясное (с беконом)
    },
    {
        keyword: "fish-dish",
        name: "Лосось на гриле",
        price: 480,
        category: "main",
        count: "250 г",
        image: "images/fish-dish.jpg",
        kind: "fish" // рыбное
    },
    {
        keyword: "chicken-dish",
        name: "Куриные бедра с овощами",
        price: 380,
        category: "main",
        count: "350 г",
        image: "images/chicken-dish.jpg",
        kind: "meat" // мясное
    },
    
    // Салаты и стартеры (6 шт: 1 рыбный, 1 мясной, 4 вегетарианских)
    {
        keyword: "caesar",
        name: "Цезарь с курицей",
        price: 320,
        category: "salad",
        count: "250 г",
        image: "images/caesar.jpg",
        kind: "meat" // мясной
    },
    {
        keyword: "shrimp-salad",
        name: "Салат с креветками",
        price: 380,
        category: "salad",
        count: "220 г",
        image: "images/shrimp-salad.jpg",
        kind: "fish" // рыбный
    },
    {
        keyword: "greek-salad",
        name: "Греческий салат",
        price: 280,
        category: "salad",
        count: "300 г",
        image: "images/greek-salad.jpg",
        kind: "veg" // вегетарианский
    },
    {
        keyword: "vegetable-salad",
        name: "Овощной салат",
        price: 240,
        category: "salad",
        count: "280 г",
        image: "images/vegetable-salad.jpg",
        kind: "veg" // вегетарианский
    },
    {
        keyword: "caprese",
        name: "Капрезе",
        price: 300,
        category: "salad",
        count: "200 г",
        image: "images/caprese.jpg",
        kind: "veg" // вегетарианский
    },
    {
        keyword: "olivier",
        name: "Оливье",
        price: 290,
        category: "salad",
        count: "270 г",
        image: "images/olivier.jpg",
        kind: "meat" // мясной (с колбасой)
    },
    
    // Напитки (6 шт: 3 холодных, 3 горячих)
    {
        keyword: "compote",
        name: "Компот ягодный",
        price: 150,
        category: "drink",
        count: "300 мл",
        image: "images/compote.jpg",
        kind: "cold" // холодный
    },
    {
        keyword: "lemonade",
        name: "Домашний лимонад",
        price: 180,
        category: "drink",
        count: "400 мл",
        image: "images/lemonade.jpg",
        kind: "cold" // холодный
    },
    {
        keyword: "tea",
        name: "Чай черный/зеленый",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "images/tea.jpg",
        kind: "hot" // горячий
    },
    {
        keyword: "coffee",
        name: "Кофе латте",
        price: 200,
        category: "drink",
        count: "250 мл",
        image: "images/coffee.jpg",
        kind: "hot" // горячий
    },
    {
        keyword: "juice",
        name: "Сок апельсиновый",
        price: 160,
        category: "drink",
        count: "300 мл",
        image: "images/juice.jpg",
        kind: "cold" // холодный
    },
    {
        keyword: "mineral-water",
        name: "Минеральная вода",
        price: 100,
        category: "drink",
        count: "500 мл",
        image: "images/mineral-water.jpg",
        kind: "cold" // холодный
    },
    
    // Десерты (6 шт: 3 маленьких, 2 средних, 1 большой)
    {
        keyword: "tiramisu",
        name: "Тирамису",
        price: 280,
        category: "dessert",
        count: "150 г",
        image: "images/tiramisu.jpg",
        kind: "small" // маленькая порция
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк",
        price: 320,
        category: "dessert",
        count: "180 г",
        image: "images/cheesecake.jpg",
        kind: "medium" // средняя порция
    },
    {
        keyword: "chocolate-cake",
        name: "Шоколадный торт",
        price: 350,
        category: "dessert",
        count: "200 г",
        image: "images/chocolate-cake.jpg",
        kind: "large" // большая порция
    },
    {
        keyword: "ice-cream",
        name: "Мороженое пломбир",
        price: 180,
        category: "dessert",
        count: "120 г",
        image: "images/ice-cream.jpg",
        kind: "small" // маленькая порция
    },
    {
        keyword: "pancakes",
        name: "Блины с вареньем",
        price: 240,
        category: "dessert",
        count: "250 г",
        image: "images/pancakes.jpg",
        kind: "medium" // средняя порция
    },
    {
        keyword: "fruit-salad",
        name: "Фруктовый салат",
        price: 220,
        category: "dessert",
        count: "220 г",
        image: "images/fruit-salad.jpg",
        kind: "small" // маленькая порция
    }
];