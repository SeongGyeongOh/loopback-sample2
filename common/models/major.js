'use strict';

module.exports = function(Major) {
	Major.setMajorByUserId = (major, grade, stNum, minor, req, cb) => {
		Major.create({
			major: major,
			grade: grade,
			stNum: stNum,
			minor: minor,
			userId: req.userInfo.id.toString()
		})
		.then(result => {
			return cb(null, result)
		})
		.catch(err => {
			return cb(err)
		})
	}
};
