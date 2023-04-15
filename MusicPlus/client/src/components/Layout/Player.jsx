import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import b from '../../static/b.mp3'

const audioLists = [
    {
        name: "Despacito",
        singer: "Luis Fonsi",
        cover:
            "http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg",
        musicSrc:
            "http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3"
    },
    {
        name: "素颜",
        singer: "许嵩",
        cover:
            "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
        musicSrc: b
    },
    {
        name: "我记得",
        singer: "赵雷",
        cover:
            "https://res.cloudinary.com/ehsanahmadi/image/upload/v1573758778/Sirvan-Khosravi-Dorost-Nemisham_glicks.jpg",
        musicSrc: "http://m801.music.126.net/20230412093403/1f1eb88c07b5af5a093e06a6cd7da073/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/17718433824/acca/41eb/8112/efa4dce840121844afcb957bcb2d4fd1.mp3",
        lyric: "[00:00.000] 作词 : 赵雷\n[00:01.000] 作曲 : 赵雷\n[00:02.000] 编曲 : 赵雷\n[00:03.000] 制作人 : 赵雷\n[00:28.15]我带着比身体重的行李 游入尼罗河底  经过几道闪电  看到一堆光圈 不确定是不是这里\n[00:41.78]我看到几个人站在一起 他们拿着剪刀摘走我的行李 擦拭我的脑袋 没有机会返回去\n[00:54.05]\n[00:55.87]直到我听见一个声音 我确定是你\n[01:04.13]可你怎记得我\n[01:09.20]我带来了另界的消息 可我怎么告知你\n[01:17.94]注定失忆着相遇\n[01:22.15]\n[01:23.39]我记得这里是片树林 后面有个山坡 山坡上的枣树每当秋天到来 我们把枣装满口袋\n[01:37.27]我记得除了朋友我还 做过你的叔父 你总喜欢跟在我的屁股后面 只是为了那几个铜钱\n[01:50.96]我记得我们曾是恋人 后来战争爆发 你上战场后就再也没有回来 直到收不到你的信\n[02:04.54]我们总这样重复分离 却要重新开始 相互送别对方 说着来世再见 再次失忆着相聚\n[02:16.84]\n[02:18.54]呜 呜 呜 呜…\n[02:23.35]快来抱抱 快来抱抱我\n[02:31.68]呜 呜 呜 呜…\n[02:34.03]快来抱抱 快来抱抱我\n[02:41.30]\n[03:13.15]在路上我遇到了一位故去多年的人 她是如此年轻 扎着过肩马尾 露出和你一样的笑\n[03:26.78]她和我讲了很多关于你成长的故事 在星空另一端 思念从未停止 如同墓碑上的名字\n[03:39.23]\n[03:40.58]不要哭我最亲爱的人 我最好的玩伴 时空是个圆圈 直行或是转弯 我们最终都会相见\n[03:54.13]在城池的某个拐角处 在夕阳西下时 在万家灯火的某一扇窗纱里 人们失忆着相聚\n[04:06.47]\n[04:08.47]呜 快来抱抱 快来抱抱我\n[04:21.62]呜 快来抱抱 快来抱抱我 我终于找到你\n[05:03.42]呜 快来抱抱 快来抱抱我 我终于找到你\n[05:16.10]\n[05:18.08]\n[05:18.800] 电吉他 : 刘磊/谢星\n[05:19.592] 贝斯 : Damien Banzigou\n[05:20.384] 鼓 : Chris Trzcinski\n[05:21.176] 钢琴 : 姜伯虎\n[05:21.968] 打击乐 : 刘恒/Chris Trzcinski\n[05:22.760] 管风琴 : 赵雷\n[05:23.552] 口琴 : 赵雷\n[05:24.344] 和声 : 朱莉/旭东\n[05:25.136] 录音师 : 张俊\n[05:25.928] 混音师 : 时俊峰\n[05:26.720] 录音室 : 摩登天空/55TEC\n[05:27.512] 录音助理 : 陈彬彬/朱莉\n[05:28.304] 母带工作室 : Sterling Sound\n[05:29.096] 母带工程师 : Randy Merrill\n[05:29.888] 封面设计 : 韩东/小强/阿穆隆\n"
    }
];


function Player(){
    return (
        <div className="App">
            <ReactJkMusicPlayer
                glassBg
                audioLists={audioLists}
                showMediaSession
                autoPlay={false}
                theme="auto"
                showLyric={true}
                showDownload={false}
                mode="full"
            />
        </div>
    );
}

export default Player;