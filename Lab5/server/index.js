const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { error } = require('console');


pathDataBase = "data.json"

async function saveUser(newUser){
    const jsonData = fs.readFileSync(pathDataBase, 'utf-8');
    const jsonObject = JSON.parse(jsonData);

    if (jsonObject.some(user => user.login === newUser.login)){
        error = new Error("Login exist");
        error.code = 1000;
        throw error;
    }

    jsonObject.push(newUser);
    const updatedJsonString = JSON.stringify(jsonObject, null, 2);
    fs.writeFileSync(pathDataBase, updatedJsonString, 'utf-8');
}

function findUser(login){
    const jsonData = fs.readFileSync(pathDataBase, 'utf-8');
    const jsonObject = JSON.parse(jsonData);

    for (const user of jsonObject) {
        if (user.login === login) {
          return user; // Return the user object if the login matches
        }
    }

    return null;
}

function createToken(login, role){
    return jwt.sign({ login: login, role: role }, 'JustSecretKey', { expiresIn: '1h' })
}


const app = express();
app.use(express.json());
app.use(cors())

app.post('/auth/registration', async (req, res) => {
    try {
        const user = {
            login: req.body.login,
            password: bcrypt.hashSync(req.body.password, 10),

            role: req.body.role,
            name: req.body.name,
            group: req.body.group,
            variant: req.body.variant,
            phoneNumber:  req.body.phoneNumber
        };
        await saveUser(user);
        const token = createToken(user.login, user.role);
        delete user.password;
        res.json({ message: "User registered successfully!", token: token, user: user});
    } catch (error) {
        if (error.code === 1000) {
            res.status(422).send({ message: "This login already exists!" });
        } else {
            res.status(500).send({ message: error });
        }
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const user = findUser(req.body.login);
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = createToken(user.login, user.role);
            delete user.password;
            res.json({message: "User logged in!", token: token, user: user});
        } else {
            res.status(400).send({ message: "Invalid credentials!" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log('Listening at http://localhost:3000'));
