// Get ID parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
    window.location.href = `/${id}`;
} else {
    window.location.href = '/';
}