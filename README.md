# MindStore - Digital Learning Products Marketplace

🎓 An online shop for digital learning products — courses, books, lectures, and podcasts.

## Features

- **Categories by field**: IT, Design, Languages
- **Video previews** for courses
- **Installment plan** — pay for learning in parts
- **Course reservation** (before the course starts)
- **Map** = offline branches / test centers
- **User authentication** - Registration and login system
- **Admin panel** - User and course management
- **Modern, unique styling** that nobody else has

## Pages

1. **Home** - Main landing page with featured content
2. **Courses** - Browse and search courses by category
3. **Course Detail** - Detailed view of individual courses
4. **Books** - Digital books and e-books
5. **Lectures** - Live lectures and webinars
6. **Podcasts** - Educational podcast subscriptions
7. **Cart** - Shopping cart and checkout
8. **Profile** - User profile and account management
9. **Installment Plan** - Flexible payment options
10. **Reservation** - Course reservation system
11. **Map** - Location finder for offline branches
12. **Register** - User registration
13. **Login** - User authentication
14. **Admin** - Administration panel

## Technology Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **React Router** - Navigation and routing
- **CSS3** - Custom styling with modern features

## Unique Design Elements

- **Glass morphism** effects with backdrop filters
- **Gradient accents** with purple to blue transitions
- **Floating animations** for interactive elements
- **Modern card-based** layout with hover effects
- **Responsive design** for all device sizes

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and sign up/sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the project settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables if needed (see .env.example)
6. Click "Deploy" and your site will be live!

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## Project Structure

```
src/
├── assets/          # Images, icons, and static assets
├── components/      # Reusable UI components
├── pages/           # Page components
├── App.css         # Global styles
├── App.jsx         # Main App component
├── main.jsx        # Entry point
└── index.css       # Base styles
```

## Customization

To customize the look and feel:
1. Modify colors in `src/App.css` (variables at the top)
2. Adjust component styles in their respective CSS files
3. Update content in the page components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Author

MindStore Team