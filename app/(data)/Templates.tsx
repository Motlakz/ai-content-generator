export const templates = [
    {
        name: "Blog Title",
        desc: "An AI tool to generate blog titles depending on user information",
        category: "Blog",
        icon: "https://i.imgur.com/rVHNHwA.png",
        aiPrompt: "Give me 5 blog topic ideas in the form of bullet points specific to the given niche topic and outline. Provide the result in Rich Text Format",
        slug: "generate-blog-title",
        form: [
            {
                label: "Enter your blog niche",
                field: "input",
                name:"niche",
                required: true,
            },
            {
                label: "Enter blog outline",
                field: "textarea",
                name: "outline",
                required: true,
            }
        ],
    }
]