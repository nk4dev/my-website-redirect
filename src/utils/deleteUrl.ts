/**
 * Deletes a URL from the database by its id.
 * @param {string} id - The id of the URL to delete
 * @returns {Promise<boolean>} - Returns true if deleted, false otherwise
 */
export async function deleteUrl(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/delete?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Failed to delete URL:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}
