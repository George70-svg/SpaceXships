//URL для подключения к API SpaceX graphQL
const URL = 'https://api.spacex.land/graphql'

//Шаблон свойств для запроса к API за списком кораблей
const allShipsSpaceX = () => {
    return `{
      ships(limit: ${100}) {
        id
        name
        home_port
        type
      }
  }`
}

//Шаблон свойств для запроса к API за данными конкретного корабля по id
const currentShip = (shipId) => {
    return `{
      ship(id: "${shipId}") {
        name
        weight_kg
        year_built
        type
        home_port
        missions {
          name
        }
      } 
    }`
}

//Request-шаблон для отправки запроса к API (Составлен по требаваниям для graphQL)
const instance = (queryData) => fetch(URL, {
    method: 'POST',
    body: JSON.stringify({
        query: queryData
    }),
    headers: {
        'content-type': 'application/json'
    }
})

export const shipsAPI = {
    //Запрос к API за списком кораблей
    async getShips() {
        const response = await instance(allShipsSpaceX())
        const json = await response.json();
        return json.data
    },

    //Запрос к API за данными для карточки конкретного корабля
    async getCurrentShip(shipId) {
        const response = await instance(currentShip(shipId))
        const json = await response.json();
        return json.data.ship
    },
}


