import { connect } from 'mongoose'

let isConnected = false
export const connectTodb = async (url: string) => {
  console.info('Start connecting db...')

  if (isConnected) {
    console.info('Using from cached database instance')
    return Promise.resolve()
  }

  const dbUri: string = process.env.MONGO_URL || url

  try {
    const db = await connect(dbUri)
    console.info('Connection db ready')
    isConnected = db.connection.readyState === 1 // 1 for connected
  } catch (error) {
    console.info('db error:' + error)
    return await Promise.reject(error)
  }
}
