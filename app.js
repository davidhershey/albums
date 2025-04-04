document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('randomButton');
    const resultDiv = document.getElementById('result');
    const albumNameDiv = document.getElementById('albumName');
    const artistNameDiv = document.getElementById('artistName');
    const albumCountSpan = document.getElementById('albumCount');
    let albums = [];
    let isSpinning = false;

    // Load the albums from the CSV file
    fetch('albums.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            albums = data.split('\n')
                .filter(line => line.trim() !== '')
                .map(line => {
                    const cleanLine = line.replace(/^\s*\d+\s+/, '').trim();
                    const [album, artist] = cleanLine.split(',').map(part => part.trim());
                    return { album, artist };
                });
            
            albumCountSpan.textContent = albums.length;
        })
        .catch(error => {
            console.error('Error loading albums:', error);
            albumNameDiv.textContent = 'Error loading album list';
            artistNameDiv.textContent = 'Please check your network connection';
        });

    button.addEventListener('click', () => {
        if (isSpinning || albums.length === 0) return;
        
        isSpinning = true;
        button.disabled = true;
        
        // Add spinning animation
        button.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Spinning...';
        
        // Make result container visible during animation  
        resultDiv.classList.add('active');
        
        // Fake suspense with rapid cycling through albums
        let cycles = 0;
        const totalCycles = 20;
        const cycleInterval = setInterval(() => {
            const tempIndex = Math.floor(Math.random() * albums.length);
            
            // Add shuffle animation
            albumNameDiv.classList.add('shuffling');
            artistNameDiv.classList.add('shuffling');
            
            albumNameDiv.textContent = albums[tempIndex].album;
            artistNameDiv.textContent = albums[tempIndex].artist;
            
            // Remove class for next cycle
            setTimeout(() => {
                albumNameDiv.classList.remove('shuffling');
                artistNameDiv.classList.remove('shuffling');
            }, 100);
            
            cycles++;
            if (cycles >= totalCycles) {
                clearInterval(cycleInterval);
                showFinalResult();
            }
        }, 150);
        
        const showFinalResult = () => {
            // Wait a moment for suspense
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * albums.length);
                const randomAlbum = albums[randomIndex];
                
                // Display the result with fancy animation  
                albumNameDiv.textContent = randomAlbum.album;
                artistNameDiv.textContent = randomAlbum.artist;
                
                // Add a pulsing effect to highlight the final selection
                resultDiv.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    resultDiv.style.transform = '';
                }, 200);
                
                // Reset button
                button.innerHTML = '<i class="fas fa-random"></i> Spin Again';
                button.disabled = false;
                isSpinning = false;
            }, 500);
        };
    });
    
    // Add fun hover effect on button
    button.addEventListener('mouseover', () => {
        button.style.transform = `translateY(-3px) rotate(${Math.random() * 3 - 1.5}deg)`;
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0) rotate(0deg)';
    });
});