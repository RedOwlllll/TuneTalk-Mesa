const sgMail = require('@sendgrid/mail');
const notifier = require('node-notifier');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);