import { createContext } from 'react'

/* Lets a CMS blog post tell BlogLayout who it is credited to, so the author box matches the CMS. */
export const BlogAuthorContext = createContext(null)
