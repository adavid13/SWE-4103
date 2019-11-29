// Using CommonJS style export so we can consume via Node (without using Babel-node)

module.exports = {
  users: [
    {
      id: 1,
      firstName: "Jack",
      lastName: "Smith",
      email: "user@test.com",
      password: "user",
      primaryPhoneNumber: "+1(506)600-0123",
      secondaryPhoneNumber: "+1(506)600-0124",
      admin: false,
      newUser: false,
      callMethod: "primaryPhoneNumber",
      notificationMethod: "primaryPhoneNumber"
    },
    {
      id: 2,
      firstName: "Mary",
      lastName: "Jane",
      email: "newuser@test.com",
      password: "newuser",
      primaryPhoneNumber: "+1(506)600-0135",
      secondaryPhoneNumber: "+1(506)600-0136",
      admin: false,
      newUser: true,
      callMethod: "primaryPhoneNumber",
      notificationMethod: "primaryPhoneNumber"
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Doe",
      email: "admin@test.com",
      password: "admin",
      primaryPhoneNumber: "+1(506)600-0147",
      secondaryPhoneNumber: "+1(506)600-0148",
      admin: true,
      newUser: false,
      callMethod: "primaryPhoneNumber",
      notificationMethod: "primaryPhoneNumber"
    }
  ]
};
