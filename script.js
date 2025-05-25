
function predictSafeTiles(mines = 3, totalTiles = 25) {
    const simulations = 1000;
    const tileSafety = Array(totalTiles).fill(0);

    for (let i = 0; i < simulations; i++) {
        const minePositions = new Set();
        while (minePositions.size < mines) {
            minePositions.add(Math.floor(Math.random() * totalTiles));
        }
        for (let j = 0; j < totalTiles; j++) {
            if (!minePositions.has(j)) {
                tileSafety[j]++;
            }
        }
    }

    const safeTiles = tileSafety
        .map((count, index) => ({ index, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map(item => item.index);

    return safeTiles;
}

function predictTiles() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const safeTiles = predictSafeTiles();

    for (let i = 0; i < 25; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = i + 1;
        if (safeTiles.includes(i)) {
            tile.classList.add('safe');
        }
        grid.appendChild(tile);
    }
}

window.onload = predictTiles;
