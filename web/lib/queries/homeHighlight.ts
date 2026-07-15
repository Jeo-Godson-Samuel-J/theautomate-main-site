import { groq } from "next-sanity";

export const HOME_HIGHLIGHT_QUERY = groq`

*[_type == "homeHighlight"][0]{

    leftImage,

    rightImage,

    statisticNumber,

    statisticHeading,

    studentAvatars,

    quote,

    quoteAuthor,

    quoteSubtitle

}

`;