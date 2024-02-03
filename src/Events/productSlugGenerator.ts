

export const productSlugGenerator = (name : string) => {
    const slug = name.replace(/\s+/g, '-').toLowerCase();
    return slug
}


