let insertFunction = (req,res) => {
    //res.send(JSON.stringify(req.params))
    // const bus = new Bus({
    //     id:"AA123BB",
    //     hleaves:"15:30",
    //     day:"MON", //MON TUE WEN THU FRI SAT SUN
    //     stops:[
    //         {n:0,stop:'Piazza Brembana',h:'15:30'},
    //         {n:1,stop:'San Giovanni Bianco',h:'15:45'},
    //         {n:2,stop:'San Pellegrino',h:'16:00'},
    //         {n:3,stop:'Zogno',h:'16:15'},
    //         {n:4,stop:'Bergamo',h:'17:30'},
    //     ],
    //     passengers:{
    //         people:10,
    //         bags:5,
    //         suitcases:1,
    //         scooters:1,
    //         prams:0,
    //         strollers:0,
    //         dogs:0
    //     }
    // })

    // bus.save()
    //     .then((result) => {res.send(result)})
    //     .catch(err => console.log("error"))
}

let selectAllFunction = (req,res) => {
    Bus.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
}

module.exports.insertFunction = insertFunction
module.exports.selectAllFunction = selectAllFunction