import mongoose from 'mongoose';
import fs from 'fs'
import open from 'open'
import axios from "axios";
import * as dotenv from 'dotenv';


const Schema = mongoose.Schema;

const CookieSchema = new mongoose.Schema({
    key: String,
    cookie: String,
});
function saveImg(data) {
    let base64Data = data.replace(/^data:image\/\w+;base64,/, "");

// 将 base64 数据解码
    let dataBuffer = Buffer.from(base64Data, 'base64');

// 写入到文件
    fs.writeFile('image.png', dataBuffer, function(err) {
        if(err){
            console.error(err);
        }else{
            console.log("写入成功！");
            // 文件写入成功后打开
            open('image.png');
        }
    });
}

export const CookieModel = mongoose.model('Cookie', CookieSchema);

async function checkStatus(key) {
    const res = await axios({
        url: process.env.NeteaseCloudMusicApi+`/login/qr/check?key=${key}&timestamp=${Date.now()}`,
    })
    return res.data
}

async function getLoginStatus(key) {
    const cookieData = await CookieModel.findOne({ key: key });
    const res = await axios({
        url: process.env.NeteaseCloudMusicApi+`/login/status?timestamp=${Date.now()}`,
        method: 'post',
        data: {
            cookie: cookieData ? cookieData.cookie : '',
        },
    })
    return res.data
}
async function logout(key) {
    const cookieData = await CookieModel.findOne({ key: key });
    const res = await axios({
        url: process.env.NeteaseCloudMusicApi+`/logout?timestamp=${Date.now()}`,
        method: 'post',
        data: {
            cookie: cookieData ? cookieData.cookie : '',
        },
    })
    return res.data
}
export async function login() {
    let timer;
    let timeoutId;
    const cache = "cache"
    const cookieData = await CookieModel.findOne({ key: cache });
    // console.log(cookieData)
    if (!cookieData){
        const newCookie = new CookieModel({
            key: cache,
            cookie: ''
        });
        await newCookie.save()
    }
    let loginStatus = await getLoginStatus(cache);
    if (loginStatus.data.account.status === -10){
        const res = await axios({
            url: process.env.NeteaseCloudMusicApi+`/login/qr/key?timestamp=${Date.now()}`,
        })
        const key = res.data.data.unikey
        const res2 = await axios({
            url: process.env.NeteaseCloudMusicApi+`/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
        })
        saveImg(res2.data.data.qrimg)
        timeoutId = setTimeout(() => {
            console.log('五分钟内未登录，取消循环');
            clearInterval(timer);
        }, 5 * 60 * 1000);
        timer = setInterval(async () => {
            const statusRes = await checkStatus(key)
            if (statusRes.code === 800) {
                console.log('二维码已过期,请重新获取')
                clearInterval(timer)
            }
            if (statusRes.code === 803) {
                clearTimeout(timeoutId);
                clearInterval(timer)
                console.log('授权登录成功')
                await CookieModel.findOneAndUpdate(
                    { key: cache }, // 匹配条件
                    { cookie: statusRes.cookie }, // 更新的字段和值
                    { new: true } // 选项：返回更新后的文档
                )
                loginStatus = await getLoginStatus(cache)
                console.log("登陆状态有效， 用户名：" + loginStatus.data.profile.nickname)
                return statusRes.cookie
                // Update the cookie in the database

            }
        }, 3000)

    }
    else {
        console.log("登陆状态有效， 用户名：" + loginStatus.data.profile.nickname)
        return cookieData
    }

}
login()


/**
 * Generate the schema for your data.
 * See: https://mongoosejs.com/docs/guide.html
 *
 * Note how we haven't defined an "id" property - these are automatically created for us (_id).
 */

/**
 * This schema represents Users in the database.
 */
const userSchema = new Schema({

    username: { type: String, unique: true, required: true }, // Each user must have a unique username
    password: String,
    email: String,
    firstName: String,  // Basic fields
    lastName: String,
    avatar: String,
    dateOfBirth: Date,
    favoriteMusic : {type: Schema.Types.ObjectId, ref: 'playList', required: true},
    musicGenre : [{type1: String, count: Number}],
    favoritePlayList : [{type: Schema.Types.ObjectId, ref: 'playList', required: true}],
    address: { // address is a nested document
        number: String,
        street: String,
        city: String,
        postcode: Number
    },



}, { /* This second object allows us to specify more config info. In this case, we're enabling automatic timetamps using the default options.
        For more options, see the URL above. */
    timestamps: {}
});

// Allows us to add an extra "virtual property" to the schema. This value won't actually be stored in the DB, but can be used like
// a normal property, e.g. console.log(myUser.fullName); or myUser.fullName = 'Bob Marley';
userSchema.virtual('fullName')
    .get(function () { return `${this.firstName} ${this.lastName}`; })
    .set(function (value) {
        this.firstName = value.substr(0, value.indexOf(' '));
        this.lastName = value.substr(value.indexOf(' ') + 1);
    });

// Actually create the User schema
export const User = mongoose.model('User', userSchema);

/**
 * This schema represents Pets in the database.
 */
const playListSchema = new Schema({
    name: { type: String, required: true },
    private : Boolean,
    cover: String,
    songs : [{type:String}],
    description: {  type: String, default:"Oops, the user does not update yet" },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: {}
});

// Actually create the Pet schema
export const playList = mongoose.model('playList', playListSchema);


