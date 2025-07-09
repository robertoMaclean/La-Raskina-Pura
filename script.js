document.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.getElementById('main-title');
    const colors = ['#00aaff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600', '#6600ff'];
    let colorIndex = 0;

    function changeTitleColor() {
        mainTitle.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }

    setInterval(changeTitleColor, 2000); // Change color every 2 seconds
});