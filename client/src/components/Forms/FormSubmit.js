//Functions needed for form submissions

/**
 * Sends the given formData to the Listing api.
 * @param {*} formData The formdata object corresponding to a specific listing
 * @returns The response object, used for validation
 */
export async function updateListing(formData, URL) {
    const resp = await fetch(URL, {
        method: "POST",
        headers: {},
        body: formData,
    });
    const json = await resp.json();
    return json;
}

export async function editListing(formData, URL) {
    const resp = await fetch(URL, {
        method: "PATCH",
        headers: {},
        body: formData,
    });
    const json = await resp.json();
    return json;
}
