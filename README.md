# Express-Sequelize-Boilerplate

## DB Setup 🤖

**If you have not created the DB on your local**
Step 1: Change username in config/config.js
Step 2: Create DB
`npx sequelize db:create`

**If DB is already created on local**

Setup DB:
`npm run setup`

Reset DB:
`npm run reset`

## Start Server 🤖

Start Server:
`npm run watch`

## Routes 🤖

Get all user diagrams
`/api/diagrams/:userId`

Get selected diagram
`/api/diagrams/select/:diagramId`

Create new diagram
`/api/diagrams/create`
data format: `{ diagramData: {title: , dbmlData: , userId:} }`

Update selected diagram
`/api/diagrams/update/:diagramId`
data format: `{ diagramUpdateData: {title: , dbmlData: , userId:} }`
