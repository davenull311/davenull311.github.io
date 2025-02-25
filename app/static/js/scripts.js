document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.project-tile');
    
    tiles.forEach(tile => {
        const btn = tile.querySelector('.expand-btn');
        const notes = tile.querySelector('.notes');
        
        btn.addEventListener('click', () => {
            notes.classList.toggle('hidden');
            btn.textContent = notes.classList.contains('hidden') ? 'Expand' : 'Collapse';
        });
    });
});