let genomURL = 'https://refservice.tests.parseq.pro/refservice/api/0'

const URL = 'https://api.spacex.land/graphql'

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
    async getShips() {
        const response = await instance(allShipsSpaceX())
        const json = await response.json();
        return json.data
    },

    async getCurrentShip(shipId) {
        const response = await instance(currentShip(shipId))
        const json = await response.json();
        return json.data.ship
    },
}


