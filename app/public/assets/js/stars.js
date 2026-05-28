/**
 * stars.js — Animação de céu estrelado
 * Cria um canvas de fundo com estrelas piscando,
 * simulando um céu noturno sobre o azul navy do site.
 */

(function () {
    // ─── Configurações ───────────────────────────────────────────────
    const CONFIG = {
        totalStars: 220,        // Quantidade de estrelas
        minRadius: 0.4,         // Raio mínimo (px)
        maxRadius: 1.8,         // Raio máximo (px)
        minAlpha: 0.15,         // Opacidade mínima das estrelas
        maxAlpha: 1.0,          // Opacidade máxima
        twinkleSpeed: 0.008,    // Velocidade do pisca-pisca (maior = mais rápido)
        shootingStarChance: 0.004, // Probabilidade de estrela cadente por frame
        maxShootingStars: 2,    // Máximo de estrelas cadentes simultâneas
    };

    // ─── Canvas Setup ─────────────────────────────────────────────────
    const canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');

    // ─── Redimensionamento ────────────────────────────────────────────
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => {
        resize();
        initStars();
    });

    // ─── Estrelas fixas ───────────────────────────────────────────────
    let stars = [];

    function createStar() {
        const alpha = CONFIG.minAlpha + Math.random() * (CONFIG.maxAlpha - CONFIG.minAlpha);
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius),
            alpha,
            targetAlpha: alpha,
            delta: (Math.random() > 0.5 ? 1 : -1) * CONFIG.twinkleSpeed * (0.5 + Math.random()),
            // Algumas estrelas têm leve tom azulado/branco/amarelado
            hue: Math.random() > 0.85
                ? `hsl(${220 + Math.random() * 30}, 60%, 90%)`   // Azulada
                : Math.random() > 0.7
                    ? `hsl(${45 + Math.random() * 20}, 80%, 95%)` // Amarelada
                    : '#FFFFFF',                                    // Branca
        };
    }

    function initStars() {
        stars = Array.from({ length: CONFIG.totalStars }, createStar);
    }
    initStars();

    // ─── Estrelas cadentes ────────────────────────────────────────────
    let shootingStars = [];

    function createShootingStar() {
        const x = Math.random() * canvas.width * 0.8;
        const y = Math.random() * canvas.height * 0.4;
        const angle = Math.PI / 5 + Math.random() * (Math.PI / 8);
        const speed = 8 + Math.random() * 8;
        return {
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 80 + Math.random() * 120,
            alpha: 1,
            life: 0,
            maxLife: 60 + Math.random() * 40,
        };
    }

    // ─── Loop de animação ─────────────────────────────────────────────
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenha estrelas fixas
        stars.forEach(star => {
            // Atualiza opacidade (efeito pisca-pisca)
            star.alpha += star.delta;
            if (star.alpha <= CONFIG.minAlpha || star.alpha >= CONFIG.maxAlpha) {
                star.delta *= -1;
                star.alpha = Math.max(CONFIG.minAlpha, Math.min(CONFIG.maxAlpha, star.alpha));
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.hue;
            ctx.globalAlpha = star.alpha;

            // Brilho suave (glow) nas estrelas maiores
            if (star.radius > 1.2) {
                ctx.shadowBlur = 6;
                ctx.shadowColor = star.hue;
            } else {
                ctx.shadowBlur = 0;
            }

            ctx.fill();
        });

        // Estrelas cadentes
        if (shootingStars.length < CONFIG.maxShootingStars && Math.random() < CONFIG.shootingStarChance) {
            shootingStars.push(createShootingStar());
        }

        shootingStars = shootingStars.filter(s => s.life < s.maxLife);
        shootingStars.forEach(s => {
            s.life++;
            const progress = s.life / s.maxLife;
            s.alpha = progress < 0.2
                ? progress / 0.2                  // Fade in
                : progress > 0.7
                    ? 1 - (progress - 0.7) / 0.3  // Fade out
                    : 1;

            const tailX = s.x - Math.cos(Math.atan2(s.vy, s.vx)) * s.length;
            const tailY = s.y - Math.sin(Math.atan2(s.vy, s.vx)) * s.length;

            const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
            grad.addColorStop(0, 'rgba(255,255,255,0)');
            grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.globalAlpha = s.alpha;
            ctx.stroke();

            s.x += s.vx;
            s.y += s.vy;
        });

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        requestAnimationFrame(animate);
    }

    animate();
})();
