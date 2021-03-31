module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'mycrud',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}