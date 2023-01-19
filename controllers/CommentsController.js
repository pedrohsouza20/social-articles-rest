const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const Comment = require("../models/Comment");

router.post('/comment/new')

module.exports = router;