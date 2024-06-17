const {writeJSONFile, readJSONFile} = require('./helpers');
const {nanoid} = require("nanoid");
const carPriceInCents = require('../data/carPoints.json');
const notify = console.log;

const create = (cars, carName) => {
    const car = {
        name: carName,
        id: nanoid(5),
        priceInCents: carPriceInCents[carName] || parseFloat(Math.random().toFixed(3)),
        inStock: true || false
    };
    cars.push(car);
    notify("Car is added to the Inventory");
    return cars;
}

const index = (cars) => {
    notify("This is the list of Cars in Inventory:")
    return cars.map((car) => `${car.id}: ${car.name}`).join('\n');
}

const show = (cars, carId) => {
    const car = cars.find((car) => car.id === carId);
    notify("This is the Car you're looking for from Inventory:")
    return `${car.id}: ${car.name} cost ${car.priceInCents} Cents, and in stock check ${car.inStock}`
}

const destroy = (cars, carId) => {
    const index = cars.findIndex((car) => car.id === carId);
    if(index > -1) {
        cars.splice(index, 1);
        notify("Car is successfully removed from the inventory");
    } else {
        notify("Car is not found in Inventory, no action was taken.");
    }
    return cars;
}

const update = (cars, carId, updatedCar) => {
    const index = cars.findIndex((car) => car.id === carId);
    if(index > -1) {
        // cars[index].id = carId;
        cars[index].name = updatedCar;
        cars[index].priceInCents = carPriceInCents[updatedCar] || parseFloat(Math.random().toFixed(3));
        notify("Car is successfully updated in Inventory");
    } else {
        notify("Car is not found in Inventory, no action was taken.");
    }
    return cars;
}


const addCarToCart = (cars, carId) => {
    let shoppingCart = readJSONFile("./data", "cart.json");
    const car = cars.find((key) => key.id === carId);
    if(car) {
        const index = shoppingCart.find((carInCart) => carInCart.id === carId);
        if(index) {
            index.quantity += 1;
        } else {
            shoppingCart.push({...car, quantity: 1});
        }
        writeJSONFile("./data", "cart.json", shoppingCart);
        return `Added ${car.name} to the cart.`;
    } else {
        `Car with ${carId} not found`;
    }
}

const removeCarFromCart = (carId) => {
    let shoppingCart = readJSONFile("./data", "cart.json");
    const carIndex = shoppingCart.findIndex((carInCart) => carInCart.id === carId);
        if(carIndex > -1) {
            shoppingCart[carIndex].quantity -= 1;
            if(shoppingCart[carIndex].quantity === 0) {
                shoppingCart.splice(carIndex, 1);
            }
            writeJSONFile("./data", "cart.json", shoppingCart);
            return `Removed car with ID ${carId} from the cart.`;
        } else {
            return `Car with ID ${carId} not found in the cart.`
        }
    }

const viewCart = () => {
    let shoppingCart = readJSONFile("./data", "cart.json");
    return shoppingCart.length > 0 ? shoppingCart: "Shopping cart is empty, add a car,";
}

const totalPriceInCart = () => {
    let shoppingCart = readJSONFile("./data", "cart.json");
    const total = shoppingCart.reduce((sum, car) => sum + car.priceInCents * car.quantiy, 0);
    return `Total price in cart: ${total.toFixed(5)} cents.`;
}

module.exports = {create, index, show, destroy, update, addCarToCart, removeCarFromCart, viewCart, totalPriceInCart};