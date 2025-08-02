export type SiteMetaType =
    | "link"
    | "image"
    | "text"
    | "meta"
    | "contact"
    | "headline"
    | "section_blocks";

export type SiteMetaValue =
    | string // for link, image, text
    | {
        title: string;
        description: string;
        keywords: string[];
    } // for meta
    | {
        email: string;
        location: string;
        blog: string;
    } // for contact
    | {
        prefix: string;
        rotating_words: string[];
        suffix: string;
    } // for headline
    | {
        image: string;
        title: string;
        text: string;
    }[]; // for section_blocks

export type SiteMetaItem =
    | { id: string; key: string; type: "link" | "image" | "text"; value: string }
    | {
        id: string;
        key: string;
        type: "meta";
        value: { title: string; description: string; keywords: string[] };
    }
    | {
        id: string;
        key: string;
        type: "contact";
        value: { email: string; location: string; blog: string };
    }
    | {
        id: string;
        key: string;
        type: "headline";
        value: { prefix: string; rotating_words: string[]; suffix: string };
    }
    | {
        id: string;
        key: string;
        type: "section_blocks";
        value: {
            image: string;
            title: string;
            text: string;
        }[];
    };
