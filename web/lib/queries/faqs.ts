import { groq } from "next-sanity";

export const FAQS_QUERY = groq`
*[_type=="faq" && category==$category]
| order(order asc)
{
    _id,
    question,
    answer,
    category
}
`;