#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Template for individual redirect pages
const htmlTemplate = (id) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta name="robots" content="noindex">
</head>
<body>
    <div>Redirecting...</div>
    <script>
        // Redirect using the API
        fetch(\`https://urls.varius.technology/api/redirect?id=${id}\`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(\`Network response was not ok: \${response.status}\`);
                }
            })
            .then(data => {
                if (data && data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    console.error('No redirect URL found in response');
                    window.location.href = 'https://nknighta.me';
                }
            })
            .catch(error => {
                console.error('Error fetching redirect API:', error);
                window.location.href = 'https://nknighta.me';
            });
    </script>
</body>
</html>`;

// List of IDs to generate pages for
const ids = ['KM4', 'ABC', 'XYZ']; // Add more IDs as needed

// Generate HTML files
const docsDir = path.join(__dirname, 'docs');
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

ids.forEach(id => {
    const filePath = path.join(docsDir, `${id}.html`);
    fs.writeFileSync(filePath, htmlTemplate(id));
    console.log(`Generated: ${filePath}`);
});

console.log('All redirect pages generated successfully!');