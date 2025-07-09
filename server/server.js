require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URI;

const app = express();