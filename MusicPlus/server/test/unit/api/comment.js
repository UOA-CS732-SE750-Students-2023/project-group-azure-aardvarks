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

describe('GET /api/comment/user/:userId', function(){
    it('success', function(done){
        chai.request(url)
            .get(`/api/comment/user/${user.data.data._id}`)
            .end(function(err, res) {
                if (err) {
                    console.log(err)
                }
                console.log(res.body)
                done();
            });
    })
})