const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Users = require("../auth/auth-model");
const { isValid } = require("../auth/auth-service.js");
const constants = require("../config/constants.js");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password should be alphanumeric",
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                console.log("user", user);
               
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);
                    console.log(password);
                    res.status(200).json({ token, message: "API Sprint Challenge" });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password should be alphanumeric",
        });
    }
});

function createToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
    };
    const secret = constants.jwtSecret;
    const options = {
        expiresIn: "5mins",
    };
    return jwt.sign(payload, secret, options);
}
module.exports = router;

