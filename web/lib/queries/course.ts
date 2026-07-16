export const COURSES_QUERY = `
*[_type=="course"] | order(title asc){

_id,

title,

slug,

category,

shortDescription,

rating,

students,

modules,

duration,

price,

"instructorImage": instructorImage.asset->url,

instructorName,

"thumbnail": thumbnail.asset->url,

"heroImage": heroImage.asset->url

}
`;

export const COURSE_BY_SLUG_QUERY = `
*[_type=="course" && slug.current==$slug][0]{

_id,

title,

slug,

category,

shortDescription,

rating,

students,

modules,

duration,

price,

"instructorImage": instructorImage.asset->url,

instructorName,

"thumbnail": thumbnail.asset->url,

"heroImage": heroImage.asset->url,

about,

whatYouWillLearn,

prerequisites,

whoIsThisCourseFor,

plans[]->{

_id,

title,

price,

badge,

features

}

}
`;