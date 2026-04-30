export function fetchProducts() {
    return [
        { id: 1, name: "Spritz", price: 8, cost: 2.2 },
        { id: 2, name: "Mojito", price: 10, cost: 2.5 },
        { id: 3, name: "Negroni", price: 9, cost: 2.8 },
        { id: 4, name: "Birra", price: 5, cost: 1.5 },
        { id: 5, name: "Gin Tonic", price: 9, cost: 2.3 },
        { id: 6, name: "Americano", price: 8, cost: 2.0 },
        { id: 7, name: "Coca Cola", price: 3, cost: 0.5 },
        { id: 8, name: "Acqua", price: 2, cost: 0.3 },

        { id: 9, name: "Hugo Spritz", price: 9, cost: 2.4 },
        { id: 10, name: "Moscow Mule", price: 10, cost: 2.7 },
        { id: 11, name: "Caipirinha", price: 9, cost: 2.6 },
        { id: 12, name: "Whiskey Cola", price: 8, cost: 2.2 },
        { id: 13, name: "Vodka Lemon", price: 8, cost: 2.1 },
        { id: 14, name: "Tequila Sunrise", price: 10, cost: 2.9 },
        { id: 15, name: "Long Island", price: 12, cost: 3.5 },

        { id: 16, name: "Birra Artigianale", price: 7, cost: 2.8 },
        { id: 17, name: "Vino Rosso Calice", price: 6, cost: 2.0 },
        { id: 18, name: "Vino Bianco Calice", price: 6, cost: 2.0 },
        { id: 19, name: "Prosecco Calice", price: 6, cost: 1.8 },

        { id: 20, name: "Caffè", price: 1.5, cost: 0.2 },
        { id: 21, name: "Cappuccino", price: 2.5, cost: 0.5 },
        { id: 22, name: "Latte Macchiato", price: 3, cost: 0.6 },

        { id: 23, name: "Tè Freddo", price: 3, cost: 0.7 },
        { id: 24, name: "Red Bull", price: 4, cost: 1.5 },
        { id: 25, name: "Succo Arancia", price: 3, cost: 0.8 },
        { id: 26, name: "Succo Pesca", price: 3, cost: 0.8 },

        { id: 27, name: "Panino", price: 5, cost: 2.0 },
        { id: 28, name: "Toast", price: 4, cost: 1.5 },
        { id: 29, name: "Tagliere", price: 12, cost: 5.0 },
        { id: 30, name: "Patatine", price: 4, cost: 1.2 },
    ];
}

export function fetchIngredients() {
    return [
        { id: 1, name: "Aperol", cost: 0.8, stock: 12, stockMin: 5, costUnit: 0.4 },
        { id: 2, name: "Prosecco", cost: 1.2, stock: 20, stockMin: 8, costUnit: 0.6 },
        { id: 3, name: "Soda", cost: 0.2, stock: 30, stockMin: 10, costUnit: 0.1 },
        { id: 4, name: "Rum", cost: 1.5, stock: 10, stockMin: 4, costUnit: 0.75 },
        { id: 5, name: "Menta", cost: 0.3, stock: 5, stockMin: 3, costUnit: 0.15 },
        { id: 6, name: "Zucchero", cost: 0.2, stock: 15, stockMin: 5, costUnit: 0.1 },
        { id: 7, name: "Lime", cost: 0.5, stock: 8, stockMin: 4, costUnit: 0.25 },
        { id: 8, name: "Gin", cost: 1.4, stock: 3, stockMin: 4, costUnit: 0.7 },
        { id: 9, name: "Campari", cost: 1.0, stock: 11, stockMin: 5, costUnit: 0.5 },
        { id: 10, name: "Vermouth", cost: 0.9, stock: 7, stockMin: 3, costUnit: 0.45 },
    ]
}

export function fetchOrders() {
    return [
        {
            id: 1,
            name: "T1",
            orderItems: [
                {
                    id: 1,
                    name: "Spritz",
                    price: 8,
                    cost: 2.2,
                    qty: 2,
                },
            ],
        },
        {
            id: 2,
            name: "T2",
            orderItems: [
                {
                    id: 2,
                    name: "Mojito",
                    price: 10,
                    cost: 2.5,
                    qty: 1,
                },
            ],
        },
        {
            id: "3",
            name: "T3",
            orderItems: [
                {
                    id: 3,
                    name: "Negroni",
                    price: 9,
                    cost: 2.8,
                    qty: 3,
                },
            ],
        },
    ];
}