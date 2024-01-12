const { user } = require('../models');

const userData = 
[
    {
        "username": "sarah",
        "email": "sarah@mail.com",
        "password": "password1234"
    }
]

const seedUsers = () => user.bulkCreate(userData);

module.exports = seedUsers;