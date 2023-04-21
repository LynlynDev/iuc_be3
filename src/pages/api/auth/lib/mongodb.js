import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL
const options ={
    useNewUrlParser: true,
    useUnifiedTopology: true,

}

let client
let clientPromise

if(!process.env.MONGODB_URL){
    throw new Error('Please add you mongo URL To .env.local')
}

if(process.env.NODE_NEV === 'development'){
    if(!global_mongoVlientPromise){
        client = new MongoClient(uri, options)
        global_mongoClientPromise = client.connect()
    }
    clientPromise = global.global_mongoClientPromise
}else{
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise;