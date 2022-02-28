const { login, Signup, user_data } = require('../controllers/auth');
const { update_users, address, get_address } = require('../controllers/user_update');
const { requireSignin } = require('../middleware');

const Router = require('express').Router();

Router.post('/signup',Signup);
Router.post('/login',login);
Router.post('/user_info',requireSignin,user_data);
Router.put('/update_userinfo',requireSignin,update_users);
Router.post('/address',requireSignin,address);
Router.get('/address',requireSignin,get_address);
module.exports = Router;