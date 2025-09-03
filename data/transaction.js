export const myItems = [
    {
        id: 1,
        title: "Operating Systems : Achyut Godbole",
        category: "books",
        image: "public/images/OS.jpeg",
        status: "has-requests",
        listedDate: "2024-08-15",
        sharingType: "lend",
        requests: [
            { name: "Shafin Mirkar", email: "shafinmirkar@tsec.edu" },
            { name: "Manish Rajarathinam", email: "manish.raja@tsec.edu" },
            { name: "Shree Takalkar", email: "its.shree@tsec.edu" }
        ]
    },
    {
        id: 2,
        title: "Scientific Calculator",
        category: "electronics",
        image: "public/images/casio.png",
        status: "lent-out",
        currentBorrower: "Sarah M.",
        listedDate: "2024-08-10",
        sharingType: "lend",
        returnDate: "2024-10-10"
    },
    {
        id: 3,
        title: "Data Structures Notes",
        category: "notes",
        image: "public/images/dsnotes.jpeg",
        status: "donated",
        listedDate: "2024-01-20",
        sharingType: "donate",
        donatedTo: "Alex Kumar"
    },
    {
        id: 4,
        title: "Lab Coat",
        category: "lab-equipment",
        image: "/public/images/coat.png",
        status: "has-requests",
        listedDate: "2024-08-18",
        sharingType: "lend",
        requests: [
            { name: "Maya Patel", email: "maya.patel@tsec.edu" }
        ]
    }
];

// Sample data for my requests
export const myRequests = [
    {
        id: 1,
        title: "MacBook Pro 13-inch",
        category: "electronics",
        image: "public/images/macbook.png",
        owner: "Shafin M.",
        status: "active",
        requestDate: "2024-08-12",
        approvedDate: "2024-08-13",
        pickupDate: "2024-08-14",
        returnDate: "2024-08-21",
        location: "Canteen"
    },
    {
        id: 2,
        title: "Basketball",
        category: "sports",
        image: "public/images/basketball.png",
        owner: "Jake T.",
        status: "completed",
        requestDate: "2024-01-08",
        approvedDate: "2024-01-08",
        returnedDate: "2024-01-09",
        location: "New Building"
    },
    {
        id: 4,
        title: "Exampad",
        category: "study-material",
        image: "/public/images/exampad.jpeg",
        owner: "Manish R.",
        status: "rejected",
        requestDate: "2024-01-16",
        location: "Old Building"
    }
];