const inMemoryDB = {
    users: [
        {
            id: '820a3939-47ef-4e0a-877f-3336e65efb71',
            name: 'USER',
            login: 'user',
            password: 'P@55w0rd'
        },

    ],
    boards: [
        {
            id: '74592e6d-bf49-4f28-9c13-68fb3c627dfc',
            title: 'boards title',
            columns: ['87de179b-c4f7-4806-940e-31bdde865422']
        },
    ],
    tasks: [
        {
            id: 'e5c4debb-e32f-4b24-9005-c378bc425fae',
            title: 'tasks title',
            order: 'tasks order',
            description: 'tasks description',
            userId: '820a3939-47ef-4e0a-877f-3336e65efb71',
            boardId: '74592e6d-bf49-4f28-9c13-68fb3c627dfc',
            columnId: '87de179b-c4f7-4806-940e-31bdde865422'
        },

    ]
};

module.exports = inMemoryDB;
