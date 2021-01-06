const moment = require('moment');

const userForOutDto = (user, publicPath) => {
  return {
    id: user._id,
    role: user.role,
    firstName: user.firstname,
    middleName: user.middlename,
    lastName: user.lastname,
    gender: user.gender,
    dob: user.dob,
    age: new Date().getFullYear() - moment(user.dob).year(),
    email: user.email,
    dp: publicPath + user.dp,
    dateJoined: user.datejoined,
    lastActive: user.lastactive,
  };
};

const usersForOutDto = (users, publicPath) => {
  const usersForOut = users.map((user) => userForOutDto(user, publicPath));
  return usersForOut;
};

module.exports = {
  userForOutDto,
  usersForOutDto,
};
