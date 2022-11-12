import { startServer, axiosIns } from './testBase';

describe('test server', () => {
  beforeAll((done) => {
    startServer(done);
  });


  afterAll((done) => {
    done();
  });

  it('should send a request to the root of the server', async () => {
    const res = await axiosIns.get(`http://localhost:${process.env.PORT}`);
    expect(res.status).toBe(200);
  });
});
