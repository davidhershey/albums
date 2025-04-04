document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('randomButton');
    const resultDiv = document.getElementById('result');
    let albums = [];

    // Load the albums from the CSV file
    fetch('albums.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            albums = data.split('\n')
                .filter(line => line.trim() !== '')  // Remove empty lines
                .map(line => {
                    // Remove the line number and trim spaces
                    return line.replace(/^\s*\d+\s+/, '').trim();
                });
        })
        .catch(error => {
            console.error('Error loading albums:', error);
            resultDiv.textContent = 'Error loading album list. Please try again.';
        });

    button.addEventListener('click', () => {
        if (albums.length === 0) {
            resultDiv.textContent = 'No albums loaded yet. Please try again in a moment.';
            return;
        }

        // Pick a random album
        const randomIndex = Math.floor(Math.random() * albums.length);
        const randomAlbum = albums[randomIndex];
        
        // Display the result
        resultDiv.textContent = randomAlbum;
    });
});