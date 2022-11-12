import { startServer, axiosIns } from './testBase';

const port = process.env.PORT || 3000

describe('test server', () => {
  beforeAll((done) => {
    startServer(done);
  });


  afterAll((done) => {
    done();
  });

  it('should send a request to the root of the server', async () => {
    const res = await axiosIns.get(`http://localhost:${port}`);
    expect(res.status).toBe(200);
  });
});
