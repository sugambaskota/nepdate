const { userForOutDto } = require('./user_dto');

exports.messageForOutDto = (message, publicPath) => {
  const messageForOut = {
    id: message._id,
    sender: userForOutDto(message.sender, publicPath),
    receiver: userForOutDto(message.receiver, publicPath),
    text: message.text,
    date: message.date,
    isRead: message.isread,
    dateRead: message.dateread,
  };
  return messageForOut;
};

exports.messagesForOutDto = (messages, publicPath) => {
  const messagesForOut = messages.map((message) => {
    return this.messageForOutDto(message, publicPath);
  });
  return messagesForOut;
};
