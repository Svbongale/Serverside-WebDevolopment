const assert = require('assert');


exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insert(document);
};


exports.findDocuments = (db, collection, callback) => {
    const collection = db.collection(collection);
    return coll.find({}).toArray();
};


exports.removetDocument = (db, document, collection, callback) => {
    const collection = db.collection(collection);
    return coll.deleteOne(document);

};

exports.updateDocument = (db, document, update, collection, callback) => {
    const collection = db.collection(collection);
    return coll.updateOne(document, {$set: update}, null);
};