import { queryMapper } from "../../src/middleware/query";

const req = {
    query: {
        filter: {
            name: 'test',
            is_verified: 'true',
            last_name: '/test/',
        },
        sort: {
            name: 1,
            email: -1
        }
    }
}

const result = {
    query: {
        filter: {
            name: 'test',
            is_verified: true,
            last_name: /test/,
        },
        sort: {
            name: 1,
            email: -1
        }
    }
}

describe('test query mapper middleware', () => {
    it('should map filters successfully', async () => {
        const next = jest.fn();
        queryMapper(req, {}, next);
        expect(req).toStrictEqual(result);
        expect(next).toHaveBeenCalled();
    });
});
