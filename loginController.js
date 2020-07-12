const express = require('express'),
    router = express.Router();
const flash = require("connect-flash");

const service = require("./loginService")
router.use(express.static('public'));
const login = async (req, res) => {
    const body = req.body;
    console.log("req",body)
    const { data, error } = await service.authenticate(body);
    return res.status(200).json(data);
}
router.post('/', login);

module.exports = router;