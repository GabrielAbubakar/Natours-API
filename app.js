const fs = require("fs")
const express = require('express')

const app = express()
app.use(express.json())

const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})



const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const getSingleTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if (id > tours.length) {
        return res.status(404).send({ "message": "An Error occured" })
    }


    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

const postTour = (req, res) => {

    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour)


    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: success,
            data: {
                tour: newTour
            }
        })
    })

}

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated'
        }
    })
}

app.get('/', (req, res) => {
    res.status(200).send('Hello from the server sideeeee.')
})

app.get('/api/v1/tours', getAllTours)
app.get('/api/v1/tours/:id', getSingleTour)
app.post('/api/v1/tours', postTour)
app.patch('/api/v1/tours', updateTour)