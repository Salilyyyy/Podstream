const fs = require('fs');
const { parse } = require('csv-parse');

// Đọc file CSV
fs.readFile('data.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse dữ liệu CSV
    parse(data, {
        columns: true,
        skip_empty_lines: true
    }, (err, records) => {
        if (err) {
            console.error('Error parsing CSV:', err);
            return;
        }

        // Tạo RDF từ dữ liệu
        const rdfData = records.map(record => {
            return `
                <rdf:Description>
                    <name>${record.name}</name>
                    <desc>${record.desc}</desc>
                    <thumbnail>${record.thumbnail}</thumbnail>
                    <creator>${record.creator}</creator>
                    <type>${record.type}</type>
                    <duration>${record.duration}</duration>
                    <file>${record.file}</file>
                    <createdAt>${record.createdAt}</createdAt>
                    <updatedAt>${record.updatedAt}</updatedAt>
                </rdf:Description>
            `;
        }).join('');

        // Ghi dữ liệu RDF ra file
        fs.writeFile('data.rdf', rdfData, (err) => {
            if (err) {
                console.error('Error writing RDF file:', err);
            } else {
                console.log('RDF file saved successfully.');
            }
        });
    });
});
