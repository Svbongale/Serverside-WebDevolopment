const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';


MongoClient.connect(url,(err,client) => {

    assert.equal(err,null);
    console.log("MongoDb connected");


    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Pizza", "description": "Test"},(err, result) => {
        assert.equal(err,null);

        console.log("After insert");
        console.log(result.ops); //shows number of operations performed.

        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);

            console.log("Found\n");
            console.log(docs);

            db.dropCollection('dishes', (err,result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    });
});