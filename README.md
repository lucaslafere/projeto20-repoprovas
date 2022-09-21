# Repoprovas! An API full of different tests and college exams, to let students help each other


 ## :rocket: Routes

```yml
POST /sign-up
    - Register a new user, creating an account
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremlorem",
    "confirmPassword": "loremlorem"
    }
```

```yml
POST /sign-in
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremlorem"
    }
```

```yml
POST /tests (authenticated)
    - Adds a new test/exam to the database
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "name": "test_name",
    "pdfUrl": "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    "categoryId": 1,
    "teacherDisciplineId": 1
    }
```

```yml
GET /tests-by-terms (authenticated)
    - Lists every test, organized by periods and disciplines
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests-by-teachers (authenticated)
    - Lists every test, organized by teacher
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
