const { userForOutDto } = require('./user_dto');

exports.messageForOutDto = (message) => {
  const messageForOut = {
    id: message._id,
    sender: userForOutDto(message.sender),
    receiver: userForOutDto(message.receiver),
    text: message.text,
    date: message.date,
    isRead: message.isread,
    dateRead: message.dateread,
  };
  return messageForOut;
};

exports.messagesForOutDto = (messages) => {
  const messagesForOut = messages.map((message) => {
    return this.messageForOutDto(message);
  });
  return messagesForOut;
};
