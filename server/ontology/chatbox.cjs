const fs = require('fs');

// Hàm phân tích RDF và trích xuất thông tin người dùng
function parseUserRDF(rdf) {
    const matches = rdf.match(/<rdf:Description>([\s\S]*?)<\/rdf:Description>/gm);
    const users = [];
    if (matches) {
        for (const match of matches) {
            const nameMatch = match.match(/<name>([\s\S]*?)<\/name>/);
            const emailMatch = match.match(/<email>([\s\S]*?)<\/email>/);
            const favoritesMatch = match.match(/<favorits>([\s\S]*?)<\/favorits>/);
            if (nameMatch && emailMatch && favoritesMatch) {
                const name = nameMatch[1].trim();
                const email = emailMatch[1].trim();
                const favorites = JSON.parse(favoritesMatch[1].trim());
                users.push({ name, email, favorites });
            }
        }
    }
    return users;
}

// Hàm phân tích RDF và trích xuất thông tin về các bài hát từ file data.rdf
function parseDataRDF(rdf) {
    const matches = rdf.match(/<rdf:Description>([\s\S]*?)<\/rdf:Description>/gm);
    const songs = [];
    if (matches) {
        for (const match of matches) {
            const idMatch = match.match(/ObjectId\(([\s\S]*?)\)/);
            const nameMatch = match.match(/<name>([\s\S]*?)<\/name>/);
            const descMatch = match.match(/<desc>([\s\S]*?)<\/desc>/);
            const categoryMatch = match.match(/<category>([\s\S]*?)<\/category>/);
            if (idMatch && nameMatch && descMatch && categoryMatch) {
                const _id = idMatch[1].trim();
                const name = nameMatch[1].trim();
                const desc = descMatch[1].trim();
                const category = categoryMatch[1].trim();
                songs.push({ _id, name, desc, category });
            }
        }
    }
    return songs;
}

// Đọc file user.rdf
fs.readFile('user.rdf', 'utf8', (err, userData) => {
    if (err) {
        console.error('Error reading the user RDF file:', err);
        return;
    }

    // Đọc file data.rdf
    fs.readFile('podcast.rdf', 'utf8', (err, dataRDF) => {
        if (err) {
            console.error('Error reading the data RDF file:', err);
            return;
        }

        // Phân tích RDF và trích xuất thông tin người dùng
        const users = parseUserRDF(userData);

        // Phân tích RDF và trích xuất thông tin về các bài hát
        const songs = parseDataRDF(dataRDF);

        // Hàm gợi ý bài hát dựa trên danh sách favorits của người dùng
        function recommendSongs(user) {
            console.log(`Bài hát yêu thích của ${user.name}:`);
            for (const favorite of user.favorites) {
                const song = songs.find(song => song._id === favorite.$oid);
                if (song) {
                    console.log(`- Bài hát: ${song.name}`);
                    const songsSameCategory = songs.filter(s => s.category === song.category && s._id !== song._id);
                    if (songsSameCategory.length > 0) {
                        console.log("  Gợi ý thêm các bài hát cùng thể loại:");
                        songsSameCategory.forEach(s => console.log(`    - ${s.name}`));
                    } else {
                        console.log("  Không có bài hát nào cùng thể loại.");
                    }
                } else {
                    console.log(`- Không tìm thấy thông tin cho bài hát có ID: ${favorite.$oid}`);
                }
            }
        }

        // Gợi ý bài hát cho mỗi người dùng
        for (const user of users) {
            recommendSongs(user);
        }
    });
});
