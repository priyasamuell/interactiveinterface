const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    const dpi = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpi, dpi);
}

setCanvasSize();

class Particle {
    constructor(x, y, effect) {
        this.originX = x;
        this.originY = y;
        this.effect = effect;
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.ctx = this.effect.ctx;
        this.size = Math.floor(Math.random() * 5 + 0.1); //particle size adjustments
        this.opacity = Math.random();
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.2;
        this.friction = 0.95;
        this.dx = 0;
        this.dy = 0;
        this.distance = 0;
        this.force = 0;
        this.angle = 0;
        this.draw();
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.globalAlpha = this.opacity; // particle opacity adjustment
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2); // make particle circlular
        this.ctx.closePath();
        this.ctx.fill(); 
        this.ctx.globalAlpha = 1; 
    }
    

    update() {
        this.dx = this.effect.mouse.x - this.x;
        this.dy = this.effect.mouse.y - this.y;
        this.distance = this.dx * this.dx + this.dy * this.dy;
        this.force = -this.effect.mouse.radius / this.distance * 4; // distance for mouse particle movement

        if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
        }

        this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
        this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        this.draw();
    }
}

class Effect {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.ctx = context;
        this.particlesArray = [];
        this.numberOfParticles = 15000; // number of particles
        this.mouse = {
            radius: 8000, //radius of mouse 
            x: 0,
            y: 0
        };

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('resize', () => {
            setCanvasSize();
            this.width = canvas.width;
            this.height = canvas.height;

            this.particlesArray = [];
            this.init();
        });

        this.init();
    }

    init() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            const randomX = Math.random() * this.width;
            const randomY = Math.random() * this.height;
            this.particlesArray.push(new Particle(randomX, randomY, this));
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
        }
    }
}

let effect = new Effect(canvas.width, canvas.height, ctx);

function animate() {
    effect.update();
    requestAnimationFrame(animate);
}

animate();
