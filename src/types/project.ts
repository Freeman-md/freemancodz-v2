export type Project = {
    id: number,
    title: string
    category: string
    description: string
    coverImage: string
    link: string
    github?: string
    featured: boolean
    isPrivate: boolean
    year: number
    tools?: Array<string>
    tags: Array<string>
    longdescription?: string,
    video_url?: string
}