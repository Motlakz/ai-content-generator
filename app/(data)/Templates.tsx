export const templates = [
    {
        name: "Blog Title",
        desc: "Generate engaging blog titles tailored to your niche and outline.",
        category: "Blog",
        icon: "https://i.imgur.com/bfolUYw.png",
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
    },
    {
        name: 'Blog Content',
        desc: 'Create comprehensive blog content based on your topic and outline.',
        category: 'blog',
        icon: 'https://i.imgur.com/rVHNHwA.png',
        slug: 'blog-content-generation',
        aiPrompt: 'Generate Blog Content based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Enter blog Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'Discover fresh and trending blog topic ideas for your specific niche.',
        category: 'Blog',
        icon: 'https://i.imgur.com/8hlNwba.png',
        slug: 'blog-topic-idea',
        aiPrompt: 'Generate top 5 Blog Topic Ideas in bullet point only, (no Description) based on niche in rich text editor format',
        form: [
            {
                label: 'Enter your Niche',
                field: 'input',
                name: 'niche',
                required: true
            },
        ]
    },
    {
        name: 'Youtube SEO Title',
        desc: 'Craft SEO-optimized, high-ranking titles for your YouTube videos.',
        category: 'Youtube Tools',
        icon: 'https://i.imgur.com/vtklMVZ.png',
        slug: 'youtube-seo-title',
        aiPrompt: 'Give me 5 best SEO-optimized, high-ranking title ideas in bullet points based on keywords and outline. Provide the result in HTML tags format.',
        form: [
            {
                label: 'Enter your YouTube video topic keywords',
                field: 'input',
                name: 'keywords',
                required: true
            },
            {
                label: 'Enter YouTube description outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Youtube Description',
        desc: 'Generate concise, emoji-enhanced YouTube descriptions tailored to your content.',
        category: 'Youtube Tool',
        icon: 'https://i.imgur.com/nwECya2.png',
        slug: 'youtube-description',
        aiPrompt: 'Generate Youtube description with emoji under 4-5 lines based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic/title',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Enter youtube Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Youtube Tags',
        desc: 'Create relevant and catchy tags to improve your YouTube video\'s discoverability.',
        category: 'Youtube Tool',
        icon: 'https://i.imgur.com/zEDtWdn.png',
        slug: 'youtube-tag',

        aiPrompt: 'Generate 10 Youtube tags in bullet point based on title and outline in rich text editor format',

        form: [
            {
                label: 'Enter your youtube title',
                field: 'input',
                name: 'title',
                required: true
            },
            {
                label: 'Enter youtube video Outline here (Optional)',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Rewrite Articles (Plagiarism Free)',
        desc: 'Rewrite articles to bypass AI detectors and ensure originality.',
        icon: 'https://i.imgur.com/8O7eYH2.png',
        category: 'Rewriting Tool',
        slug: 'rewrite-article',
        aiPrompt: 'Rewrite give article without any Plagiarism in rich text editor format',
        form: [
            {
                label: '🤖 Provide your Article/Blogpost or any other content to rewrite.',
                field: 'textarea',
                name: 'article',
                required: true
            }
        ]
    },
    {
        name: 'Text Improver',
        desc: 'Refine your writing by eliminating errors and enhancing readability.',
        icon: 'https://i.imgur.com/Fa7ko8a.png',
        category: 'Writing Assistant',
        slug: 'text-improver',
        aiPrompt: 'Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format',
        form: [
            {
                label: 'Enter text that you want to re-write or improve',
                field: 'textarea',
                name: 'textToImprove'
            }
        ]
    },
    {
        name: 'Add Emojis to Text',
        desc: 'Enhance your text with relevant emojis to increase engagement and expressiveness.',
        icon: 'https://i.imgur.com/Pq883O9.png',
        category: 'blog',
        slug: 'add-emoji-to-text',
        aiPrompt: 'Add Emoji to outline text depends on outline and rewrite it in rich text editor format',
        form: [
            {
                label: 'Enter your text to add emojis',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'Instagram Post Generator',
        desc: 'Create engaging Instagram posts based on your provided keywords.',
        icon: 'https://i.imgur.com/0dzQYHT.png',
        category: 'blog',
       
        slug: 'instagram-post-generator',
        aiPrompt: 'Generate 3 Instagram post depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your post',
                field: 'input',
                name: 'keywords',
                required: true
            },
           
        ]
    },
    {
        name: 'Instagram Hash Tag Generator',
        desc: 'Generate relevant and popular hashtags to boost your Instagram post\'s reach.',
        icon: 'https://i.imgur.com/8qWFCvp.png',
        category: 'blog',
       
        slug: 'instagram-hash-tag-generator',
        aiPrompt: 'Generate 15 Instagram hash tag depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your instagram hastag',
                field: 'input',
                name: 'keywords',
                required: true
            },
           
        ]
    },
    {
        name: 'Instagram Post/Reel Idea',
        desc: 'Get creative and trending Instagram post or reel ideas for your niche.',
        icon: 'https://i.imgur.com/4C5sCbM.png',
        category: 'instagram',
       
        slug: 'instagram-post-idea-generator',
        aiPrompt: 'Generate 5-10 Instagram idea depends on niche with latest trend and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords / Niche for your instagram idea',
                field: 'input',
                name: 'keywords',
                required: true
            },
           
        ]
    },
    {
        name: 'English Grammar Check',
        desc: 'Improve your writing by correcting grammar and enhancing sentence structure.',
        icon:'https://i.imgur.com/VQp3hyg.png',
        category: 'English',
       
        slug: 'english-grammar-checker',
        aiPrompt: 'Rewrite the inputText by correcting the grammar and provide output in rich text editor format',
        form: [
            {
                label: 'Enter text to correct the grammar',
                field: 'input',
                name: 'inputText',
                required: true
            },
           
        ]
    },
    {
        name: 'Write Code',
        desc: 'Generate code snippets in various programming languages based on your description.',
        icon:'https://i.imgur.com/xZh8dKI.png',
        category: 'Coding',
       
        slug: 'write-code',
        aiPrompt: 'Based on the user\'s codeDescription, write code and provide output in rich text editor format within a code block',
        form: [
            {
                label: 'Enter description of code you want along with Programming Language',
                field: 'textarea',
                name: 'codeDescription',
                required: true
            },
           
        ]
    },
    {
        name: 'Explain Code',
        desc: 'Get line-by-line explanations of code snippets to enhance understanding.',
        icon:'https://i.imgur.com/9ZRfWMS.png',
        category: 'Coding',
       
        slug: 'explain-code',
        aiPrompt: 'Based on the user\'s codeDescription, explain the code line by line and provide output in rich text editor format within a code block',
        form: [
            {
                label: 'Enter code which you want to understand',
                field: 'textarea',
                name: 'codeDescription',
                required: true
            },
           
        ]
    },
    {
        name: 'Code Bug Detector',
        desc: 'Identify and fix bugs in your code with detailed solutions and alternatives.',
        icon:'https://i.imgur.com/WtYo5CE.png',
        category: 'code-bug-detector',
       
        slug: 'code-bug-detector',
        aiPrompt: 'Depends on user codeInput find bug in code and give solution and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter code which you want to test bug',
                field: 'textarea',
                name: 'codeInput',
                required: true
            },
           
        ]
    },
    {
        name: 'Tagline Generator',
        desc: 'Create catchy and memorable taglines for your brand or product.',
        icon:'https://i.imgur.com/ppsW36w.png',
        category: 'Marketing',
       
        slug: 'tagline-generator',
        aiPrompt: 'Based on the user\'s productName and outline, generate 5-10 catchy taglines for the business product and provide output in rich text editor format',
        form: [
            {
                label: 'Product/Brand Name',
                field: 'input',
                name: 'productName',
                required: true
            },
            {
                label: 'What are you selling / marketing?',
                field: 'textarea',
                name: 'outline',
                required: true
            },
           
        ]
    },
    {
        name: 'Product Description',
        desc: 'Generate SEO-friendly, compelling product descriptions for e-commerce.',
        icon:'https://i.imgur.com/m2P3837.png',
        category: 'Marketing',
       
        slug: 'product-description',
        aiPrompt: 'Based on the user\'s productName and description, generate a small description for the product for e-commerce business and provide output in rich text editor format',
        form: [
            {
                label: 'Product Name',
                field: 'input',
                name: 'productName',
                required: true
            },
            {
                label: 'Product Details',
                field: 'textarea',
                name: 'outline',
                required: true
            },
           
        ]
    },
]
