// 导入数据文件
const post_content=require('../../../data/posts_data')
const app=getApp();
Page({
    data:{
        isplayingMusic:false
    },


    onLoad:function(option){
        // 接收穿过来的参数id
        let postId = option.id;
        this.data.currentPostId=postId;
        // 赋数据
       this.setData({
        postData:post_content.postList[postId]
       });

    //  获取缓存中的收藏情况
    let postsCollected=wx.getStorageSync('posts_collected')
    if(postsCollected){
        let postCollected=postsCollected[postId];
        this.setData({
            collected:postCollected
        })
    }else{
        let postsCollected={};
        postsCollected[postId]=false;
        wx.setStorageSync('posts_collected',postsCollected )
    }

    if(app.globalData.g_isPlayingMusic  &&  app.globalData.g_currentMusicPostId===postId){
        this.setData({
            isplayingMusic:true
        })
    }
    this.setMusicMonitor()
    },


    setMusicMonitor:function(){
        let _this=this;
            // 检测音乐播放事件
        wx.onBackgroundAudioPlay(function(){
            _this.setData({
                isplayingMusic:true
            })
            // 音乐播放状态
            app.globalData.g_isPlayingMusic=true;
            // 当前哪一个音乐播放
            app.globalData.g_currentMusicPostId=_this.data.currentPostId;
        }) 
        // 检测音乐停止事件
        wx.onBackgroundAudioPause(function(){
            _this.setData({
                isplayingMusic:false
            })
            app.globalData.g_isPlayingMusic=false;
            app.globalData.g_currentMusicPostId=null;
        })
    },


    onColletionTap:function(event){
        let postsCollected=wx.getStorageSync('posts_collected');
        let postCollected=postsCollected[this.data.currentPostId];
        // 收藏变成未收藏
        postCollected=!postCollected;
        postsCollected[this.data.currentPostId]=postCollected;
        this.showToast(postsCollected,postCollected)
    },


    showToast:function(postsCollected,postCollected){
        // 更新文章是否收藏的缓存值
        wx.setStorageSync('posts_collected', postsCollected)
        // 更新数据绑定变量，从而切换图片
        this.setData({
            collected:postCollected
        })
         // 收藏成功的提示
        wx.showToast({
            title:postCollected?"收藏成功":"取消成功",
            duration:1000,
            icon:"success"
        })
    },


    showModal:function(postsCollected,postCollected){
        let _this=this;
        // 是否收藏的询问
        wx.showModal({
            title:"收藏",
            content:postCollected?"收藏该文章？":"取消收藏改文章",
            showCancel:"true",
            cancelText:"取消",
            cancelColor:"#333",
            confirmText:"确认",
            confirmColor:"405f80",
            success:function(res){
                if(res.confirm){
                         // 更新文章是否收藏的缓存值
                        wx.setStorageSync('posts_collected', postsCollected)
                        // 更新数据绑定变量，从而切换图片
                        _this.setData({
                            collected:postCollected
                        })
                }
            }
        })
    },


    onShareTap:function(event){
        let itemList=[
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        // 显示分享的操作菜单
        wx.showActionSheet({
            itemList:itemList,
            itemColor:"#405f80",
            success:function(res){
                //  res.cancel  用户是不是点击了取消按钮
                //  res.tapIndex 用户点击的是数组中的哪一个
                wx.showModal({
                    title:"用户"+itemList[res.tapIndex],
                    content:"微信好像现在还不支持该功能"
                })
            }
        })
    },


    onMusicTap:function(event){
        let currentPostId=this.data.currentPostId;
        let postData=post_content.postList[currentPostId].music;
        // 定义一个变量控制音乐的开始暂停
        let isplayingMusic=this.data.isplayingMusic;
        // 如果是播放的话暂停播放音乐
        if(isplayingMusic){
            wx.pauseBackgroundAudio();
            this.setData({
                isplayingMusic:false
            })
        }
        // 否则的话开始播放音乐
        else{
        wx.playBackgroundAudio({
            dataUrl:postData.url,
            title:postData.title,
            coverImgUrl:postData.coverImgUrl
            })
            this.setData({
                isplayingMusic:true
            })
        }
    }
})