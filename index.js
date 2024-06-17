const notify = console.log;
const {writeJSONFile, readJSONFile} = require('./src/helpers');
const {create, index, show, destroy, update, addCarToCart, 
removeCarFromCart, viewCart, totalPriceInCart} = require('./src/carsController');


const run = () => {
    const action = process.argv[2];
    const car = process.argv[3];
    let cars = readJSONFile("./data", "cars.json");
    let writeToFile = false;
    let updatedCars = [];

    switch (action) {
        case "index":
            const carsView = index(cars);
            notify(carsView);
            break;
        case "create":
            updatedCars = create(cars, car);
            writeToFile = true;
            break;
        case "show":
            const singelCar = show(cars, car);
            notify(singelCar);
            break;
        case "update":
            updatedCars = update(cars, car, process.argv[4]);
            writeToFile = true;
            break;
        case "destroy":
            updatedCars = destroy(cars, car);
            writeToFile = true;
            break;
        case "shoppingCart":
            const cartView = viewCart();
            notify(cartView);
            break;
        case "addCarToCart":
            const addCarNotification = addCarToCart(cars, car);
            notify(addCarNotification);
            break;
        case "removeCarFromCart":
            const removeCarNotification = removeCarFromCart(car);
            notify(removeCarNotification);
            break;
        case "totalPriceInCart":
            const totalPriceNotification = totalPriceInCart();
            notify(totalPriceNotification);
            break;
            default:
                notify("There was an error.");
    }
    if(writeToFile) {
        writeJSONFile("./data", "cars.json", updatedCars);
    }
}
run();