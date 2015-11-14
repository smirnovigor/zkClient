var zookeeper = require('node-zookeeper-client');

var client = zookeeper.createClient('localhost:2181', { retries : 2 });
var path = process.argv[2];
var data = new Buffer(JSON.stringify(require('./data/node_sample.json')));

client.once('connected', function () {
    console.log('Connected to the server.');

    client.setData(path, data, function (error, stat) {
        if (error) {
            console.log('Got error when setting data: ' + error);
            return;
        }

        console.log(
            'Set data "%s" on node %s, version: %d.',
            data.toString(),
            path,
            stat.version
        );
        client.close();
    });
});

client.connect();
