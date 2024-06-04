const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server is running')
    })
  } catch (e) {
    console.log(`DB Error ${e.message}`)
    Process.exit(1)
  }
}

initializeDBAndServer()

app.get('/players/', async (request, response) => {
  const playersListQuery = `SELECT * FROM cricket_team ORDER BY player_id;`
  const playersList = await db.all(playersListQuery)
  response.send(playersList)
})

/*app.post('/players/', async (request, response) => {
  const player = request.body
  const {playerName, jerseyNumber, role} = player
  const addPlayerQuery = `
    INSERT INTO cricket_team (player_name, jersey_number, role)
    VALUES(
      ${playerName}, ${jerseyNumber}, ${role}
    );
  `
  const dbResponse = await db.run(addPlayerQuery)
  response.send('Player Added to Team')
})

app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const getPlayerQuery = `SELECT * FROM cricket_team WHERE player_id = ${playerId}`
  const playerDetails = await db.get(getPlayerQuery)
  response.send(playerDetails)
})

app.put('/players/:playerId', async (request, response) => {
  const {playerId} = request.params
  const playerDetails = request.body
  const {playerName, jerseyNumber, role} = playerDetails
  const addPlayerQuery = `UPDATE cricket_team SET player_name = ${playerName},
  jersey_number = ${jerseyNumber}, role = ${role} WHERE player_id = ${playerId}`
  const player = await db.run(addPlayerQuery)
  response.send('Player Details Updated')
})

app.delete('players/:playerId', async (request, response) => {
  const {playerId} = request.params
  const playerDeleteQuery = `DELETE * FROM cricket_team WHERE player_id = ${playerId}`
  const player = await db.run(playerDeleteQuery)
  response.send('Player Removed')
})*/

module.exports = app
