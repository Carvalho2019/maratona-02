const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_week INT,
    vacation_per_year INT,
    value_hour INT 
    )`);

    await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
    )`);

    await db.run(`INSERT INTO profile (name,avatar,monthly_budget,days_per_week,vacation_per_year,value_hour) 
                    VALUES ("Carvalho","https://github.com/carvalho2019.png",30000,5,4,70)`);

    await db.run(
      `INSERT INTO jobs (name, daily_hours, total_hours,created_at) VALUES ("Guloso",2,1,161751436018)`
    );
    await db.run(
      `INSERT INTO jobs (name, daily_hours, total_hours,created_at) VALUES ("OneTwo Projects ",3,47,161751436018)`
    );

    await db.close();
  },
};

initDb.init();
