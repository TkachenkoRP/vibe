const readline = require('node:readline/promises')

async function askNumber(rl, prompt) {
    const raw = await rl.question(prompt);
    const n = Number(raw);
    return n;
}

function ticketPrice(category) {
    switch (category) {
        case 1:
            return 300;
        case 2:
            return 500;
        case 3:
            return 900;
        default:
            return 0;
    }
}

function maxTickets(budget, price) {
    if (price <= 0 || budget < 0) {
        return 0;
    }
    let count = 0;
    while (budget >= price) {
        count++;
        budget -= price;
    }
    return count;
}

function printTicketResult(category, budget) {
    let price = ticketPrice(category);
    if (price === 0) {
        console.log('неизвестная категория');
        return;
    }
    let ticketsCount = maxTickets(budget, price);
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${ticketsCount} шт.`);
}

function deliveryPrice(distance, total) {
    if (total >= 3000 || distance <= 3) {
        return 0;
    }

    if (distance <= 10) {
        return 200;
    }

    return 200 + 25 * (distance - 10);
}

function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total);
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {

    let count = 0;

    for (let i = 1; i <= height; i++) {
        if (i === 4) {
            continue;
        }
        if (i > 10) {
            console.log(`Дальше лестница не построена`);    
            break;
        }
        console.log(`Ступень ${i}`);
        count++;
    }

    console.log(`Всего построено: ${count}`);
}

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    console.log('Выберите задачу:');
    console.log('1 — билетная касса');
    console.log('2 — доставка заказа');
    console.log('3 — лестница');

    const action = await askNumber(rl, 'Ваш выбор: ');

    switch (action) {
        case 1: {
            const category = await askNumber(rl, 'Категория билета: ');
            const budget = await askNumber(rl, 'Бюджет: ');
            printTicketResult(category, budget);
            break;
        }
        case 2: {
            const distance = await askNumber(rl, 'Расстояние: ');            
            const total = await askNumber(rl, 'Сумма заказа: ');
            printDelivery(distance, total);
            break;
        }
        case 3: {
            const height = await askNumber(rl, 'Высота лестницы: ');
            printSteps(height);
            break;
        }
        default: {            
            console.log('Такой задачи нет');
        }
    }
    
    rl.close();
}

main();