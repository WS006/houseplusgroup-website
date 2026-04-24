import { getStoryblokApi } from "@storyblok/react/rsc";

export async function getStory(path: string, lang: string = 'en', options: any = {}) {
    const storyblokApi = getStoryblokApi();
    
    try {
        // Ensure the path doesn't start with /
        let cleanPath = path.startsWith('/') ? path.substring(1) : path;
        
        // If it's the home page, use 'home'
        if (cleanPath === '' || cleanPath === lang) {
            cleanPath = 'home';
        }

        console.log(`Fetching story: ${cleanPath} with lang: ${lang}`);

        const { data } = await storyblokApi.getStory(cleanPath, {
            version: "published",
            language: lang,
            ...options
        });

        return data.story;
    } catch (error) {
        console.error(`Error fetching story ${path}:`, error);
        return null;
    }
}

export async function getStories(options: any = {}) {
    const storyblokApi = getStoryblokApi();
    
    try {
        const { data } = await storyblokApi.getStories({
            version: "published",
            ...options
        });

        return data.stories;
    } catch (error) {
        console.error("Error fetching stories:", error);
        return [];
    }
}
