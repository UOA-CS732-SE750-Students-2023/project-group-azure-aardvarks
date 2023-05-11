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

// describe('GET /api/comment/user/:userId', function(){
//     it('success', function(done){
//         chai.request(url)
//             .get(`/api/comment/user/${user.data.data._id}`)
//             .end(function(err, res) {
//                 if (err) {
//                     console.log(err)
//                 }
//                 console.log(res.body)
//                 done();
//             });
//     })
// })
describe('GET /api/comment/user/:userId', function() {
    it('should return all comments for the specified user, sorted by number of likes', function(done) {
        const userId = '123456'; // replace with a valid user ID in the database
        chai.request(app)
            .get(`/api/comment/user/${userId}?pageNum=1&pageSize=20`)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                    done();
                }
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('code', 200);
                expect(res.body).to.have.property('status', 1);
                expect(res.body).to.have.property('data');
                const data = res.body.data;
                expect(data).to.be.an('array');
                let prevLikes = Infinity;
                for (let i = 0; i < data.length; i++) {
                    expect(data[i].userId).to.have.property('_id');
                    expect(data[i].userId).to.have.property('username');
                    expect(data[i]).to.have.property('likes');
                    expect(data[i]).to.have.property('replies');
                    expect(data[i].replies).to.be.an('array');
                    for (let j = 0; j < data[i].replies.length; j++) {
                        expect(data[i].replies[j]).to.have.property('commentId');
                        expect(data[i].replies[j]).to.have.property('likes');
                    }
                    expect(data[i].likes).to.be.at.most(prevLikes);
                    prevLikes = data[i].likes;
                }
                done();
            });
    });
});