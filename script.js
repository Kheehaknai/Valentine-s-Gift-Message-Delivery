
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



////สไตล์สำหรับ Mood Popup///////
// ฟังก์ชันเปิด-ปิด Modal
function openMoodModal() { document.getElementById('moodModal').style.display = 'flex'; }
function closeMoodModal() { document.getElementById('moodModal').style.display = 'none'; }

// ฟังก์ชันกรองดอกไม้ (สมมติว่าคุณใส่ class mood ไว้ที่สินค้าแต่ละชิ้น)
function filterByMood(mood) {
    alert("Luvia is choosing flowers for your feelings of " + mood + "!");
    closeMoodModal();
    window.location.href = "#products"; // เด้งไปส่วนสินค้า
    // ตรงนี้ถ้าคุณมีระบบ Filter สินค้า สามารถเขียนเพิ่มให้ซ่อน/แสดงตาม class ได้เลยครับ
}

// ฟังก์ชัน Wishlist (จดจำจำนวนหัวใจ)
let wishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;

function showWishlistInfo() {
    wishlistCount++;
    localStorage.setItem('wishlistCount', wishlistCount);
    updateHeartIcon();
    
    // แสดง Alert สวยๆ หรือจะทำหน้าต่างเด้งก็ได้ครับ
    alert("I've already put the pieces I like in my list! ❤️");
}

function updateHeartIcon() {
    // หาไอคอนหัวใจใน Header (สมมติว่าคุณมี class หรือ id)
    const heartIcon = document.querySelector('.fa-heart') || document.querySelector('.header .icons a:nth-child(1)');
    if (heartIcon) {
        // เพิ่มตัวเลขสีแดงเล็กๆ เหนือหัวใจ
        heartIcon.setAttribute('data-count', wishlistCount);
        heartIcon.style.position = 'relative';
        
        // ล้างของเก่าออกก่อนถ้ามี
        const oldBadge = heartIcon.querySelector('.badge');
        if(oldBadge) oldBadge.remove();

        // สร้างป้ายตัวเลขใหม่
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.innerHTML = wishlistCount;
        badge.style = "position:absolute; top:-10px; right:-10px; background:red; color:white; border-radius:50%; padding:2px 6px; font-size:10px;";
        heartIcon.appendChild(badge);
    }
}

// เรียกใช้ฟังก์ชันตอนโหลดหน้าเว็บเพื่อให้ตัวเลขยังคงอยู่
window.onload = updateHeartIcon;

// ฟังก์ชันบังคับเปิดเฉพาะ "ตะกร้า" (และสั่งปิดหน้าหัวใจทันที)
function toggleCart() {
    const preorderModal = document.getElementById('preorder-modal');
    const wishlistModal = document.getElementById('wishlist-modal');

    // --- คำสั่งบังคับ: ปิดหน้าหัวใจทิ้งทันที ---
    if (wishlistModal) wishlistModal.style.display = 'none';

    // เปิด-ปิดหน้าตะกร้าตามปกติ
    if (preorderModal) {
        if (preorderModal.style.display === 'none' || preorderModal.style.display === '') {
            preorderModal.style.display = 'flex';
            renderPreOrderCart(); // วาดรายการสินค้า
        } else {
            preorderModal.style.display = 'none';
        }
    }
}







////Digital Love Letter//////
// --- มัดรวมฟังก์ชันทั้งหมดไว้ที่นี่ ---
function openLetter() {
    const modal = document.getElementById('letterModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log("The letter page has been opened!"); // เช็คใน Console
    }
}

function closeLetter() {
    const modal = document.getElementById('letterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- จุดเชื่อมโยงที่สำคัญที่สุด ---
// สั่งให้ปุ่มทำงานเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('createNoteBtn');
    if (btn) {
        btn.addEventListener('click', openLetter);
        console.log("Create A Note button connected successfully!");
    } else {
        console.error("Can't find button id 'createNoteBtn' in HTML page");
    }

    // ฟังก์ชันปิดจดหมายเมื่อกดข้างนอก
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('letterModal');
        if (event.target === modal) closeLetter();
    });
});


// ฟังก์ชันนี้จะทำงานเมื่อลูกค้าคลิกที่รูปขนาดเล็กทางซ้าย
function changeTemplate(imgUrl) {
    const paper = document.getElementById('paperDisplay');
    if (paper) {
        // เปลี่ยนพื้นหลังของช่องเขียนจดหมายเป็นรูปที่คลิกเลือก
        paper.style.backgroundImage = "url('" + imgUrl + "')";
        console.log("Change to pattern: " + imgUrl);
    }
}

///สำหรับกล่องของขวัญเด้ง
// แก้ไขฟังก์ชันบันทึกเดิม
function saveToCart() {
    const messageInput = document.getElementById('userMessage');
    
    if (!messageInput || messageInput.value.trim() === "") {
        alert("Please write a message before saving. ❤️");
        return;
    }

    // --- ส่วนบันทึกลงตะกร้า (โค้ดเดิมของคุณ) ---
    const paperDisplay = document.getElementById('paperDisplay');
    const loveLetter = {
        type: 'Love Letter',
        message: messageInput.value,
        template: paperDisplay.style.backgroundImage,
        price: 50
    };

    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(loveLetter);
    localStorage.setItem('cart', JSON.stringify(cart));

    // --- ส่วนที่เพิ่มใหม่: เล่นเสียงและเปิด Pop-up ของขวัญ ---
    
    // 1. เล่นเสียงปั๊บ!
    const sound = document.getElementById('successSound');
    if (sound) sound.play();

    // 2. ปิดหน้าเขียนจดหมาย
    closeLetter();

    // 3. เปิดหน้าของขวัญเด้ง
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'flex';
    }
}

// ฟังก์ชันปิดหน้าของขวัญ
function closeSuccess() {
    document.getElementById('successModal').style.display = 'none';
    // ล้างข้อความในช่องเขียนเพื่อรอเขียนใหม่
    document.getElementById('userMessage').value = "";
}


////////////////////////////////////ตระกร้า//////////////////////
let cart = []; // ตัวแปรเก็บรายการสินค้า

// 1. ฟังก์ชันเปิดตะกร้า
function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'flex';
    renderCart(); // อัปเดตรายการสินค้าทุกครั้งที่เปิด
}

// 2. ฟังก์ชันปิดตะกร้า
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}


// 4. วาดรายการสินค้าในหน้าตะกร้า
function renderCart() {
    const list = document.getElementById('cartItemsList');
    const subtotal = document.getElementById('subtotalPrice');
    const total = document.getElementById('cartTotalPrice');

    if(cart.length === 0) {
        list.innerHTML = `<p class="empty-msg">The basket is empty... Choose the gift you like first.</p>`;
        subtotal.innerText = `฿0`;
        total.innerText = `฿0`;
        return;
    }

    let html = '';
    let totalSum = 0;

    cart.forEach(item => {
        totalSum += item.price;
        html += `
            <div class="cart-item">
                <i class="fas fa-times" onclick="removeFromCart(${item.id})"></i>
                <img src="${item.img}" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <p class="note-details"><b>Message:</b> "${item.details.substring(0, 30)}..."</p>
                    <div class="price">฿${item.price}</div>
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
    subtotal.innerText = `฿${totalSum.toLocaleString()}`;
    total.innerText = `฿${totalSum.toLocaleString()}`;
}

// 5. ลบสินค้าออกจากตะกร้า
function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
    updateCartBadge();
}

function updateCartBadge() {
    // สั่งให้พุ่งเป้าไปที่ ID "cart-count" ที่เราเพิ่งใส่ใน HTML เท่านั้น
    const badge = document.getElementById('cart-count');
    
    if (badge) {
        badge.innerText = cart.length;

        // ถ้ามีของให้โชว์ ถ้าไม่มีให้ซ่อน
        if (cart.length > 0) {
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// *** ส่วนสำคัญ: เชื่อมปุ่มตะกร้าที่ Header ให้กดแล้วเปิด openCart() ***
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.querySelector('.fa-shopping-cart');
    if(cartBtn) {
        cartBtn.parentElement.onclick = (e) => {
            e.preventDefault();
            openCart();
        };
    }
});




///บันทึกโน๊ตลงรายการสินค้า////

// 1. ตัวแปรเก็บข้อมูลสินค้าและธีมที่เลือก

let selectedThemeUrl = 'imges/card/c1 (1).jpg'; // ค่าเริ่มต้น

// 2. ฟังก์ชันเปลี่ยนธีมจดหมาย (เรียกจาก onclick ใน style-grid)
// เพิ่ม , event เข้าไปในวงเล็บ
function changeTemplate(imgSrc, event) { 
    selectedThemeUrl = imgSrc;
    const paper = document.getElementById('paperDisplay');
    if (paper) {
        paper.style.backgroundImage = `url('${imgSrc}')`;
    }

    // ลบไฮไลท์เก่า
    document.querySelectorAll('.style-grid img').forEach(img => img.classList.remove('selected'));

    // ใช้ event ที่ส่งมาจาก HTML โดยตรง (เส้นขีดฆ่าจะหายไป)
    if (event && event.target) {
        event.target.classList.add('selected');
    }
}

// 3. ฟังก์ชันบันทึกข้อมูลลงตะกร้า (หัวใจหลัก)
function saveToCart() {
    const message = document.getElementById('userMessage').value;

    if (!message || message.trim() === "" || message === "Write your love here...") {
        alert("Please write a message before saving.❤️");
        return;
    }

    // สร้าง Object สินค้าใหม่
    const item = {
        id: Date.now(),
        name: "Digital Love Letter",
        details: message,
        img: selectedThemeUrl,
        price: 150
    };

    // เพิ่มเข้า Array ตะกร้า
    cart.push(item);

    // ปิดหน้าเขียนจดหมาย และแสดงหน้า Success (กล่องของขวัญ)
    closeLetter();
    showSuccess();
    
    // อัปเดตตัวเลขแจ้งเตือนที่ไอคอนตะกร้า
    updateCartBadge();
    
    // ล้างข้อความเก่า
    document.getElementById('userMessage').value = "";
}

// 4. ฟังก์ชันแสดง Success Modal และเล่นเสียง
function showSuccess() {
    document.getElementById('successModal').style.display = 'flex';
    const sound = document.getElementById('successSound');
    if(sound) sound.play();
}

function closeSuccess() {
    document.getElementById('successModal').style.display = 'none';
}


// ฟังก์ชันลบสินค้า
function removeFromLuviaCart(index) {
    let cartData = JSON.parse(localStorage.getItem('luvia_cart')) || [];
    cartData.splice(index, 1);
    localStorage.setItem('luvia_cart', JSON.stringify(cartData));
    renderCart(); // วาดใหม่
    updateCartDisplay(); // อัปเดตเลขตะกร้า
}

// แก้ไขฟังก์ชันโหลดหน้าเว็บ (ให้รวบรวมไว้ที่เดียว)
window.addEventListener('load', () => {
    updateCartDisplay();
    if (document.getElementById('cartModal').style.display !== 'none') {
        renderCart();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if(cartIcon) {
        cartIcon.parentElement.onclick = (e) => {
            e.preventDefault();
            document.getElementById('cartModal').style.display = 'flex';
            renderCart(); // ต้องเรียกฟังก์ชันนี้เพื่อให้รายการขึ้น
        };
    }
});
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// ฟังก์ชันสำหรับปุ่ม add to cart (สินค้าปกติ)
function addToCart(name, price, img) {
    // สร้าง Object สินค้าให้โครงสร้างเหมือนกับที่ "โน้ต" ใช้ (id, name, details, img, price)
    const item = {
        id: Date.now() + Math.random(), // ป้องกัน ID ซ้ำ
        name: name,
        details: "Premium Product", // ใส่ค่าว่างหรือคำอธิบายสั้นๆ ให้เหมือนโน้ต
        img: img,
        price: parseFloat(price)
    };

    // 1. ผลักข้อมูลเข้า Array 'cart' (ตัวเดียวกับที่ saveToCart ใช้)
    cart.push(item);

    // 2. เรียกใช้ฟังก์ชันเดิมของคุณที่มีอยู่แล้ว เพื่ออัปเดตหน้าจอ
    updateCartBadge(); // อัปเดตตัวเลขที่ไอคอน
    
    // 3. (Optional) ถ้าต้องการให้กดแล้วหน้าตะกร้าเด้งขึ้นมาทันที ให้เปิดบรรทัดล่างนี้:
    // openCart(); 

    alert("The product has been added to the cart. ❤️");
}

////////เพิ่มตะกร้ามาใหม่ทันที
function addToCart(name, price, img) {
    const item = {
        id: Date.now() + Math.random(),
        name: name,
        details: "Special Valentine Set", // ข้อความกำกับสินค้าชุดนี้
        img: img,
        price: parseFloat(price)
    };

    cart.push(item);
    
    updateCartBadge(); // อัปเดตเลขตะกร้า
    renderCart();      // วาดรายการสินค้าใหม่
    openCart();        // <<-- เพิ่มบรรทัดนี้เพื่อให้เด้งไปหน้า "Your Selection" ทันที!
}
/////////////////จบตะกร้า//////////////////////////

//////Delivery Info//////////
function openServiceModal() {
    document.getElementById('serviceModal').style.display = 'flex';
}

function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

// 1. ฟังก์ชันสำหรับ Free Delivery (Map)
function openDeliveryModal() {
    const content = document.getElementById('serviceContent');
    // เปลี่ยน max-width ตรงนี้ให้ใหญ่ขึ้น
    document.getElementById('serviceModalWrapper').style.maxWidth = '1100px'; 
    
    content.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; align-items: stretch;">
            <div style="flex: 1.5; min-width: 450px; height: 550px;">
                <iframe src="https://www.google.com/maps/embed?..." 
                    width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
            
            <div style="flex: 1; min-width: 350px; padding: 6rem 4rem; display: flex; flex-direction: column; justify-content: center; background: #fff;">
                <h1 class="heading" style="text-align: left; font-size: 4rem; margin-bottom: 2.5rem;"> 
                    <span>Free</span> Delivery 
                </h1>
                <p style="font-size: 1.8rem; color: #666; line-height: 1.8; margin-bottom: 3rem;">
                    Raise the level of happiness with delivery service... (your original message)
                </p>
                <ul style="font-size: 1.7rem; color: #333; list-style: none; line-height: 2;">
                    <li><i class="fas fa-check-circle" style="color: var(--pink); margin-right: 1rem;"></i> Free delivery when purchasing ฿500 or more.</li>
                    <li><i class="fas fa-check-circle" style="color: var(--pink); margin-right: 1rem;"></i> Fast delivery within 90 minutes</li>
                    <li><i class="fas fa-check-circle" style="color: var(--pink); margin-right: 1rem;"></i> Guaranteed freshness, damage, happy to refund.</li>
                </ul>
                <button class="btn" onclick="closeServiceModal()" style="margin-top: 4rem; font-size: 1.8rem;">Close the window</button>
            </div>
        </div>
    `;
    openServiceModal();
}


//////ends


////////////////Return Policy//////////////////

// 2. ฟังก์ชันสำหรับ 10 Days Returns
function openReturnPolicy() {
    const content = document.getElementById('serviceContent');
    // ปรับขนาด Wrapper ให้เล็กลงมาหน่อยเพื่อให้ดูเป็นสัดส่วน (ถ้าต้องการ)
    document.getElementById('serviceModalWrapper').style.maxWidth = '800px'; 
    
    content.innerHTML = `
        <div style="padding: 5rem; text-align: center; background: #fff;">
            <div class="return-icon-box" style="margin-bottom: 3rem;">
                <i class="fas fa-box-open" style="font-size: 8rem; color: var(--pink); animation: boxRotate 2s infinite ease-in-out;"></i>
            </div>
            
            <h1 class="heading" style="font-size: 3.5rem; margin-bottom: 2rem;"> <span>10 Days</span> Returns </h1>
            <p style="font-size: 1.8rem; color: #666; margin-bottom: 4rem;">"Your satisfaction is our heart." If the product is not in perfect condition <br> We are happy to take care of it and accept it back within 10</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: left; margin-bottom: 4rem;">
                <div style="background: #f9f9f9; padding: 2rem; border-radius: 1rem;">
                    <h4 style="font-size: 1.8rem; color: var(--pink); margin-bottom: 1rem;">1. Complete product</h4>
                    <p style="font-size: 1.4rem; color: #777;">Items must be in their original packaging and unused.</p>
                </div>
                <div style="background: #f9f9f9; padding: 2rem; border-radius: 1rem;">
                    <h4 style="font-size: 1.8rem; color: var(--pink); margin-bottom: 1rem;">2. Notify within 10 days</h4>
                    <p style="font-size: 1.4rem; color: #777;">From the date of receiving the product according to the transportation system</p>
                </div>
                <div style="background: #f9f9f9; padding: 2rem; border-radius: 1rem;">
                    <h4 style="font-size: 1.8rem; color: var(--pink); margin-bottom: 1rem;">3. Video evidence</h4>
                    <p style="font-size: 1.4rem; color: #777;">Please take a video while unpacking to speed up your claim.</p>
                </div>
            </div>

            <button class="btn" onclick="closeServiceModal()" style="width: 200px;">acknowledge</button>
        </div>
    `;
    openServiceModal();
}


///////ends/////



/////Gift Finder Logic////////
// 3. ฟังก์ชันสำหรับ Personalized Gift Guide
function openGiftGuide() {
    const content = document.getElementById('serviceContent');
    document.getElementById('serviceModalWrapper').style.maxWidth = '700px'; 
    
    // หน้าแรกของแบบสอบถาม
    content.innerHTML = `
        <div id="quizContainer" style="padding: 5rem; text-align: center;">
            <h1 class="heading" style="font-size: 3rem;">Find the <span>Perfect Gift</span></h1>
            <p style="font-size: 1.6rem; color: #666; margin-bottom: 3rem;">Let us help you choose the most appropriate flowers for your special someone.</p>
            
            <div id="quizStep">
                <h3 style="font-size: 2rem; margin-bottom: 2rem;">What special "tone" does the recipient like?</h3>
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <button class="btn" style="width: 100%;" onclick="processQuiz('Red')">❤️ Red/pink tone (romantic love)</button>
                    <button class="btn" style="width: 100%;" onclick="processQuiz('White')">🤍 White/soft tone (pure, sincere)</button>
                    <button class="btn" style="width: 100%;" onclick="processQuiz('Yellow')">💛 Yellow/orange tone (bright, friendly)</button>
                </div>
            </div>
        </div>
    `;
    openServiceModal();
}

// ฟังก์ชันประมวลผลคำตอบ (Logic)
function processQuiz(color) {
    const quizContainer = document.getElementById('quizContainer');
    
    // จำลองข้อมูลสินค้า (แก้ไข Path ให้ตรงกับโฟลเดอร์ imges/pot)
    const recommendations = {
        'Red': { 
            name: 'Eternal Rose Bouquet', 
            img: 'imges/pot/pA (2).jpg', 
            desc: 'classic red rose Instead of a promise to love forever' 
        },
        'White': { 
            name: 'White Lily Grace', 
            img: 'imges/pot/pA (11).jpg', 
            desc: 'white lily Instead of elegance and sincerity' 
        },
        'Yellow': { 
            name: 'Sunshine Sunflower', 
            img: 'imges/pot/pA (1).jpg', 
            desc: 'Bright sunflowers represent encouragement and good friendship.' 
        }
    };

    const result = recommendations[color];

    // ... โค้ดส่วนแสดงผลลัพธ์เดิมใน processQuiz ...
quizContainer.innerHTML = `
    <h1 class="heading" style="font-size: 3rem;">Best Match <span>For You</span></h1>
    <div style="margin: 2rem 0;">
        <img src="${result.img}" style="height: 250px; border-radius: 1rem; margin-bottom: 1.5rem;">
        <h2 style="font-size: 2.2rem; color: var(--pink);">${result.name}</h2>
        <p style="font-size: 1.6rem; color: #666; margin: 1rem 0;">${result.desc}</p>
    </div>
    <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn" onclick="openGiftGuide()">Try choosing again.</button>
        <button class="btn" style="background: #333;" onclick="scrollToProducts()">See product details</button>
    </div>
`;
}

function scrollToProducts() {
    // 1. ปิด Modal ก่อน
    closeServiceModal();

    // 2. เลื่อนหน้าจอไปที่ส่วน Products แบบนุ่มนวล
    const productSection = document.getElementById('products');
    if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });

        // 3. แถมความเวอร์: ใส่ Effect "เด้ง" ให้โซนสินค้า (Highlight)
        productSection.style.transition = 'transform 0.5s ease';
        productSection.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            productSection.style.transform = 'scale(1)';
        }, 500);
    }
}

/////เชื่อมapi การเติมคอน์ย
let luviaCoins = parseFloat(localStorage.getItem('luvia_coins')) || 0;

// อัปเดตตัวเลขคอยน์บนหน้าจอ
function updateWalletUI() {
    const coinDisplay = document.getElementById('user-coins');
    if(coinDisplay) coinDisplay.innerText = luviaCoins.toLocaleString();
    localStorage.setItem('luvia_coins', luviaCoins);
}

// เปิด-ปิด กระเป๋าเงิน
function toggleWallet() {
    const modal = document.getElementById('wallet-modal');
    modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'flex' : 'none';
    updateWalletUI();
}

function showTopUp() { document.getElementById('topup-modal').style.display = 'flex'; }
function closeTopUp() { document.getElementById('topup-modal').style.display = 'none'; }

// ฟังก์ชันเติมเงิน (จำลอง)
function simulateTopUp() {
    luviaCoins += 500;
    updateWalletUI();
    alert("Successfully added coins! Current balance is: " + luviaCoins + " LC 🌸");
    closeTopUp();
}

////////////////สำหรับหน้า Pre-order////////
// --- ระบบตะกร้าเฉพาะหน้า Pre-order (Standalone) ---

let preOrderCart = []; // ตัวแปรเก็บสินค้าเฉพาะหน้านี้

function handleAddToCart(element) {
    // 1. หา "กล่องสินค้า" (box) ของปุ่มที่ถูกกด
    const box = element.closest('.box');
    
    // 2. ดึงข้อมูลสินค้าจากในกล่องนั้น
    const name = box.querySelector('h4').innerText;
    // ดึงราคา (รองรับทั้งเครื่องหมาย $ หรือตัวเลข)
    const priceText = box.querySelector('.price').innerText.replace(/[^0-9.]/g, ''); 
    const price = parseFloat(priceText);
    
    // 3. ดึงจำนวน (Qty) จากช่อง Input ที่อยู่ใกล้ๆ
    const qtyInput = box.querySelector('input[type="number"]');
    const qty = parseInt(qtyInput.value);
    
    const img = box.querySelector('img').src;

    // 4. ตรวจสอบว่ามีในตะกร้าหรือยัง
    const existingItem = preOrderCart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        preOrderCart.push({ name, price, qty, img });
    }

    // 5. อัปเดตการแสดงผล
    updateCartDisplay();
    alert(`Item "${name}" amount of ${qty} tems has been added to cart 🌸`);
    
    // (Optional) รีเซ็ตเลขกลับเป็น 1 หลังจากกดเพิ่มแล้ว
    qtyInput.value = 1; 
}

function updateCartDisplay() {
    const cartBadge = document.getElementById('cart-count');
    const totalQty = preOrderCart.reduce((sum, item) => sum + item.qty, 0);

    if (cartBadge) {
        cartBadge.innerText = totalQty;
        cartBadge.style.display = totalQty > 0 ? 'block' : 'none';
    }
    renderPreOrderCart();
}

// ฟังก์ชันสำหรับ "วาด" รายการสินค้าลงในหน้าต่างตะกร้า
function renderPreOrderCart() {
    const list = document.getElementById('preorder-items-list'); // ดึงกล่องรายการ
    const totalPriceDisplay = document.getElementById('preorder-total-price'); // ดึงที่โชว์ราคารวม
    
    // ถ้าหาที่วางไม่เจอ ให้หยุดทำงาน (กัน Error)
    if (!list || !totalPriceDisplay) return;

    // 1. ถ้าตะกร้าว่าง ให้โชว์ข้อความว่างเปล่า
    if (preOrderCart.length === 0) {
        list.innerHTML = '<p style="text-align:center; font-size:1.8rem; padding:2rem; color:#888;">The basket is empty... 🌸</p>';
        totalPriceDisplay.innerText = '$0.00';
        return;
    }

    // 2. ถ้ามีของ ให้สร้าง HTML แสดง รูป + ชื่อ + ราคา
    let html = '';
    let grandTotal = 0;

    preOrderCart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        html += `
            <div class="cart-item" style="display:flex; align-items:center; gap:1.5rem; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid #eee;">
                <img src="${item.img}" style="width:7rem; height:7rem; object-fit:cover; border-radius:.8rem;">
                <div style="flex:1;">
                    <h3 style="font-size:1.7rem; color:#333;">${item.name}</h3>
                    <p style="font-size:1.4rem; color:#666;">$${item.price.toFixed(2)} x ${item.qty}</p>
                </div>
                <div style="font-size:1.8rem; font-weight:bold; color:var(--pink);">$${itemTotal.toFixed(2)}</div>
                <i class="fas fa-trash" onclick="removeFromPreOrderCart(${index})" style="cursor:pointer; color:#ff5e5e; font-size:1.6rem; margin-left:1rem;"></i>
            </div>
        `;
    });

    // 3. เอา HTML ที่สร้างเสร็จไปแปะในหน้าเว็บ
    list.innerHTML = html;
    totalPriceDisplay.innerText = `$${grandTotal.toFixed(2)}`;
}



/////////หน้าหัวใจรายกาารที่ถูกใจ///////////
let wishlist = []; // เก็บแค่ชื่อสินค้าเป็น Array

// ฟังก์ชันเมื่อกดที่รูป (ที่คุณใส่ onclick ไว้แล้ว)
function addToWishlist(productName) {
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
        updateWishlistDisplay();
        alert("Add item '" + productName + "' It's in the list of favorites. ❤️");
    } else {
        alert("This item is already on the list.");
    }
}

// ฟังก์ชันวาดรายการ (โชว์แค่ชื่อ)
function updateWishlistDisplay() {
    const floatBadge = document.getElementById('wishlist-count-float');
    const listContainer = document.getElementById('wishlist-items-list');
    
    // อัปเดตเลข 1, 2, 3
    if (floatBadge) {
        floatBadge.innerText = wishlist.length;
        floatBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }

    // สร้างลิสต์รายชื่อ
    let html = '';
    wishlist.forEach((name, index) => {
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:1.2rem; border-bottom:1px solid #eee; font-size:1.6rem;">
                <span>🌸 ${name}</span>
                <i class="fas fa-trash" onclick="removeFromWishlist(${index})" style="color:#ff5e5e; cursor:pointer;"></i>
            </div>
        `;
    });
    if (listContainer) listContainer.innerHTML = html || '<p style="text-align:center; padding:2rem;">There are no favorite items yet.</p>';
}

// ฟังก์ชันเปิด-ปิด (สั่งบล็อกหน้าตะกร้า)
function toggleWishlist() {
    const wishlistModal = document.getElementById('wishlist-modal');
    const preorderModal = document.getElementById('preorder-modal');

    // บล็อก: ปิดหน้าตะกร้าทันทีถ้ามันเปิดอยู่
    if (preorderModal) preorderModal.style.display = 'none';

    if (wishlistModal) {
        wishlistModal.style.display = (wishlistModal.style.display === 'none' || wishlistModal.style.display === '') ? 'flex' : 'none';
    }
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlistDisplay();
}



/////////สำหรับระบบตะกร้า//////

