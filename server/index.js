const express = require("express")
const app = express()
// const multer = require('multer');
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const fs = require("fs");

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    },
});

const savedData = fs.readFileSync("data.json")
const objectData = JSON.parse(savedData)

app.use(cors())
app.use('/uploads', express.static('./uploads'));


// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, '/uploads');
//     },
//     filename: (req, file, callback) => {
//         callback(null, `image-${Date.now()}.${file.originalname}`);
//     }
// })

// const upload = multer({ storage: storage })

// app.post("/uploads", upload.single("file"), (req, res) => {
//     console.log(req.file);
//     res.send("Uploaded");
// });

function findAdmin(idKey, myArray, fullnameAdmin, emailAdmin, phoneAdmin, addressAdmin) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].adminID === idKey) {
            myArray[i].fullname = fullnameAdmin;
            myArray[i].email = emailAdmin;
            myArray[i].phone = phoneAdmin;
            myArray[i].address = addressAdmin;
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

function findCustomer(idKey, myArray, fullnameCustomer, emailCustomer, phoneCustomer, addressCustomer) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].userID === idKey) {
            myArray[i].fullname = fullnameCustomer;
            myArray[i].email = emailCustomer;
            myArray[i].phone = phoneCustomer;
            myArray[i].address = addressCustomer;
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

function findProduct(idKey, myArray, nameProduct, typeProduct, priceProduct, optionProduct, colorProduct, statusProduct) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].id === idKey) {
            myArray[i].name = nameProduct;
            myArray[i].type = typeProduct;
            myArray[i].price = priceProduct;
            myArray[i].option = optionProduct;
            myArray[i].color = colorProduct;
            myArray[i].status = statusProduct;
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

function findPromote(idKey, myArray, namePromote, timeStartPromote, timeEndPromote, percentPromote, applyPromote) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].id === idKey) {
            myArray[i].name = namePromote;
            myArray[i].timeStart = timeStartPromote;
            myArray[i].timeEnd = timeEndPromote;
            myArray[i].percent = percentPromote;
            myArray[i].apply = applyPromote;
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

function findUserToSetStatus(idKey, myArray, statusLoginUser) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].userID === idKey) {
            myArray[i].statusLogin = statusLoginUser;
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}


socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //--------------------- Socket Admin ---------------------------- //
    socket.on("editInfoAdmin", data => {
        findAdmin(data.adminID, objectData["admins"], data.fullname, data.email, data.phone, data.address)
        socket.broadcast.emit("editInfoAdminResponse", data)
    })

    socket.on("editInfoCustomer", data => {
        findCustomer(data.userID, objectData["users"], data.fullname, data.email, data.phone, data.address)
        socket.broadcast.emit("editInfoCustomerResponse", data)
    })

    socket.on("editInfoProduct", data => {
        findProduct(data.id, objectData["products"], data.name, data.type, data.price, data.option, data.color, data.status)
        socket.broadcast.emit("editInfoProductResponse", data)
    })

    socket.on("editInfoPromote", data => {
        findPromote(data.id, objectData["promotes"], data.name, data.timeStart, data.timeEnd, data.percent, data.apply)
        socket.broadcast.emit("editInfoPromoteResponse", data)
    })

    socket.on('addProduct', (data) => {
        objectData["products"].push(data)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("addProductResponse", data)
    });

    socket.on('addPromote', (data) => {
        objectData["promotes"].push(data)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("addPromoteResponse", data)
    });



    //--------------------- Socket Client ---------------------------- //
    socket.on('registerClient', (data) => {
        objectData["users"].push(data)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("registerResponse", data)
    });

    socket.on("setStatusLoginUser", data => {
        findUserToSetStatus(data.userID, objectData["users"], data.statusLogin)
        socket.broadcast.emit("setStatusLoginUserResponse", data)
    })

    socket.on('countdown', data => {
        objectData["products"].replace(data.time)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("countdown", data)
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

app.get("/api", (req, res) => {
    const data = fs.readFileSync("data.json")
    const datas = JSON.parse(data)
    res.json(datas)
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
