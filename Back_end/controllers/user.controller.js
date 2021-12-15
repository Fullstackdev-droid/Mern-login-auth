// import package
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';


// import modal
// import Admin from '../models/Admin';
// import {
//     User
// } from '../models/User';
import Admin from '../models/Admin';
import User from '../models/User';
import Emailtemplates from '../models/emailtemplate'

// import cofig
import keys from '../config';

// import lib
import bcrypt from 'bcrypt';
// import { comparePassword } from '../lib/bcrypt';
import { generatePassword, comparePassword } from '../lib/bcrypt';


import multer from 'multer';
import path from 'path';



const ObjectId = mongoose.Types.ObjectId;





/**
 * Admin List
 * URL : /adminapi/admin
 * METHOD: GET
*/


export const getAdminData = async (req, res) => {

  
    User.findOne({ _id: req.user.id }, (err, userData) => {
        if (err) {
          return res
            .status(200)
            .json({ success: false, errors: { messages: "Error on server" } });
        }
        
        return res
          .status(200)
          .json({ success: true, userValue: userData });
      });
  }

export const signUp = async (req, res) => {
    try {
        var useremail = req.body.email;
        var emailinlower = useremail.toLowerCase();
        User.findOne({
                email: emailinlower,
            }).then((user) => {
                    if (user) {
                        return res.status(400).json({ 'errors':{
                            email: "Email already exists"}
                        });
                    } else {
                        var newUser = new User({
                            email: emailinlower,
                            password: req.body.password,
                            name: req.body.userName,
                            emailverified: true,
                        });
                    }

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save().then((result) => {
                                User.findOne({
                                    email: emailinlower,
                                  }).then((user) => {
                                
                                var logo = keys.baseUrl + "front/" + "coinooxLogo.png";
                                var emailcheckimg = keys.baseUrl + "front/" + "emailCheck.png";
                                var fi1 = keys.baseUrl + "front/" + "fi1.png";
                                var fi2 = keys.baseUrl + "front/" + "fi2.png";
                                var fi3 = keys.baseUrl + "front/" + "fi3T.png";
                                var fi4 = keys.baseUrl + "front/" + "fi4.png";
                                var jsonfilter = {
                                    identifier: "activate_register_user",
                                  };
                                Emailtemplates.findOne(
                                    jsonfilter, {
                                        _id: 0,
                                    }, function (
                                        err,
                                        templates
                                      ) {
                                        if (templates) {
                                            if (templates.content) {
                                               var templateData = templates;
                                                templateData.content = templateData.content.replace(
                                                    /##DATE##/g,
                                                    new Date()
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##accountid##/g,
                                                    emailinlower
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_name##/g,
                                                    req.body.userName
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_appName##/g,
                                                    keys.siteName
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_logo##/g,
                                                    logo
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_emailcheck##/g,
                                                    emailcheckimg
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_fi1##/g,
                                                    fi1
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_fi2##/g,
                                                    fi2
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_fi3##/g,
                                                    fi3
                                                );
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_fi4##/g,
                                                    fi4
                                                );
                                                var link_html =
                                                    keys.FRONT_URL + "activate/" + user._id;
                                                templateData.content = templateData.content.replace(
                                                    /##templateInfo_url##/g,
                                                    link_html
                                                );
                                            }
                                            var smtpConfig = {
                                                service: keys.serverName,
                                                auth: {
                                                    user: keys.email,
                                                    pass: keys.password,
                                                },
                                                host: keys.host,
                                                port: 465,
                                                secure: true,
                                            };
                                            var transporter = nodemailer.createTransport(smtpConfig);
                                            console.log(templateData,"templateDatatemplateDatatemplateDatatemplateData");
                                            var mailOptions = {
                                                from: keys.fromName + "<" + keys.fromemail + ">", // sender address
                                                to: req.body.email, // list of receivers
                                                subject: templateData.subject, // Subject line
                                                html: templateData.content, // html body
                                            };
            
                                            transporter.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                    console.log(error, 'SMTP ERRRRRRRRRRRRRR');
                                                    return; //console.log(error);
                                                }
                                                //console.log("error in smtp", error);
                                                //console.log("NO error in mail ", info);
                                            });
                                            return res.status(200).json({
                                                'success': true,
                                                'message': "Activation mail sent. Check your Registered email to activate",
                                            });
                                        }
                                    }
                                );
                                });
                                
                            });
                        });
                    });
                });
        
    } catch (err) {
        console.log("err",err);
        return res.status(500).json({ "success": false, 'errors': { 'messages': "Error on server" } })
    }
}

export const activateuser = async (req, res) => {
    try {
        var userid = req.body.userid;
        var updateObj = { status: 1 };
        User.findByIdAndUpdate(userid, updateObj, { new: true }, function (
          err,
          user
        ) {
          if (user) {
            return res
              .status(200)
              .json({ message: "Your Account activated successfully" });
          }
        });
    }
    catch (err) {

        return res.status(500).json({ "success": false, 'message': "Error on server" })
    }
}

export const userLogin = async (req, res) => {
    try {
        let reqBody = req.body;
        reqBody.email = reqBody.email.toLowerCase();
        let checkUser = await User.findOne({ "email": reqBody.email });
        if (!checkUser) {
            return res.status(404).json({ "success": false, 'errors': { 'email': "Email not found" } })
        }

        let { passwordStatus } = await comparePassword(reqBody.password, checkUser.password);
        if (!passwordStatus) {
            return res.status(400).json({ "success": false, 'errors': { "password": "Password incorrect" } })
        }

        let payloadData = {
            "_id": checkUser._id,
            // "restriction": checkUser.restriction,
            "role": checkUser.role
        }
        let token = new User().generateJWT(payloadData);

        return res.status(200).json({ 'success': true, 'message': "Login successfully", token })
    }
    catch (err) {

        return res.status(500).json({ "success": false, 'message': "Error on server" })
    }
}





