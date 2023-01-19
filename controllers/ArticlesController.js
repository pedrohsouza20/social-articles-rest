const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");

module.exports = router;