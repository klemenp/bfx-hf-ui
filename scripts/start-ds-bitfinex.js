process.env.DEBUG = 'bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const HFDB = require('bfx-hf-models')
const os = require('os')
const DataServer = require('bfx-hf-data-server')
const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')

const dir = `${os.homedir()}/.honeyframework`;

const dbBitfinex = new HFDB({
                         schema: HFDBBitfinexSchema,
                         adapter: HFDBSQLAdapter({
                           connection: 'postgres://hfdataserver:hfdataserver@postgres:5432/hfdataserver',
                           clientType: 'pg'
                         })
                       })

const dsBitfinex = new DataServer({
  port: 23521,
  db: dbBitfinex,
})

dsBitfinex.open()
