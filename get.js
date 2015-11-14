var zookeeper = require('node-zookeeper-client');

var client = zookeeper.createClient('localhost:2181', { retries : 2 });
var path = process.argv[2];

function getData(client, path) {
    client.getData(
        path,
        function (event) {
            console.log('Got event: %s', event);
            getData(client, path);
        },
        function (error, data, stat) {
            if (error) {
                console.log('Error occurred when getting data: %s.', error);
                return;
            }

            console.log(
                'Node: %s has data: %s, version: %d',
                path,
                data ? data.toString() : undefined,
                stat.version
            );
        }
    );
}

client.once('connected', function () {
    console.log('Connected to ZooKeeper.');
    getData(client, path);
});

client.connect();
