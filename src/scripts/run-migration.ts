import { MedusaApp } from "@medusajs/modules-sdk"
import { Modules } from "@medusajs/framework/utils"
import dotenv from "dotenv"

dotenv.config()

async function runMigration() {
  const app = await MedusaApp({
    modulesConfig: {
      [Modules.PRODUCT]: {}, // Run only product module migrations, add other modules as needed
    },
    sharedResourcesConfig: {
      database: {
        clientUrl: process.env.DATABASE_URL,
      },
    },
  })
  
  try {
    await app.runMigrations()
    console.log("Medusa migrations completed successfully")
  } catch (error) {
    console.error("Migration failed:", error)
  } finally {
    await app.onApplicationShutdown()
    process.exit(0)
  }
}

runMigration() 