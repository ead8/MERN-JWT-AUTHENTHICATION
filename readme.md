# MERN Authentication with jwt

Rename the create `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri :-go to mongodb atlas and create db or create your mongodb database on localmachine and past the url here 
JWT_SECRET = 'abc123'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
