import axios from "axios";
import * as dotenv from 'dotenv';
import {imgBLOB} from "../../fakeData/img.js";
import * as request from 'supertest'
import chai from 'chai';
import chaiHttp from "chai-http";
chai.use(chaiHttp);
dotenv.config()

const expect = chai.expect;

const fakeUser = {
    username: 'testuser',
    email: 'testemail@example.com',
    password: 'testpassword'
    // "avatar": imgBLOB
}


describe('POST /api/user/newUser', function() {
    it('Create user in User table', function(done) {
        chai.request('http://127.0.0.1:3000')
            .post('/api/user/newUser')
            .send(fakeUser)
            .end(function(err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('code', 200);
                expect(res.body).to.have.property('status', 1);
                expect(res.body.data).to.have.deep.property('username', 'testuser');
                expect(res.body.data).to.have.deep.property('email', 'testemail@example.com');
                expect(res.body.data).to.have.property('password');
                expect(res.body.data).to.have.property('favoritePlayList');
                expect(res.body.data).to.have.property('musicGenre');
                expect(res.body.data).to.have.property('favoriteMusic');
                expect(res.body.data).to.have.property('createdAt');
                expect(res.body.data).to.have.property('updatedAt');
                done();
            });
    });
    it('Exist user in User Table', function(done) {
        chai.request('http://127.0.0.1:3000')
            .post('/api/user/newUser')
            .send(fakeUser)
            .end(function(err, res) {
                expect(res.body).to.have.property('code', 200);
                expect(res.body).to.have.property('status', 1);
                expect(res.body.data).to.have.deep.property('Error', 'Username unavailable!');
                done();
            });
    });
});


// describe('GET /api/user/logIn')