import { Hono } from 'hono'
import { getEntriesEasyPaged } from '../services/usersService'

const max_page_size = 20; 

const users = new Hono()

users.get('/', async (c) => {
    try {
        const page = Number(c.req.header('page'))
        let pageSize = Number(c.req.header('perPage'))

        if (pageSize > max_page_size) {
            return c.text(`Page size cannot exceed, the max page size is ${max_page_size}.`, 400);
        }

        if (page && pageSize) {
        const data = await getEntriesEasyPaged(page, pageSize);
        return c.json(data);
        } else {
        return c.text('You need to add the header perPage and page to get the data. More information at https://applio.org/api/docs', 400)
        }

    } catch (error) {
        console.error("Error obtaining data:", error);
        return c.text('Error obtaining data', 500);
    }
})

export default users