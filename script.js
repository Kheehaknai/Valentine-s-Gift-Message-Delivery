// ใส่โค้ดนี้ลงใน script.js (ไม่ต้องมี tag <script> ในไฟล์ .js นะครับ)

document.addEventListener('DOMContentLoaded', () => {
    
    const heroImages = [
        'imges/gif/G1 (1).jpg',
        'imges/gif/G1 (8).jpg',
        'imges/gif/G1 (7).jpg',
        'imges/gif/G1 (6).jpg',
        'imges/gif/G1 (5).jpg'
    ];

    let currentHeroIdx = 0;
    const heroElement = document.getElementById('hero-event-img');

    function autoChangeHero() {
        if (!heroElement) return;

        // สั่งจางออก
        heroElement.style.opacity = '0';

        setTimeout(() => {
            currentHeroIdx = (currentHeroIdx + 1) % heroImages.length;
            heroElement.src = heroImages[currentHeroIdx];
            
            // สั่งสว่างขึ้น
            heroElement.style.opacity = '1';
        }, 1000); 
    }

    if (heroElement) {
        // เริ่มทำงานทุก 5 วินาที
        setInterval(autoChangeHero, 5000);
    }
});