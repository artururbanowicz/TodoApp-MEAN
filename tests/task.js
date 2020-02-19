let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
describe('Tasks', () => {
    /*
     * Test the /GET route
     */
    describe('/GET tasks', () => {
        it('it should GET all the tasks', (done) => {
            chai.request('http://localhost:3000')
                .get('/tasks/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    /*
   * Test the /POST route
   */
    describe('/POST task', () => {
        it('it should POST a task with name field', (done) => {
            let task = {
                name: "Kappa 123"
            };
            chai.request('http://localhost:3000')
                .post('/tasks/task')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Dodano zadanie');
                    done();
                });
        });
    });
    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id task', () => {
        it('it should UPDATE a task given the id', (done) => {
            chai.request('http://localhost:3000')
                .put('/tasks/task/3')
                .send({name: "Test put updated"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Zaktualizowano zadanie');
                    done();
                });
        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id task', () => {
        it('it should DELETE a task given the id', (done) => {
            chai.request('http://localhost:3000')
                .delete('/tasks/task/7')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Usunięto zadanie");
                    done();
                });
            });
        });
});