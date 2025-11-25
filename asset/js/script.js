// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ECG Monitor Animation
function initECGMonitor() {
    const canvas = document.getElementById('ecgCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let x = 0;
    const ecgPattern = [
        {x: 0, y: 0},    // Base line
        {x: 10, y: 0},   // Small P wave
        {x: 20, y: -10}, 
        {x: 30, y: 0},
        {x: 40, y: 0},   // QRS complex
        {x: 45, y: 15},  // R peak
        {x: 50, y: -20}, // S wave
        {x: 55, y: 0},
        {x: 70, y: 0},   // T wave
        {x: 80, y: 10},
        {x: 90, y: 0},
        {x: 100, y: 0}   // Back to base
    ];
    
    function drawECG() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i += 100) {
            const currentX = i + x;
            if (currentX > canvas.width) break;
            
            ctx.moveTo(currentX, canvas.height / 2);
            
            for (let j = 0; j < ecgPattern.length - 1; j++) {
                const point1 = ecgPattern[j];
                const point2 = ecgPattern[j + 1];
                
                ctx.lineTo(
                    currentX + point1.x, 
                    canvas.height / 2 + point1.y
                );
                ctx.lineTo(
                    currentX + point2.x, 
                    canvas.height / 2 + point2.y
                );
            }
        }
        
        ctx.stroke();
        
        x -= 2;
        if (x <= -100) {
            x = 0;
        }
        
        requestAnimationFrame(drawECG);
    }
    
    drawECG();
}

// Blood Pressure Monitor Animation
function initBPMonitor() {
    const canvas = document.getElementById('bpCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let x = 0;
    
    function drawBP() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Create BP wave pattern (systolic/diastolic)
        for (let i = 0; i < canvas.width; i += 60) {
            const currentX = i + x;
            if (currentX > canvas.width) break;
            
            // Systolic peak
            ctx.moveTo(currentX, canvas.height / 2);
            ctx.quadraticCurveTo(
                currentX + 15, canvas.height / 2 - 20,
                currentX + 30, canvas.height / 2
            );
            
            // Diastolic dip
            ctx.quadraticCurveTo(
                currentX + 45, canvas.height / 2 + 10,
                currentX + 60, canvas.height / 2
            );
        }
        
        ctx.stroke();
        
        x -= 1.5;
        if (x <= -60) {
            x = 0;
        }
        
        requestAnimationFrame(drawBP);
    }
    
    drawBP();
}

// Oxygen Level Monitor Animation - Normal Pattern
function initOxygenMonitor() {
    const canvas = document.getElementById('oxygenCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let x = 0;
    let time = 0;
    
    function drawOxygen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Create realistic oxygen saturation pattern
        // Normal range: 95-100% with small fluctuations
        for (let i = 0; i < canvas.width; i += 5) {
            const currentX = i + x;
            if (currentX > canvas.width) break;
            
            // Base line at 98% with small variations
            const baseY = canvas.height / 2;
            const variation = Math.sin((currentX + time) * 0.05) * 3;
            const noise = Math.sin((currentX + time) * 0.2) * 1;
            const y = baseY + variation + noise;
            
            if (i === 0) {
                ctx.moveTo(currentX, y);
            } else {
                ctx.lineTo(currentX, y);
            }
        }
        
        ctx.stroke();
        
        x -= 2;
        time += 2;
        
        if (x <= -100) {
            x = 0;
        }
        
        requestAnimationFrame(drawOxygen);
    }
    
    drawOxygen();
}

// Initialize all monitors when page loads
window.addEventListener('load', () => {
    initECGMonitor();
    initBPMonitor();
    initOxygenMonitor();
});

// Reinitialize on window resize
window.addEventListener('resize', () => {
    initECGMonitor();
    initBPMonitor();
    initOxygenMonitor();
});