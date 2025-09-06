# API Documentation

## Authentication

All protected routes require a JWT token in the `x-auth-token` header.

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "5h",
  "user": {
    "id": "64f1234567890abcdef12345",
    "username": "admin"
  }
}
```

## Projects API

### Get All Projects
```http
GET /api/projects
```

### Get Single Project
```http
GET /api/projects/:id
```

### Create Project (Protected)
```http
POST /api/projects
x-auth-token: your_jwt_token
Content-Type: application/json

{
  "title": "My Awesome Project",
  "slug": "my-awesome-project",
  "summary": "A brief description of the project",
  "description": "Full markdown description of the project",
  "coverImage": "https://res.cloudinary.com/your-cloud/image.jpg",
  "technologies": ["React", "Node.js", "MongoDB"],
  "liveUrl": "https://project-demo.com",
  "githubUrl": "https://github.com/username/project"
}
```

### Update Project (Protected)
```http
PUT /api/projects/:id
x-auth-token: your_jwt_token
Content-Type: application/json

{
  "title": "Updated Project Title"
}
```

### Delete Project (Protected)
```http
DELETE /api/projects/:id
x-auth-token: your_jwt_token
```

## Blogs API

### Get All Blogs
```http
GET /api/blogs
```

### Create Blog (Protected)
```http
POST /api/blogs
x-auth-token: your_jwt_token
Content-Type: application/json

{
  "title": "My First Blog Post",
  "slug": "my-first-blog-post",
  "summary": "This is a summary of my blog post",
  "content": "# Full markdown content\n\nThis is the full blog content...",
  "coverImage": "https://res.cloudinary.com/your-cloud/blog-image.jpg",
  "tags": ["JavaScript", "Web Development"]
}
```

## Skills API

### Get All Skills
```http
GET /api/skills
```

### Add Skill (Protected)
```http
POST /api/skills
x-auth-token: your_jwt_token
Content-Type: application/json

{
  "name": "React.js",
  "category": "Web Development"
}
```

**Valid Categories:**
- Programming
- Web Development
- Databases
- Tools & Platforms
- Cloud & DevOps

## Achievements API

### Get All Achievements
```http
GET /api/achievements
```

### Add Achievement (Protected)
```http
POST /api/achievements
x-auth-token: your_jwt_token
Content-Type: application/json

{
  "title": "AWS Certified Developer",
  "issuer": "Amazon Web Services",
  "url": "https://aws.amazon.com/certification/",
  "isCertification": true,
  "date": "Dec 2024"
}
```

## Contacts API

### Get All Contacts
```http
GET /api/contacts
```

### Add Contact (Protected)
```http
POST /api/contacts
x-auth-token: your_jwt_token
Content-Type: application/json

{
  "sitename": "LinkedIn",
  "link": "https://linkedin.com/in/yourprofile"
}
```

## File Upload API

### Upload Image (Protected)
```http
POST /api/upload
x-auth-token: your_jwt_token
Content-Type: multipart/form-data

image: [file]
```

**Response:**
```json
{
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v123456789/portfolio/filename.jpg",
  "publicId": "portfolio/filename",
  "msg": "Image uploaded successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "msg": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Server Error
