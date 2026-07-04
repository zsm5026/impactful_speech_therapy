# Single Page Application (SPA)

A modern, responsive single-page application built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
spa-website/
├── index.html       # Main HTML file with navigation and app container
├── styles.css       # All styling (responsive design included)
├── app.js          # JavaScript logic for page switching and DOM updates
└── README.md       # This file
```

## Features

✨ **Dynamic Page Loading** - Click nav items to update content without page reloads
🎨 **Responsive Design** - Works beautifully on desktop, tablet, and mobile
⚡ **Smooth Animations** - Fade-in effects when switching pages
🎯 **Clean Architecture** - Vanilla JavaScript with clear separation of concerns
📱 **Modern UI** - Beautiful gradient design with hover effects

## How It Works

### Navigation Flow
1. User clicks a link in the navbar (e.g., "About")
2. JavaScript event listener prevents default link behavior
3. `loadPage()` function is called with the page name
4. DOM is updated with the new page content
5. Active nav link is highlighted
6. Page title updates in browser tab

### Key Components

**HTML (index.html)**
- Semantic HTML5 structure
- Navigation bar with `data-page` attributes for linking
- `#app-content` div where dynamic content is inserted

**CSS (styles.css)**
- Flexbox layout for navbar
- Grid layout for content cards
- Responsive media queries
- Smooth animations and transitions

**JavaScript (app.js)**
- `pages` object containing all page templates
- `loadPage(pageName)` function to switch pages
- Event listeners on nav links
- Form handling for contact page

## Getting Started

1. Open `index.html` in your browser (or use a local server)
2. Click navigation links to see pages update dynamically
3. Try the contact form on the Contact page

## Extending the App

### Adding a New Page

1. Add a new entry to the `pages` object in `app.js`:

```javascript
yourpage: {
    title: 'Your Page',
    content: `
        <h1>Your Page Title</h1>
        <p>Your content here</p>
    `
}
```

2. Add a nav link in `index.html`:

```html
<li><a href="#" data-page="yourpage">Your Page</a></li>
```

### Connecting to a Backend

To fetch data from a Django backend or API:

```javascript
function loadPage(pageName) {
    // Fetch data from API
    fetch(`/api/${pageName}/`)
        .then(response => response.json())
        .then(data => {
            // Update DOM with fetched data
            appContent.innerHTML = data.content;
        });
}
```

## Browser Support

Works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Tips

- Use browser DevTools to inspect DOM changes
- Check the Console to see form submission data
- Modify CSS to customize colors and layout
- Add more pages by following the pattern above

Enjoy building! 🚀
