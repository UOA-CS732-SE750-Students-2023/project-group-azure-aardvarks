import * as dotenv from 'dotenv';
import {imgBLOB} from "../../fakeData/img.js";
import * as request from 'supertest'
import chai from 'chai';
import chaiHttp from "chai-http";
import axios from "axios";

chai.use(chaiHttp);
dotenv.config()

const expect = chai.expect;

const fakeUser = {
    username: 'testuser',
    email: 'testemail@example.com',
    password: 'testpassword'
    // "avatar": imgBLOB
}

const url = 'http://127.0.0.1:3000'
const user = await axios.get(url + '/api/user/logIn', {
    headers: {
        'Content-Type': 'application/json', // 设置请求头，指定数据类型为JSON
        'Authorization': 'Basic ' + btoa(`${fakeUser.username}:${fakeUser.password}`)
    }
})

describe('POST /api/user/newUser', function() {
    it('Create user in User table', function(done) {
        chai.request(url)
            .post('/api/user/newUser')
            .send(fakeUser)
            .end(function(err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('code', 200);
                expect(res.body).to.have.property('status', 1);
                expect(res.body.data).to.have.property('_id');
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


describe('GET /api/user/logIn', function (){
    it('success', function (done){
        chai.request(url)
            .get('/api/user/logIn')
            .auth(fakeUser.username, fakeUser.password, {type:"basic"})
            .end(function (err, res){
                if (err){
                    console.log(err)
                    done();
                }
                // expect(res.status).to.equal(200)
                expect(res.body).to.have.property('code', 200);
                expect(res.body).to.have.property('status', 1);
                expect(res.body.data).to.have.property('_id');
                expect(res.body.data).to.have.property('favoritePlayList');
                expect(res.body.data).to.have.property('musicGenre');
                expect(res.body.data).to.have.property('favoriteMusic');
                expect(res.body.data).to.have.property('createdAt');
                expect(res.body.data).to.have.property('updatedAt');
                expect(res.body.data).to.have.deep.property("username", fakeUser.username);
                expect(res.body.data).to.have.deep.property('password', fakeUser.password);
                expect(res.body.data).to.have.deep.property('email', fakeUser.email);
                // console.log(res)
                done();
            })
    })
    it('fail', function (done){
        chai.request(url)
            .get('/api/user/logIn')
            .auth("123", fakeUser.password, {type:"basic"})
            .end(function (err, res){
                if (err){
                    console.log(err);
                    done();
                }
                expect(res.status).to.equal(401);
                done();
            })
    })
})

describe("PUT /api/user/updateUserInfo",async function (){
    const updateInformation = {
        "_id": user.data.data._id,
        "username": fakeUser.username,
        "password": fakeUser.password,
        "email": "testemail@example.com",
        "firstName": "Xuheng",
        "lastName": "Duan",
        "dateOfBirth": "2000-01-30",
        "music_genre": [],
        "favorite_Playlist": [],
        "address":{"number":"3", "street":"Windross Lane", "city":"Auckland", "postcode":1060}
    }

    it('success', function (done) {
        chai.request(url)
            .put('/api/user/updateUserInfo')
            .send(updateInformation)
            .auth(fakeUser.username, fakeUser.password,{type:"basic"})
            .end(function (err, res){
                if (err){
                    console.log(err);
                    done();
                }
                expect(res.status).to.equal(200);
                console.log(res.body)
                expect(res.body).to.have.property('code', 200);
                expect(res.body).to.have.property('status', 1);
                expect(res.body.data).to.have.property('_id');
                expect(res.body.data).to.have.deep.property("username", updateInformation.username);
                expect(res.body.data).to.have.deep.property('password', updateInformation.password);
                expect(res.body.data).to.have.deep.property('email', updateInformation.email);
                expect(res.body.data).to.have.deep.property('firstName', updateInformation.firstName);
                expect(res.body.data).to.have.deep.property('lastName', updateInformation.lastName);
                expect(res.body.data).to.have.property('dateOfBirth',);
                expect(res.body.data).to.have.deep.property('musicGenre');
                expect(res.body.data).to.have.deep.property('favoritePlayList', updateInformation.favorite_Playlist);
                expect(res.body.data).to.have.deep.property('address', updateInformation.address);
                expect(res.body.data).to.have.property('createdAt');
                expect(res.body.data).to.have.property('updatedAt');
                done();
            })
    })
})


describe("GET /api/user/validUsername/:username", function (){
    it('success', function (done){
        chai.request(url)
            .get('/api/user/validUsername/'+'empty')
            .end(function (err, res){
                if (err){
                    console.log(err);
                    done();
                }
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body).to.have.deep.property('data', true);
                done();
            })
    });
    it('fail', function (done){
        chai.request(url)
            .get('/api/user/validUsername/'+ fakeUser.username)
            .end(function (err, res){
                if (err){
                    console.log(err);
                    done();
                }
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body).to.have.deep.property('data', false);
                done();
            })
    });
});

/**
 * Tested, do not change the password again
 */
describe("PUT /api/user/changePassword",  function (){
    it('success',  function (done){
        const newPassword = {
            _id: user.data.data._id,
            oldPassword: user.data.data.password,
            newPassword: "testpassword"
        }

        chai.request(url)
            .put('/api/user/changePassword')
            .send(newPassword)
            .auth(fakeUser.username, newPassword.oldPassword,{type:"basic"})
            .end( function (err, res){
                if (err){
                    console.log(err);
                    done();
                }
                expect(res.status).to.equal(200);
                expect(res.body).to.have.deep.property('code', 200);
                expect(res.body).to.have.deep.property('status', 1);
                expect(res.body.data).to.have.deep.property('_id', newPassword._id);
                expect(res.body.data).to.have.deep.property('username', fakeUser.username);
                expect(res.body.data).to.have.deep.property('password', newPassword.newPassword);
                expect(res.body.data).to.have.deep.property('email', user.data.data.email);
                expect(res.body.data).to.have.deep.property('firstName', user.data.data.firstName);
                expect(res.body.data).to.have.deep.property('lastName', user.data.data.lastName);
                expect(res.body.data).to.have.deep.property('dateOfBirth', user.data.data.dateOfBirth);
                expect(res.body.data).to.have.property('musicGenre');
                expect(res.body.data).to.have.property('favoritePlayList');
                expect(res.body.data).to.have.property('favoriteMusic');
                expect(res.body.data).to.have.property('createdAt');
                expect(res.body.data).to.have.property('updatedAt');
                expect(res.body.data).to.have.property('address');
                done();
            })
    })
})

