// const fs = require('fs');
// const { parse } = require('csv-parse');

// // Đọc file CSV
// fs.readFile('user.csv', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading the file:', err);
//         return;
//     }

//     // Parse dữ liệu CSV
//     parse(data, {
//         columns: true,
//         skip_empty_lines: true
//     }, (err, records) => {
//         if (err) {
//             console.error('Error parsing CSV:', err);
//             return;
//         }

//         // Tạo RDF từ dữ liệu
//         const rdfData = records.map(record => {
//             return `
//             <rdf:Description>
//             <name>${record.name}</name>
//             <email>${record.email}</email>
//             <password>${record.password}</password>
//             <favorits>${record.favorits}</favorits>
//         </rdf:Description>
//             `;
//         }).join('');

//         // Ghi dữ liệu RDF ra file
//         fs.writeFile('user.rdf', rdfData, (err) => {
//             if (err) {
//                 console.error('Error writing RDF file:', err);
//             } else {
//                 console.log('RDF file saved successfully.');
//             }
//         });
//     });
// });
const fs = require('fs');
const { parse } = require('csv-parse');

// Đọc file CSV
fs.readFile('podcast.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Lỗi khi đọc file:', err);
        return;
    }

    // Parse dữ liệu CSV
    parse(data, {
        columns: true,
        skip_empty_lines: true
    }, (err, records) => {
        if (err) {
            console.error('Lỗi khi parse CSV:', err);
            return;
        }

        // Tạo RDF từ dữ liệu
        const rdfData = records.map(record => {
            // Xử lý các giá trị ObjectId
            const creator = record.creator.replace(/ObjectId\("(.+)"\)/, '$1');
            const episodes = record.episodes.replace(/\[{""\$oid"":""(.+)""}\]/g, '$1');

            // Tạo phần tử RDF cho mỗi bản ghi
            return `
            <rdf:Description>
                <_id>${record._id}</_id>
                <name>${record.name}</name>
                <desc>${record.desc}</desc>
                <creator>${creator}</creator>
                <tags>${record.tags}</tags>
                <type>${record.type}</type>
                <category>${record.category}</category>
                <views>${record.views}</views>
                <episodes>${episodes}</episodes>
            </rdf:Description>
            `;
        }).join('');

        // Ghi dữ liệu RDF ra file
        fs.writeFile('podcast.rdf', rdfData, (err) => {
            if (err) {
                console.error('Lỗi khi ghi file RDF:', err);
            } else {
                console.log('File RDF được lưu thành công.');
            }
        });
    });
});
