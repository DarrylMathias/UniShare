import { myItems } from "../data/transaction";
import { myRequests } from "../data/transaction";

function renderMyItems(items) {
    const grid = document.getElementById('myItemsGrid');

    if (items.length === 0) {
        grid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📦</div>
                        <div class="empty-state-title">No items listed yet</div>
                        <p>Start sharing your resources with the campus community</p>
                    </div>
                `;
        return;
    }

    grid.innerHTML = items.map(item => `
                <div class="item-card ${item.status}">
                    <div class="item-header">
                        <img class="item-image" src=${item.image} />
                        <div class="item-info">
                            <h3 class="item-title">${item.title}</h3>
                            <span class="item-category">${item.category.replace('-', ' ')}</span>
                            <div class="item-details">
                                <span>Listed: ${formatDate(item.listedDate)}</span>
                                <span>Type: ${item.sharingType === 'lend' ? 'Lend' : 'Donate'}</span>
                            </div>
                        </div>
                        <span class="status-badge status-${item.status}">
                            ${getStatusText(item.status)}
                        </span>
                    </div>
                    
                    ${item.status === 'has-requests' ? `
                        <div class="requests-list">
                            <div class="requests-title">Pending Requests (${item.requests.length}):</div>
                            ${item.requests.map(request => `
                                <div class="request-item">
                                    <div class="requester-info">
                                        <div class="requester-name">${request.name}</div>
                                        <div class="requester-email">${request.email}</div>
                                    </div>
                                    <div class="request-actions">
                                        <button class="btn btn-success btn-sm" onclick="acceptRequest('${request.name}', ${item.id})">Accept</button>
                                        <button class="btn btn-danger btn-sm" onclick="rejectRequest('${request.name}', ${item.id})">Reject</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="item-footer">
                        <div class="item-meta">
                            ${getItemMeta(item)}
                        </div>
                        <div class="item-actions">
                            ${getItemActions(item)}
                        </div>
                    </div>
                </div>
            `).join('');
}

function renderMyRequests(requests) {
    const grid = document.getElementById('myRequestsGrid');

    if (requests.length === 0) {
        grid.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <div class="empty-state-title">No requests yet</div>
                        <p>Browse available items to start borrowing</p>
                    </div>
                `;
        return;
    }

    grid.innerHTML = requests.map(request => `
                <div class="item-card ${request.status}">
                    <div class="item-header">
                        <img class="item-image" src=${request.image} />
                        <div class="item-info">
                            <h3 class="item-title">${request.title}</h3>
                            <span class="item-category">${request.category.replace('-', ' ')}</span>
                            <div class="item-details">
                                <span>Owner: ${request.owner}</span>
                                <span>Location: ${request.location}</span>
                            </div>
                        </div>
                        <span class="status-badge status-${request.status}">
                            ${getStatusText(request.status)}
                        </span>
                    </div>
                    <div class="item-footer">
                        <div class="item-meta">
                            ${getRequestMeta(request)}
                        </div>
                        <div class="item-actions">
                            ${getRequestActions(request)}
                        </div>
                    </div>
                </div>
            `).join('');
}

function getStatusText(status) {
    const statusTexts = {
        'has-requests': 'Has Requests',
        'lent-out': 'Lent Out',
        'donated': 'Donated',
        'pending': 'Pending',
        'approved': 'Approved',
        'active': 'Borrowed',
        'completed': 'Completed',
        'rejected': 'Rejected'
    };
    return statusTexts[status] || status;
}

function getItemMeta(item) {
    if (item.status === 'lent-out') {
        return `<span>Borrowed by ${item.currentBorrower}</span><span>Return by: ${formatDate(item.returnDate)}</span>`;
    } else if (item.status === 'donated') {
        return `<span>Donated to ${item.donatedTo}</span>`;
    } else {
        return `<span>Awaiting responses</span>`;
    }
}

function getRequestMeta(request) {
    const lines = [`<span>Requested: ${formatDate(request.requestDate)}</span>`];

    if (request.status === 'active' && request.returnDate) {
        lines.push(`<span>Return by: ${formatDate(request.returnDate)}</span>`);
    } else if (request.status === 'approved' && request.pickupDate) {
        lines.push(`<span>Pickup scheduled: ${formatDate(request.pickupDate)}</span>`);
    } else if (request.status === 'completed' && request.returnedDate) {
        lines.push(`<span>Returned: ${formatDate(request.returnedDate)}</span>`);
    }

    return lines.join('');
}

function getItemActions(item) {
    if (item.status === 'lent-out') {
        return `<button class="btn btn-success" onclick="markReturned(${item.id})">Mark as Returned</button>`;
    } else {
        return '';
    }
}

function getRequestActions(request) {
    if (request.status === 'pending') {
        return `
                    <button class="btn btn-secondary" onclick="contactOwner(${request.id})">Contact Owner</button>
                    <button class="btn btn-danger" onclick="cancelRequest(${request.id})">Cancel</button>
                `;
    } else if (request.status === 'approved') {
        return `
                    <button class="btn btn-primary" onclick="contactOwner(${request.id})">Contact Owner</button>
                    <button class="btn btn-success" onclick="markPickedUp(${request.id})">Mark Picked Up</button>
                `;
    } else if (request.status === 'active') {
        return `
                    <button class="btn btn-secondary" onclick="contactOwner(${request.id})">Contact Owner</button>
                    <button class="btn btn-success" onclick="markReturned(${request.id})">Mark Returned</button>
                `;
    } else if (request.status === 'rejected') {
        return `<button class="btn btn-secondary" onclick="requestAgain(${request.id})">Request Again</button>`;
    } else {
        return '';
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

// Action functions
function acceptRequest(requesterName, itemId) {
    alert(`Accepted request from ${requesterName} for item ${itemId}`);
}
function rejectRequest(requesterName, itemId) {
    alert(`Rejected request from ${requesterName} for item ${itemId}`);
}
function markReturned(itemId) { alert(`Marking item ${itemId} as returned`); }
function contactOwner(requestId) { alert(`Contacting owner for request ${requestId}`); }
function cancelRequest(requestId) { alert(`Cancelling request ${requestId}`); }
function markPickedUp(requestId) { alert(`Marking request ${requestId} as picked up`); }
function requestAgain(requestId) { alert(`Requesting item ${requestId} again`); }



document.getElementById('itemsFilter').addEventListener('change', function () {
    const filter = this.value;
    const filtered = filter === 'all' ? myItems : myItems.filter(item => item.status === filter);
    renderMyItems(filtered);
});

document.getElementById('requestsFilter').addEventListener('change', function () {
    const filter = this.value;
    const filtered = filter === 'all' ? myRequests : myRequests.filter(request => request.status === filter);
    renderMyRequests(filtered);
});


renderMyItems(myItems);
renderMyRequests(myRequests);