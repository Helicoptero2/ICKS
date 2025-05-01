# HTML Bootstrap BAAS Project

## Overview
This project is a web application for the Federación Colombiana de Taekwondo, built using HTML, Tailwind CSS, and Supabase as a Backend-as-a-Service (BaaS). It allows clubs to register, manage members, and handle tournament inscriptions.

## Project Structure
```
html-bootstrap-baas-project
├── src
│   ├── index.html           # Login page
│   ├── dashboard.html       # Admin dashboard for club and tournament management
│   ├── users.html           # Club panel for managing members and inscriptions
│   ├── css
│   │   └── styles.css       # Custom styles
│   ├── js
│   │   ├── auth.js          # Authentication logic and alerts
│   │   ├── dashboard.js     # Dashboard logic (admin)
│   │   ├── login.js         # Login logic
│   │   ├── postgres.js      # Supabase/Postgres data access functions
│   │   └── supabase.js      # Supabase client and insert helpers
│   └── assets
│       └── logo.svg         # Logo for the web application
├── README.md                # Project documentation
└── .gitignore               # Files to ignore in version control
```

## Features

- **Club Registration:** Register clubs with club name, email, and sensei.
- **Member Management:** Add members with fields: Nombre, Apellido, Cédula, Sexo, Celular, Dirección, Correo, Cinturón, Categoría (Kumite/Kata), Peso, Talla.
- **Tournament Management:** Create and list tournaments.
- **Inscription:** Assign members to tournaments.
- **Authentication:** Login and logout using Supabase Auth.
- **Responsive UI:** Built with Tailwind CSS for modern, responsive design.
- **Modern Alerts:** Custom alert system for user feedback.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```
   cd html-bootstrap-baas-project
   ```
3. **Open the `src/index.html` file in a web browser to view the application.**

## Usage Guidelines

- **Admin Dashboard:** Use `dashboard.html` to register clubs, add members, and manage tournaments.
- **Club Panel:** Use `users.html` for club-specific actions like viewing members and inscribing them in tournaments.
- **Authentication:** Only registered users can access the dashboard and club panel.
- **Modify Styles:** Edit `src/css/styles.css` for custom styles.
- **Update Logic:** Edit files in `src/js/` to change or extend functionality.

## Technologies Used

- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Postgres, Auth)
- [Font Awesome](https://fontawesome.com/)
- Vanilla JavaScript (ES Modules)

## Contributing

Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License.