export const ROUTES = {
    "roles.html": "http://localhost:3000/api/roles",
    "users.html": "http://localhost:3000/api/users",
    "complaints.html": "http://localhost:3000/api/complaints",
    "initiatives.html": "http://localhost:3000/api/initiatives",
    "notices.html": "http://localhost:3000/api/notices",
    "news.html": "http://localhost:3000/api/news",
};

export const COLUMNS = {
    "roles.html": ["type"],
    "users.html": ["id", "name", "lastName", "email", "phone", "role"],
    "complaints.html": [
        "createdAt",
        "title",
        "content",
        "status",
        "author",
        "active",
    ],
    "initiatives.html": [
        "createdAt",
        "title",
        "content",
        "status",
        "author",
        "active",
    ],
    "notices.html": [
        "createdAt",
        "title",
        "content",
        "status",
        "author",
        "active",
    ],
    "news.html": [
        "createdAt",
        "title",
        "content",
        "status",
        "author",
        "active",
    ],
};
