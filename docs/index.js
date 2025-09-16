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
    // Redirect to the new URL with the linkId as a query parameter
    fetch(`https://urls.varius.technology/api/redirect?id=${linkId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
        })
        .then(data => {
            // Handle the data from the redirect API
            console.log('Redirect data:', data);
            if (data && data.redirect) {
                window.location.href = data.redirect;
            } else {
                console.error('No redirect URL found in response');
                window.location.href = 'https://nknighta.me';
            }
        })
        .catch(error => {
            console.error('Error fetching redirect API:', error);
            // Fallback to default page on error
            window.location.href = 'https://nknighta.me';
        });
} else {
    // Redirect to a default page if no linkId is found
    window.location.href = 'https://nknighta.me';
}