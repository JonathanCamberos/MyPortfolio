import { compareDesc, parseISO } from "date-fns"

// filters all the nully values (null, empty string, etc)
// joins all the className attributes .
export const cx = (...classNames) => classNames.filter(Boolean).join(" ")


// sorts all the blogs by published date, leaving most recent at [0]
export const sortBlogs = (blogs) => {
    return blogs
        .slice()
        .sort((a,b) =>
             compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
        );
};