import { Hono } from 'hono'
import { getEntriesEasyPaged } from '../services/usersService'

const max_page_size = 20; 

const users = new Hono()

users.get('/', async (c) => {
    try {
        const page = Number(c.req.header('page')) || 1
        let pageSize = Number(c.req.header('perPage')) || 1

        if (pageSize > max_page_size) {
            return c.text(`Page size cannot exceed, the max page size is ${max_page_size}.`, 400);
        }

        const data = await getEntriesEasyPaged(page, pageSize);
        
        return c.json(data);
    } catch (error) {
        console.error("Error obtaining data:", error);
        return c.text('Error obtaining data', 500);
    }
})

export default users