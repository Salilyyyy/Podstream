const fs = require('fs');
const SparqlClient = require('sparql-client');
const util = require('util');

// Đọc file RDF
const rdfData = fs.readFileSync('data.rdf', 'utf8');

// Endpoint của SPARQL, thay đổi nếu bạn có một endpoint khác
const endpoint = 'http://your-sparql-endpoint';

// Tạo một truy vấn SPARQL
const query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX yourPrefix: <http://your-ontology-url#>
SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object.
}
LIMIT 10`;

// Khởi tạo client SPARQL
const client = new SparqlClient(endpoint, {
    defaultParameters: { format: 'json' },
    requestDefaults: { headers: { 'Content-Type': 'application/sparql-query' } },
});

// Thực hiện truy vấn
client.query(query)
    .execute((error, results) => {
        if (error) {
            console.error(error);
        } else {
            console.log(util.inspect(results, null, 20, true));
        }
    });
