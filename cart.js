// Cart data handling
let cart = JSON.parse(localStorage.getItem('amall_cart')) || [];

const products = {
    1: {
        id: 1,
        name: 'Midnight Bloom',
        price: 180,
        image: 'assets/perfume1.png',
        description: 'A deeply mysterious fragrance that captures the essence of night-blooming jasmine and rich oud with a hint of dark vanilla.',
        notes: {
            top: 'Blackberry, Pear',
            heart: 'Midnight Jasmine, Iris',
            base: 'Oud, Sandalwood, Vanilla'
        }
    },
    2: {
        id: 2,
        name: 'Onyx Reserve',
        price: 220,
        image: 'assets/perfume2.png',
        description: 'An intense and commanding scent featuring bold leather accords, smoked cedarwood, and a touch of black pepper for the modern leader.',
        notes: {
            top: 'Black Pepper, Bergamot',
            heart: 'Leather, Cardamom',
            base: 'Smoked Cedar, Musk, Patchouli'
        }
    },
    3: {
        id: 3,
        name: 'Golden Aurum',
        price: 195,
        image: 'assets/perfume3.png',
        description: 'A warm and radiant fragrance that glows with the brilliance of honeyed amber, sun-drenched orange blossom, and creamy cashmere wood.',
        notes: {
            top: 'Tangerine, Neroli',
            heart: 'Orange Blossom, Honey',
            base: 'Amber, Cashmere Wood, Labdanum'
        }
    }
};

function saveCart() {
    localStorage.setItem('amall_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCart();

    // Simple feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = 'Added!';
    btn.style.background = '#fcfcfc';
    btn.style.color = '#0a0e1a';

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
        }
    }
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
}

function updateCartUI() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(el => {
        el.innerText = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Initialize UI on load
document.addEventListener('DOMContentLoaded', updateCartUI);
