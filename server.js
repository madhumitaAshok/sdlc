var express = require("express");
var app = express();
var fs = require("fs");
const PORT = 5500;
var itemNames = [];
var currentUser;

// Middlewares - It executes before rendering the page
app.use(express.json());
app.use(express.static(__dirname));

function getProductNames() {
  let productData = JSON.parse(fs.readFileSync("./data/ware-house-stock.json"));
  itemNames = [];
  Object.values(productData).forEach((values) => {
    Object.keys(values).forEach((element) => {
      element = element[0].toUpperCase() + element.slice(1);
      itemNames.push(element);
    });
  });
  return itemNames;
}

function cardData() {
  let productData = JSON.parse(fs.readFileSync("./data/ware-house-stock.json"));
  return productData;
}

app.get("/currentUser", function (request, response) {
  response.json(currentUser);
});

app.get("/uniqueData", function (request, response) {
  let productData = JSON.parse(fs.readFileSync(`./data/${currentUser}.json`));
  response.json(productData);
});

app.get("/profileData", function (request, response) {
  let productData = JSON.parse(fs.readFileSync("./data/user-details.json"));
  response.json(productData);
});

app.get("/totalData", function (request, response) {
  let data = cardData();
  response.json(data);
});

app.get("/getProductNames", function (request, response) {
  let data = getProductNames();
  response.json(data);
});

app.post("/signup", function (request, response) {
  let userDatas = JSON.parse(fs.readFileSync("./data/user-details.json"));
  if (!(request.body.useremail in userDatas)) {
    userDatas[request.body.useremail] = {
      username: request.body.username,
      useremail: request.body.useremail,
      password: request.body.password,
      doorno: request.body.doorno,
      area: request.body.area,
      district: request.body.district,
      pincode: request.body.pincode,
    };

    let a = {};
    fs.writeFile(
      `./data/${request.body.useremail}.json`,
      JSON.stringify(a),
      (error) => {}
    );
    fs.writeFile(
      "./data/user-details.json",
      JSON.stringify(userDatas),
      (error) => {}
    );
    response.status(200).json({ message: "Success" });
    response.end();
  } else {
    response.status(300).json({ message: "User already exists" });
    response.end();
  }
});

app.post("/activeData", function (request, response) {
  let userFile = JSON.parse(fs.readFileSync(`./data/user-details.json`));
  if (request.body.details) {
    fs.writeFile(
      `./data/user-details.json`,
      JSON.stringify(request.body.details),
      (error) => {}
    );
    response.end();
  } else {
    response.end();
  }
});

app.post("/updateWareHouse", function (request, response) {
  if (request.body.wareHouseStock) {
    fs.writeFile(
      `./data/ware-house-stock.json`,
      JSON.stringify(request.body.wareHouseStock),
      (error) => {}
    );
    response.end();
  } else {
    response.end();
  }
});

app.post("/activeUser", function (request, response) {
  let userFile = JSON.parse(fs.readFileSync(`./data/user-details.json`));
  if (request.body.activeData) {
    let userDetsild = JSON.parse(fs.readFileSync("./data/user-details.json"));
    userDetsild[currentUser] = request.body.activeData;
    fs.writeFile(
      `./data/user-details.json`,
      JSON.stringify(userDetsild),
      (error) => {}
    );
    response.end();
  } else {
    response.end();
  }
});

app.post("/write", function (request, response) {
  let userFile = JSON.parse(
    fs.readFileSync(`./data/${request.body.fileName}.json`)
  );
  if (request.body.details) {
    fs.writeFile(
      `./data/${request.body.fileName}.json`,
      JSON.stringify(request.body.details),
      (error) => {}
    );
    response.end();
  } else {
    response.end();
  }
});

app.post("/updateData", function (request, response) {
  let userFile = JSON.parse(fs.readFileSync(`./data/${currentUser}.json`));
  if (request.body) {
    fs.writeFile(
      `./data/${currentUser}.json`,
      JSON.stringify(request.body),
      (error) => {}
    );
    response.end();
  } else {
    response.end();
  }
});

// Post request for Login validation
app.post("/login", function (request, response) {
  let userDatas = JSON.parse(fs.readFileSync("./data/user-details.json"));
  if (request.body.useremail in userDatas) {
    if (
      request.body.userPassword === userDatas[request.body.useremail].password
    ) {
      currentUser = request.body.useremail;
      response.status(200).json({ message: "Valid User" });
      response.end();
    } else {
      response.status(205).json({ message: "Wrong Password" });
      response.end();
    }
  } else {
    response.status(300).json({ message: "User Not Found" });
    response.end();
  }
});

// Server listening at PORT
app.listen(PORT, () => {
  console.log("Server listening in PORT : " + PORT);
});
