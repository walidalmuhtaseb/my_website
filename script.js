document.addEventListener('DOMContentLoaded', () => {
    // Landing Page Handling
    const landingOverlay = document.getElementById('landing-overlay');
    const mainContent = document.getElementById('main-content');
    const startButton = document.querySelector('.start-button');
    const introRocket = document.getElementById('intro-rocket');

    // Add floating animation to intro rocket
    introRocket.classList.add('animate');

    function startWebsite() {
        landingOverlay.style.opacity = '0';
        mainContent.classList.add('visible');
        setTimeout(() => {
            landingOverlay.style.display = 'none';
        }, 500);
    }

    startButton.addEventListener('click', startWebsite);

    // Skills Data for Puzzle
    const skillsData = [
        { name: 'C++', logo: 'cpp-logo.png' },
        { name: 'Python', logo: 'python-logo.png' },
        { name: 'Altium', logo: 'Altium-logo.png' },
        { name: 'JavaScript', logo: 'javascript-logo.png' },
        { name: 'FPGA', logo: 'FPGA.png' },
        { name: 'Verilog', logo: 'verilog.png' },
        { name: 'React', logo: 'react-logo.png' },
        { name: 'Docker', logo: 'docker-logo.png' }
    ];

    // Initialize Sliding Puzzle
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        // Create puzzle grid
        skillsGrid.innerHTML = `
            <div class="puzzle-container">
                ${skillsData.map((skill, index) => `
                    <div class="puzzle-piece" data-index="${index}" style="order: ${index}">
                        <div class="skill-icon-wrapper">
                            <img src="${skill.logo}" alt="${skill.name} logo">
                        </div>
                        <div class="skill-name">${skill.name}</div>
                    </div>
                `).join('')}
                <div class="puzzle-piece empty" data-index="8" style="order: 8"></div>
            </div>
        `;

        // Add click handlers for puzzle pieces
        const puzzlePieces = document.querySelectorAll('.puzzle-piece:not(.empty)');
        const emptyPiece = document.querySelector('.puzzle-piece.empty');

        puzzlePieces.forEach(piece => {
            piece.addEventListener('click', () => {
                if (isAdjacent(piece, emptyPiece)) {
                    // Swap positions
                    const pieceOrder = getComputedStyle(piece).order;
                    const emptyOrder = getComputedStyle(emptyPiece).order;
                    
                    piece.style.order = emptyOrder;
                    emptyPiece.style.order = pieceOrder;
                }
            });
        });

        // Shuffle puzzle on load
        shufflePuzzle();
    }

    function isAdjacent(piece1, piece2) {
        const order1 = parseInt(getComputedStyle(piece1).order);
        const order2 = parseInt(getComputedStyle(piece2).order);
        
        // Check if pieces are adjacent horizontally or vertically
        return (
            (Math.abs(order1 - order2) === 1 && Math.floor(order1 / 3) === Math.floor(order2 / 3)) || // Same row
            Math.abs(order1 - order2) === 3 // Same column
        );
    }

    function shufflePuzzle() {
        const pieces = document.querySelectorAll('.puzzle-piece');
        const positions = Array.from({length: 9}, (_, i) => i);
        
        // Fisher-Yates shuffle
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        pieces.forEach((piece, index) => {
            piece.style.order = positions[index];
        });
    }

    // Social Icons Tooltips
    document.querySelectorAll('.example-2 .icon-content').forEach(icon => {
        const tooltip = icon.querySelector('.tooltip');
        if (tooltip) {
            icon.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });
            
            icon.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        }
    });
});