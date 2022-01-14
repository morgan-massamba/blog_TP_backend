const Item = require('../models/item');
const formidable = require('formidable');

exports.getAllItems = async (req, res) => {
    try {
        //PAGINATION
        let currentPage = 1;
        let totalPages = 1;
        let limitNumber = 10;

        if (req.query?.page) {
            currentPage = parseInt(req.query.page);
        }

        const skipValue = (currentPage - 1) * limitNumber;

        const nbItems = await Item.estimatedDocumentCount();

        if (nbItems > 0) {
            totalPages = Math.ceil(nbItems / limitNumber);
        }

        let objectForRequest = {};

        //FILTRE PAR CATEGORIE
        if (req.query?.categorie) {
            objectForRequest.categorie = req.query.categorie;
        }

        //Recherche des articles
        const response = await Item.find(objectForRequest)
            .skip(skipValue)
            .limit(limitNumber);

        res.status(200).json({
            data: response,
            totalPages: totalPages,
            currentPage: currentPage,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.getSingleItem = async (req, res) => {
    try {
        const response = await Item.findOne({ _id: req.params.id });
        res.status(200).json({ data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.createItem = (req, res, next) => {
    try {
        const form = formidable({ uploadDir: 'images', keepExtensions: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const { title, categorie, description } = fields;

            const imageUrl = `${req.protocol}://${req.get('host')}/images/${
                files.file.newFilename
            }`;

            const newItem = new Item({
                title: title,
                categorie: categorie,
                description: description,
                image: imageUrl,
            });

            await newItem.save();

            res.status(201).json({ message: 'Article créé avec succès !' });
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.updateSingleItem = async (req, res) => {
    try {
        await Item.findByIdAndUpdate({ _id: req.params.id }, { ...req.body });
        res.status(200).json({
            message: 'Les modifications ont bien été prises en compte',
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.deleteSingleItem = async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
