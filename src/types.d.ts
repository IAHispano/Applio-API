export interface ModelsEntry {
    id: string;
    name: string;
    owner: string;
    upload: string;
    published: string; 
    tags: string[];
    content: string;
    attachments: {
        name: string;
        url: string;
        proxyUrl: string;
        size: number;
        type: string;
    }[];
    links: {
        Cloud: string;
        Link: string;
    }[];
    context: {
        Name: string;
        Type: string;
        Algorithm: string | null; 
        Epoch: string | null; ull
        Tags: string[];
        Link: string; 
    };
}


export type EasyModelsEntry = Pick<ModelsEntry, 'id' | 'Name' | 'Type' | 'Algorithm' | 'Epoch' | 'Tags' | 'Links' | 'url' | 'owner' | 'upload'>