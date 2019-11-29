/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const getShifts = () => {
  const startDate = new Date(2019, 10, 1, 0, 0, 0);
  const n = 30;
  const shifts = new Array();
  let startOfShift = startDate;
  let endOfShift = new Date(2019, 10, 1, 4, 0, 0);
  for (var i = 0; i < 6*n; i++) {
    shifts.push({
      id: i,
      startTime: startOfShift.toISOString(),
      userSignedUpForShift: null,
      endTime: endOfShift.toISOString()
    });
    startOfShift.setHours( startOfShift.getHours() + 4 );
    endOfShift.setHours( endOfShift.getHours() + 4 );
  }
  return shifts;
}

const { users } = mockData;
const shifts = getShifts();
const data = JSON.stringify({ users, shifts });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
