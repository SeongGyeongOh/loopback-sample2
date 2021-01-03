'use strict';

// const logger = require('../../server/logger').slog;

module.exports = function(User) {

  User.observe('before save', (context, next) => {
    const _instance = context.instance;
    const updatedDate = new Date();

    if (_instance) {
      _instance.emailVerified = true;
      _instance.created = updatedDate;
      _instance.updated = updatedDate;
    } else {
      if (!context.currentInstance) {
        return next();
      } else {
        context.data.updated = updatedDate;
      }
    }

    return next();
  });

  User.createUserByParams = (params, cb) => {
    User.create({...params})
    .then(result => {
      return cb(null, result);
    })
    .catch(error => {
      return cb(error);
    });
  }
  
  User.me = (req, cb) => {
  	logger.info("토큰에 따른 프로필을 요청하는 api");
  	const _user = req.userInfo;

  	delete _user.password;

  	logger.info("response data: ", _user);
  	return cb(null, _user);
  }
};
