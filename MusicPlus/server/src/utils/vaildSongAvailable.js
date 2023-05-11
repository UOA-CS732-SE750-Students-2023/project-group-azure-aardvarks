import * as dotenv from 'dotenv';
dotenv.config()
export default async function vaildSongAvailable(id) {
    try {
        const response = await fetch(process.env.NeteaseCloudMusicApi + '/check/music?id=' + id);
        const data = await response.json();
        console.log(data)
        if (!data.success){
            return "Song ID Error!"
        }
        return data.success
    }catch (e) {
        console.log(e)
    }
}
