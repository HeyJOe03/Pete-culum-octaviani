const ArrayList = require('arraylist')
const Bus = require('./../models/bus')

const selectAllFunction = (req,res) => {
    Bus.find()
        .then(result => res.send(result))
        .catch(err => {console.log(err); res.send('error')})
}

const days = ['SUN','MON','TUE','WEN','THU','FRI','SAT'] //local

global.orderedListOfBus = new ArrayList();

const clearBus = (bus) => {
    console.log('deleting: ',(new Date()).toString())
    //console.log(bus)
    global.activeBusses.splice(global.activeBusses.indexOf(bus),1)
    delete global.activeChats[bus.id]
}

const addToActiveBusses = () => {
    
    console.log('adding: ',(new Date()).toString())
    let actualBus = global.orderedListOfBus[0]
    global.orderedListOfBus.remove(0)

    global.activeBusses.push(actualBus.bus) 
    global.activeChats[actualBus.bus.id] = []

    //set the timeout to delete the bus when it has arrived
    let harrive = actualBus.bus.stops[actualBus.bus.stops.length - 1].h
    //console.log(harrive) //'21:40'
    let [HH,mm] = harrive.split(':')
    let end_hour = new Date(actualBus.date)
    end_hour.setHours(parseInt(HH),parseInt(mm),00)

    //console.log(end_hour.getTime(), actualBus.date.getTime()) //57489357934
    let delay2 = end_hour.getTime() - actualBus.date.getTime()
    //console.log('start:', actualBus.date.toString(), ' end: ',end_hour.toString())
    setTimeout(() => clearBus(actualBus.bus),delay2)

    actualBus.date.setDate(actualBus.date.getDate() + 7) //will pass in a week
    global.orderedListOfBus.add(actualBus)

    const today = new Date()
    let delay = actualBus.date - today
    if(delay < 0)setTimeout(() => addToActiveBusses(),0) //if two busses starts at the same hour
    else setTimeout(() => addToActiveBusses(),delay)
}

const findDateOfBusoObject = (bus) => {
    let hbus = new Date()
    const today = new Date()
    const todayWeek = today.getDay()
    let conta = 0
    for(let i = todayWeek; days[i] !== bus.day; i++ ) {
        if(i == 6) i = -1;
        conta ++
        if(conta == 8)throw 'days error'
    }

    hbus.setDate(today.getDate() + conta)
    let [HH,mm] = bus.hleaves.split(':')
    hbus.setHours(parseInt(HH),parseInt(mm),0)
    if(conta === 0 && hbus < today) hbus.setDate(hbus.getDate() + 7)
    return hbus
}

const find_the_next_bus = () => {

    Bus.find()
        .then(result => {

            result.forEach(element => {
                global.orderedListOfBus.add({date:findDateOfBusoObject(element),bus: element})
            });

            global.orderedListOfBus.sort((a,b) => {return a.date - b.date})

            let today = new Date()

            //let conta = true
            global.orderedListOfBus.forEach(el => {
                let delay = el.date - today
                //if(conta) { //............................HARDCODE............................................
                //    delay = 10
                //}
                setTimeout(() => addToActiveBusses(),delay)
                //console.log(delay)
                //conta = false
            })

        })
        .catch(err => {console.log(err); res.send('error')})
}

module.exports.find_the_next_bus = find_the_next_bus
module.exports.selectAllFunction = selectAllFunction