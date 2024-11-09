# Startup Showcase App

Welcome to the Startup Showcase App! This web application allows users to explore various startups, view detailed profiles, and connect with startup founders. Built using Next.js and Sanity.io, this app leverages Client-Side Rendering (CSR) techniques for a seamless user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Error Tracking](#error-tracking)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Profiles**: View detailed profiles of startup founders, including their startups and personal information.
- **Dynamic Content**: Real-time data fetching for an interactive experience.
- **Skeleton Screens**: Enhanced loading states with skeleton screens to improve perceived performance.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: Robust error handling to manage data fetching issues gracefully.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Sanity.io**: A headless CMS for structured content management.
- **Auth.js**: Library for authentication with support for multiple providers including Google and GitHub.
- **Sentry**: Tool for real-time error tracking and monitoring.
- **Lucide Icons**: A set of customizable icons for React applications.
- **Shadcn**: A set of customizable reuseable components for React applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Installation

To get started with the Startup Showcase App, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/startup-showcase.git
   cd startup-showcase
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a .env.local file in the root directory and add your Sanity project ID, dataset, and Auth.js credentials:

```text

SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
SENTRY_DSN=your_sentry_dsn
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:3000.

## Usage

Once the app is running, you can:

- Browse the startup showcase page.
- Filter startups by category.
- View startup details, including description and pitch.
- Search for startups by name or description.
- Log in with Google or GitHub to access additional features.
- Report errors or issues using the Sentry error tracking tool.

- Browse through various startup profiles.
- Click on a startup to view detailed information, including the founder's profile.
- Explore real-time updates on startups and their activities.

## Authentication

The Startup Showcase App uses Auth.js to provide secure authentication options. Users can sign in using:
-Google
-GitHub
This integration simplifies user management and enhances security while providing a smooth login experience.
Example Configuration
In your authentication setup file (e.g., pages/api/auth/[...nextauth].js), you can configure Auth.js like this:

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
```

```javascript
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // Additional configuration options...
});
```

This configuration sets up Google and GitHub authentication providers using the credentials stored in your environment variables.

## Error Tracking

    To ensure a smooth user experience, we integrate Sentry for real-time error tracking. This allows us to monitor application performance and catch bugs early.

## Setting Up Sentry

        To set up Sentry, follow these steps:
        Add your Sentry DSN in the .env.local file as shown above. In your application code, initialize Sentry like this:

```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  // Additional configuration options...
});
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a clear description of the changes.
4. Open a pull request to the main branch.
5. Collaborate with the maintainers to resolve any issues.
6. Once the pull request is merged, your changes will be live in the production environment.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

This project was built using Next.js, Tailwind CSS, and various other open-source libraries. We extend our heartfelt thanks to the creators of these libraries for their hard work and dedication to the open-source community.
We would also like to express our gratitude to JSM Mastery and specifically Adrian Hajdin for his invaluable guidance and support throughout this project. His tutorials and resources have been a significant source of inspiration, helping us to enhance our skills and implement best practices in web development. You can check out his work on GitHub: JSM Mastery GitHub[https://github.com/adrianhajdin].
Thank you to everyone who has contributed to the open-source ecosystem, making it easier for developers to learn, grow, and build amazing applications!

## Contact

If you have any questions or need further assistance, please don't hesitate to reach out to us at
[contact email](mailto:Fantastizeey@gmail.com). We're always happy to help.
