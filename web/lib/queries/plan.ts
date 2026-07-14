export const PLANS_QUERY = `
*[_type=="plan" && active == true]
| order(displayOrder asc){
    _id,
    title,
    badge,
    price,
    rating,
    reviewCount,
    duration,
    batchOptions,
    coverImage,
    features[]{
        title,
        included
    }
}
`;