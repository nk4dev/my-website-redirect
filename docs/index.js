<<<<<<< HEAD
// Get a specific query parameter
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get all query parameters as an object
function getAllQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}

// Usage examples:
// const userId = getQueryParam('id');
// const allParams = getAllQueryParams();

const linkId = getQueryParam('id');
if (linkId) {
    // Redirect to the new URL with the linkId as a quer
    fetch(`https://urls.varius.technology/api/redirect?id=${linkId}`)
} else {
    // Redirect to a default page if no linkId is found
    window.location.href = 'https://nknighta.me';
=======
// Get ID parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    window.location.href = `/${id}`;
} else {
    window.location.href = '/';
>>>>>>> neon-db
}