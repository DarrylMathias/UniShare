const sampleItems = [
    {
        id: 1,
        title: "Operating Systems : Achyut Godbole",
        description: "3rd edition textbook in excellent condition. All chapters included",
        category: "books",
        sharingType: "lend",
        duration: "1 Semester",
        pickup: "Library",
        owner: "Darryl M.",
        image: "/public/images/OS.jpeg",
        requests: 5
    },
    {
        id: 2,
        title: "MacBook Pro 13-inch",
        description: "2019 model with charger included. Perfect for coding projects and presentations.",
        category: "electronics",
        sharingType: "lend",
        duration: "1 Week",
        pickup: "Student Lounge",
        owner: "Manish R.",
        image: "/public/images/macbook.png",
        requests: 12
    },
    {
        id: 3,
        title: "Lab Coat Chemistry",
        description: "Recently cleaned and ironed.",
        category: "lab-equipment",
        sharingType: "donate",
        duration: "Permanent",
        pickup: "Old Building",
        owner: "Shafin M.",
        image: "/public/images/coat.png",
        requests: 3
    },
    {
        id: 4,
        title: "Data Structures Notes",
        description: "Complete handwritten notes covering all topics with examples and practice problems.",
        category: "notes",
        sharingType: "donate",
        duration: "Permanent",
        pickup: "604, New Building",
        owner: "Wilbert N.",
        image: "/public/images/dsnotes.jpeg",
        requests: 8
    },
    {
        id: 5,
        title: "Scientific Calculator",
        description: "FX-991 ESPlus CE calculator. Great for math and engineering.",
        category: "electronics",
        sharingType: "lend",
        duration: "2 Weeks",
        pickup: "Canteen",
        owner: "Kumar R.",
        image: "/public/images/casio.png",
        requests: 6
    }
];

let filteredItems = [...sampleItems];

function renderItems(items) {
    const grid = document.getElementById('itemsGrid');
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = `Showing ${items.length} item(s)`;

    grid.innerHTML = items.map(item => `
                <div class="item-card">
                    <img class="item-image" src = ${item.image} style='object-fit : contain;'/>
                    <div class="item-header">
                        <h3 class="item-title">${item.title}</h3>
                        <span class="item-category">${item.category.replace('-', ' ')}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-details">
                        <div class="detail-item sharing-type ${item.sharingType}">
                            <span class="detail-icon">🔄</span>
                            <span class="badge">${item.sharingType === 'lend' ? 'Lend' : 'Donate'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">⏰</span>
                            <span>${item.duration}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-icon">📍</span>
                            <span>${item.pickup}</span>
                        </div>
                    </div>
                    <div class="item-footer">
                        <div class="owner-info">
                            <div class="owner-avatar">${item.owner.charAt(0)}</div>
                            <span class="owner-name">${item.owner}</span>
                        </div>
                        <button class="request-btn" onclick="requestItem(${item.id})">Request</button>
                    </div>
                </div>
            `).join('');
}

function filterItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;

    let filtered = sampleItems.filter(item => {
        const matchesSearch = 
            item.title.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm) ||
            item.sharingType.toLowerCase().includes(searchTerm) || 
            item.duration.toLowerCase().includes(searchTerm) || 
            item.pickup.toLowerCase().includes(searchTerm) || 
            item.owner.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Sort items
    if (sortFilter === 'popular') {
        filtered.sort((a, b) => b.requests - a.requests);
    } else {
        filtered.sort((a, b) => b.id - a.id); // Newest first
    }

    filteredItems = filtered;
    renderItems(filtered);
}

function requestItem(itemId) {
    const item = sampleItems.find(i => i.id === itemId);
    alert(`Request sent for "${item.title}" to ${item.owner}`);
}

document.getElementById('searchInput').addEventListener('input', filterItems);
document.getElementById('categoryFilter').addEventListener('change', filterItems);
document.getElementById('sortFilter').addEventListener('change', filterItems);

// Initial render
renderItems(sampleItems);