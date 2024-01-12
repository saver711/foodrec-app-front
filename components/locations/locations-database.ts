import * as SQLite from "expo-sqlite"
import { SavedLocation } from "./models/locations.model"
import { SavedLocationClass } from "./models/saved-location.class"

// 👁️ open or create
const database = SQLite.openDatabase("locations.db")

export const initLocationsDB = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // 👁️ CREATE TABLE
      // 👁️ IF NOT EXISTS

      // 👁️ id >> column - INTEGER >> it's type
      // 👁️ PRIMARY KEY >> اعتقد ان الداتا بيو هتحط ايدي من عندها هنا
      // 👁️ NOT NULL
      // 👁️ REAL >> number with decimal

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY NOT NULL,
        locationId INTEGER NOT NULL,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        long REAL NOT NULL
    )`,
        // Array of initial values
        [],
        // on success
        () => {
            // @ts-ignore
            resolve()
            console.log("DB Initialized")
        },
        // on error
        // first parameter is the tx
        // @ts-ignore
        (_, error) => {
          reject(error)
          console.log("DB NOT Initialized")
        }
      )
    })
  })

  return promise
}
export const insertLocation = (location: SavedLocation) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // 👁️ INSERT INTO
      tx.executeSql(
        `INSERT INTO locations (locationId, name, address, lat, long) VALUES (?, ?, ?, ?, ?)`,
        [
          location.id,
          location.name,
          location.address,
          location.lat,
          location.long,
        ],
        (_, result) => {
          resolve(result)
        },
        // @ts-ignore
        (_, error) => reject(error)
      )
    })
  })

  return promise
}

export const removeLocation = (locationId: number) => {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM locations WHERE id = ?`,
          [locationId],
          (_, result) => {
            resolve(result)
          },
          // @ts-ignore
          (_, error) => reject(error)
        )
      })
    })
  
    return promise
  }

export const fetchLocations = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM locations`,
        [],
        (_, result) => {
          const locations = []
          for (const dataPoint of result.rows._array) {
            locations.push(
              new SavedLocationClass(
                dataPoint.locationId,
                dataPoint.name,
                dataPoint.address,
                dataPoint.lat,
                dataPoint.long,
                dataPoint.id
              )
            )
          }
          resolve(locations)
        },
        // @ts-ignore
        (_, error) => reject(error)
      )
    })
  })

  return promise
}

export const fetchLocationDetails = (locationId:number) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM locations WHERE id = ?`,
        [locationId],
        (_, result) => {
            const dbLocation = result.rows._array[0]
            const location = 
            new SavedLocationClass(
                dbLocation.locationId,
                dbLocation.name,
                dbLocation.address,
                dbLocation.lat,
                dbLocation.long,
                dbLocation.id
              )
          resolve(location)
        },
        // @ts-ignore
        (_, error) => reject(error)
      )
    })
  })
  return promise
}
