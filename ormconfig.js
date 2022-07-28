module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "ilikenoone",
  "database": "inventory-management",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true,
  "migrations": ["src/migration/*.{ts,js}"],
  "cli": {
      "migrationsDir": "src/migration"
  }
}