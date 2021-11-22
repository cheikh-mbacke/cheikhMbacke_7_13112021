module.exports = {
    HOST: "localhost",
    USER: "cheikh",
    PASSWORD: "root",
    DB: "groupomania",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};