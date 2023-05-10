import * as assert from "assert";
import axios from "axios";
import * as dotenv from 'dotenv';
import {imgBLOB} from "../../fakeData/img.js";
import * as request from 'supertest'
import chai from 'chai';

dotenv.config()


const expect = chai.expect;

const fakeUser = {
    "username" : "dxh00013ff0",
    "password" : "duan002349",
    "email" : "dxh000130@vip.126.com",
    // "avatar": imgBLOB
}
// describe('newUser', function (){
//     describe('POST /newUser', function (){
//         it('register success', function (done){
//             request(process.env.NeteaseCloudMusicApi)
//                 .post(`/api/user/newUser`)
//                 .send(fakeUser)
//                 .expect(200)
//                 .end(function (err, res){
//                     res.body.should.containEql({
//                         message: 'User registered successful'
//                     });
//                     if (err) throw err;
//                     done();
//                 })
//         });
//         it('repeated registration failure.', function (done){
//             request(process.env.NeteaseCloudMusicApi)
//                 .post(`/api/user/newUser`)
//                 .send(fakeUser)
//                 .expect(500)
//                 .end(function (err, res){
//                     res.body.should.containEql({
//                         err: 'REGISTER_FAILURE'
//                     });
//                     if (err) throw err;
//                     done();
//                 })
//         })
//     })
// })



describe('POST /newUser',  function (){
    it('Success',  async function (){
        const fakeUser = {
            username: 'testuser',
            email: 'testemail@example.com',
            password: 'testpassword'
        };
        const temp = await axios.post(`${process.env.NeteaseCloudMusicApi}/api/user/newUser`,fakeUser)
        console.log(temp)
        assert.equal(
            temp,1
        )
    })
})
