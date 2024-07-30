

// filters all the nully values (null, empty string, etc)

import { compareDesc, parseISO } from "date-fns"

// and joins them by space
export const cx = (...classNames) => classNames.filter(Boolean).join(" ")

export const sortBlogs = (blogs) => {
    return blogs
        .slice()
        .sort((a,b) =>
             compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
        );
};