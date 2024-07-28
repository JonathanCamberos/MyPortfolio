

// filters all the nully values (null, empty string, etc)
// and joins them by space
export const cx = (...classNames) => classNames.filter(Boolean).join(" ")