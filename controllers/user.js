const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email: email });

        if (!userFound) {
            return res
                .status(400)
                .json({ message: 'Utilisateur non trouvé !' });
        }

        const checkPassword = await bcrypt.compare(
            password,
            userFound.password
        );

        if (!checkPassword) {
            return res
                .status(400)
                .json({ message: 'Mot de passe incorrect !' });
        }

        const token = jwt.sign({ email: userFound.email }, 'secret', {
            expiresIn: '2h',
        });

        res.status(200).json({ message: 'Login successfull', token: token });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        userProperties = { username, email, password: hash };

        const user = new User(userProperties);

        await user.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};
