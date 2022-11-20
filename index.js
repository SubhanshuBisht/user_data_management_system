const express = require("express")

const fs = require("fs")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get("/users", (req, res) => {

    fs.readFile("./users.json", "utf-8", (error, data) => {

        // console.log(data)

        res.send(JSON.parse(data))

    })

})

app.delete("/user/:id", (req, res) => {

    fs.readFile("./users.json", "utf-8", (error, data) => {

        x = JSON.parse(data);

        let deleted_user_data = []

        for (i of x) {

            if (i.id != req.params.id) {

                deleted_user_data.push(i);

            }

        }

        deleted_user_data = JSON.stringify(deleted_user_data)

        fs.writeFile("./users.json", deleted_user_data, "utf-8", (error) => {

            console.log(error);

        })

        res.send(deleted_user_data)

    })

})

app.put("/user/:id", (req, res) => {

    fs.readFile("./users.json", "utf-8", (error, data) => {

        parsed_user_data = JSON.parse(data);

        for (i of parsed_user_data) {

            if (i.id == req.params.id) {

                i.name = req.body.name

                i.department = req.body.department

                i.age = req.body.age

                i.address = req.body.address

            }



        }

        stringified_user_data = JSON.stringify(parsed_user_data)



        //temp_arr=JSON.stringify(temp_arr)

        fs.writeFile("./users.json", stringified_user_data, "utf-8", (error) => {

            console.log(error);

        })

        res.send(parsed_user_data)

    })

})



app.post("/user", (req, res) => {

    const id1 = Date.now().toString()

    let request_body = req.body

    request_body.id = id1



    fs.readFile("./users.json", "utf-8", (error, data) => {

        old_user_data = JSON.parse(data);

        let appended_user_data = [...old_user_data, request_body]

        stringified_user_data = JSON.stringify(appended_user_data)

        //temp_arr=JSON.stringify(temp_arr)

        fs.writeFile("./users.json", stringified_user_data, "utf-8", (error) => {

            console.log(error);

        })

        res.send(appended_user_data)

    })

})

app.get("/user/:id", (req, res) => {

    fs.readFile("./users.json", "utf-8", (error, data) => {

        let user_data = JSON.parse(data);

        let required_user_data = []

        for (i of user_data) {

            if (i.id == req.params.id) {

                required_user_data.push(i);

            }

        }


        res.send(required_user_data)

    })



})

app.listen("6644", () => console.log('listening on port 6644'));