const moment = require('moment');

const userForOutDto = (user) => {
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
    dp: user.dp,
    dateJoined: user.datejoined,
    lastActive: user.lastactive,
  };
};

const usersForOutDto = (users) => {
  const usersForOut = users.map((user) => userForOutDto(user));
  return usersForOut;
};

module.exports = {
  userForOutDto,
  usersForOutDto,
};
