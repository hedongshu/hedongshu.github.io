// let idData = [
//     {
//         name: '情感生活',
//         id: '39104',
//         list: [
//             {
//                 name: '情感治愈',
//                 id: '39105'
//             },
//             {
//                 name: '晚安心语',
//                 id: '109'
//             },
//             {
//                 name: '美文故事',
//                 id: '39106'
//             },
//             {
//                 name: '恋爱宝典',
//                 id: '38983'
//             },
//             {
//                 name: '两性夜话',
//                 id: '107'
//             },
//             {
//                 name: '旅行人文',
//                 id: '108'
//             }
//         ]
//     }
// ]

/**
 * 点击h4, 切换隐藏和显示list
 */
function toggleList() {
    let h4 = document.querySelectorAll('#list>h4')
    for (let i = 0; i < h4.length; i++) {
        let item = h4[i]
        item.addEventListener('click', (e) => {
            item.nextElementSibling.classList.toggle('hide')
        })
    }
}
toggleList()

/**
 * Ajax
 * @param {*} type 类型
 * @param {*} url  地址
 * @param {*} data 数据
 * @param {*} success 成功回调
 * @param {*} failed 失败回调
 */
function Ajax(type, url, data, success, failed) {
    // 创建ajax对象
    var xhr = null
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    var type = type.toUpperCase()
    // 用于清除缓存
    var random = Math.random()

    if (typeof data == 'object') {
        var str = ''
        for (var key in data) {
            str += key + '=' + data[key] + '&'
        }
        data = str.replace(/&$/, '')
    }

    if (type == 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true)
        } else {
            xhr.open('GET', url + '?t=' + random, true)
        }
        xhr.send()
    } else if (type == 'POST') {
        xhr.open('POST', url, true)
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader(
            'Content-type',
            'application/x-www-form-urlencoded'
        )
        xhr.send(data)
    }

    // 处理返回数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success(xhr.responseText)
            } else {
                if (failed) {
                    failed(xhr.status)
                }
            }
        }
    }
}

/**
 * 获取专辑列表
 * @param {*} id
 * @param {*} page 页码
 */
function getAlbumListByCategory(id, page) {
    Ajax(
        //Ajax(type, url, data, success, failed)
        'get',
        'https://api.imjad.cn/qqfm/v1/',
        'type=album&page_size=20&id=' + id + '&page=' + page,
        function(data) {
            data = JSON.parse(data)
            console.log(data)
            var arr = data.data.albumInfoList
            var id, list
            var page = document.getElementsByName('page')[0].value
            document.getElementById('AlbumList').innerHTML = ''
            console.log(page)
            for (var i = 0; i < arr.length; i++) {
                id = arr[i].album.albumID
                list = document.createElement('li')
                list.id = id
                list.onclick = function() {
                    document.getElementsByName('albumID')[0].value = this.id
                    for (var i = 0; i < AlbumList.length; i++) {
                        AlbumList[i].classList.remove('focus')
                    }
                    this.classList.add('focus')
                    getSkipShow(this.id, 0)
                }
                list.innerText =
                    'ID:' +
                    paddingRight(arr[i].album.albumID, 20) +
                    'Name:' +
                    arr[i].album.name
                document.getElementById('AlbumList').appendChild(list)
            }

            AlbumList = document
                .getElementById('AlbumList')
                .getElementsByTagName('li')
            for (var i = 0; i < AlbumList.length; i++) {
                if (
                    AlbumList[i].id ==
                    document.getElementsByName('albumID')[0].value
                ) {
                    AlbumList[i].classList.add('focus')
                }
            }

            document.getElementById('prevPage').onclick = function() {
                if (page > 1) {
                    page--
                    document.getElementsByName('page')[0].value = page
                    document
                        .getElementsByName('getAlbumListByCategory')[0]
                        .click()
                }
            }
            document.getElementById('nextPage').onclick = function() {
                page++
                document.getElementsByName('page')[0].value = page
                document.getElementsByName('getAlbumListByCategory')[0].click()
            }
        },
        function(error) {
            var spans = document
                .getElementsByClassName('update')[0]
                .getElementsByTagName('span')
            for (var i = 0; i < spans.length; i++) {
                spans[i].innerHTML = '读取失败'
            }
        }
    )
}

/**
 * 获取节目列表
 * @param {*} albumID
 * @param {*} index
 */
function getSkipShow(albumID, index) {
    Ajax(
        //Ajax(type, url, data, success, failed)
        'get',
        'https://api.imjad.cn/qqfm/v1/',
        'type=show&id=' + albumID,
        function(data) {
            data = JSON.parse(data)
            arr_shows = chunk(data, 10)[index]

            var shows = ''
            for (var i = 0; i < arr_shows.length; i++) {
                shows = shows + arr_shows[i] + ','
            }
            document.getElementsByName('shows').value = shows
            var _get = 'type=skip_show&id=' + albumID + '&shows=' + shows
            Ajax(
                //Ajax(type, url, data, success, failed)
                'get',
                'https://api.imjad.cn/qqfm/v1/',
                _get,
                function(data) {
                    var url, id, name
                    data = JSON.parse(data)
                    var audio = document.getElementById('audio')
                    document.getElementById('Shows').innerHTML = ''

                    var showList = []
                    for (var i = 0; i < arr_shows.length; i++) {
                        showList[i] = data.data.showList[arr_shows[i]]
                    }
                    data.data.showList = showList

                    for (i in data.data.showList) {
                        showId = data.data.showList[i].show.showID
                        name = data.data.showList[i].show.name
                        album = data.data.showList[i].album.name
                        cover = data.data.showList[i].show.cover.urls[0].url
                        url = data.data.showList[i].show.audioURL.urls[0].url
                        var list = document.createElement('li')
                        list.id = showId
                        list.dataset.name = name
                        list.dataset.album = album
                        list.dataset.cover = cover
                        list.dataset.url = url
                        list.onclick = function() {
                            for (var i = 0; i < Shows.length; i++) {
                                Shows[i].classList.remove('focus')
                            }
                            this.classList.add('focus')
                            document.title =
                                this.dataset.name + ' - ' + this.dataset.album
                            audio.dataset.id = this.id
                            audio.preload = 'metadata'
                            audio.src = this.dataset.url
                            audio.onended = function() {
                                if (
                                    document.getElementById('autoplay').checked
                                ) {
                                    nexttrack()
                                }
                            }
                            // if (os.isPhone) {
                            //     // metadata 中的 artwork 偶尔不生效
                            //     document.head.querySelector(
                            //         'link'
                            //     ).href = this.dataset.cover
                            // }
                            if ('mediaSession' in navigator) {
                                navigator.mediaSession.metadata = new MediaMetadata(
                                    {
                                        title: this.dataset.name,
                                        album: this.dataset.album,
                                        artwork: [
                                            {
                                                src: this.dataset.cover,
                                                sizes: '720x720',
                                                type: 'image/jpeg'
                                            }
                                        ]
                                    }
                                )

                                navigator.mediaSession.setActionHandler(
                                    'play',
                                    function() {
                                        console.log('play')
                                        audio.play()
                                    }
                                )
                                navigator.mediaSession.setActionHandler(
                                    'pause',
                                    function() {
                                        console.log('pause')
                                        audio.pause()
                                    }
                                )
                                navigator.mediaSession.setActionHandler(
                                    'seekbackward',
                                    function() {
                                        console.log('seekbackward')
                                        audio.currentTime =
                                            audio.currentTime - 10
                                    }
                                )
                                navigator.mediaSession.setActionHandler(
                                    'seekforward',
                                    function() {
                                        console.log('seekforward')
                                        audio.currentTime =
                                            audio.currentTime + 10
                                    }
                                )
                                navigator.mediaSession.setActionHandler(
                                    'previoustrack',
                                    function() {
                                        console.log('previoustrack')
                                        previoustrack()
                                    }
                                )
                                navigator.mediaSession.setActionHandler(
                                    'nexttrack',
                                    function() {
                                        console.log('nexttrack')
                                        nexttrack()
                                    }
                                )
                            }
                        }
                        list.innerText =
                            'ID:' + paddingRight(showId, 20) + 'Name:' + name
                        document.getElementById('Shows').appendChild(list)
                    }

                    Shows = document
                        .getElementById('Shows')
                        .getElementsByTagName('li')
                    for (var i = 0; i < Shows.length; i++) {
                        if (
                            Shows[i].id ==
                            document.getElementById('audio').dataset.id
                        ) {
                            Shows[i].classList.add('focus')
                        }
                    }

                    document.getElementById(
                        'prevPageShows'
                    ).onclick = function() {
                        if (index > 0) {
                            index--
                            getSkipShow(albumID, index)
                        }
                    }
                    document.getElementById(
                        'nextPageShows'
                    ).onclick = function() {
                        index++
                        getSkipShow(albumID, index)
                    }
                },
                function(error) {
                    document.getElementsByClassName('tool')[0].innerHTML +=
                        '<span style="color:red"><b>读取失败</b></span>'
                }
            )
        },
        function(error) {
            document.getElementsByClassName('tool')[0].innerHTML +=
                '<span style="color:red"><b>读取失败</b></span>'
        }
    )
}
function paddingRight(str, lenght) {
    if (str.length >= lenght) return str
    else return paddingRight(str + ' ', lenght)
}
function chunk(data, length) {
    var index = 0
    var result = []
    while (index < data.length) {
        result.push(data.slice(index, (index += length)))
    }
    return result
}
document.getElementsByName('getAlbumListByCategory')[0].onclick = function() {
    var category = document.getElementsByName('category')[0].value
    var page = document.getElementsByName('page')[0].value
    getAlbumListByCategory(category, page)
}
document.getElementsByName('getSkipShow')[0].onclick = function() {
    var albumID = document.getElementsByName('albumID')[0].value
    getSkipShow(albumID)
}
document.addEventListener(
    'keyup',
    function(e) {
        if ((e.keyCode || e.which) == 32) {
            togglePlayState()
        }
    },
    true
)
function togglePlayState() {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}
function previoustrack() {
    if (document.getElementById(audio.dataset.id) != null) {
        if (document.getElementById(audio.dataset.id).previousSibling != null) {
            document.getElementById(audio.dataset.id).previousSibling.click()
        }
    }
}
function nexttrack() {
    if (document.getElementById(audio.dataset.id) != null) {
        if (document.getElementById(audio.dataset.id).nextSibling != null) {
            document.getElementById(audio.dataset.id).nextSibling.click()
        }
    }
}
var os = (function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
            /(?:iPad|PlayBook)/.test(ua) ||
            (isAndroid && !/(?:Mobile)/.test(ua)) ||
            (isFireFox && /(?:Tablet)/.test(ua)),
        isiPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isiPhone && !isAndroid && !isSymbian && !isWindowsPhone
    isPhone = isAndroid || isiPhone || isSymbian || isWindowsPhone
    return {
        isTablet: isTablet,
        isiPhone: isiPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isPhone: isPhone,
        isChrome: isChrome,
        isFireFox: isFireFox
    }
})()
